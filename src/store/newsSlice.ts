import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {AnyAction} from 'redux';
import {axiosJson} from '@/services/axiosService';
import {groupArticlesByDate} from '@/utils/groupNews';
import {
  InitialLoadResponse,
  MoreNewsResponse,
  NewArticlesResponse,
  NewsState,
} from "./interfaceSlice";


const initialState: NewsState = {
  news: [],
  page: 1,
  loading: false,
  error: null,
  hasMore: true,
  currentYear: new Date().getFullYear()
      .toString(),
  currentMonth: (new Date().getMonth() + 1).toString(),
};

export const fetchInitialNews = createAsyncThunk<InitialLoadResponse, { year: string; month: string; isUpdate?: string }>(
    'news/fetchInitial',
    async ({year, month, isUpdate = 'F'}) => {
      const response = await axiosJson.get(`/api/news?year=${year}&month=${month}&isUpdate=${isUpdate}`);
      return response.data;
    }
);

export const fetchMoreNews = createAsyncThunk<MoreNewsResponse, number>(
    'news/fetchMore',
    async (page) => {
      const response = await axiosJson.get(`/api/news/path?page=${page}`);
      return response.data;
    }
);

export const fetchPreviousMonth = createAsyncThunk<InitialLoadResponse, { year: string; month: string }>(
    'news/fetchPreviousMonth',
    async ({year, month}) => {
      const response = await axiosJson.get(`/api/news?year=${year}&month=${month}`);
      return response.data;
    }
);

export const checkForNewArticles = createAsyncThunk<NewArticlesResponse, { year: string; month: string }>(
    'news/checkForNewArticles',
    async ({year, month}) => {
      const response = await axiosJson.get(`/api/news?year=${year}&month=${month}&isUpdate=T`);
      return response.data;
    }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    resetNews: (state) => {
      state.news = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchInitialNews.pending, (state: NewsState) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchInitialNews.fulfilled, (
            state: NewsState,
            action: { payload: InitialLoadResponse }
        ) => {
          state.loading = false;
          state.news = groupArticlesByDate(action.payload.articles);
          state.hasMore = action.payload.articles.length === 30;
        })
        .addCase(fetchInitialNews.rejected, (state: NewsState, action: AnyAction) => {
          state.loading = false;
          state.error = action.error.message || 'Ошибка загрузки';
        })

        .addCase(fetchMoreNews.pending, (state: NewsState) => {
          state.loading = true;
        })
        .addCase(fetchMoreNews.fulfilled, (state: NewsState, action: { payload: MoreNewsResponse }) => {
          state.loading = false;
          state.page = action.payload.page;
          state.hasMore = state.page * 30 < action.payload.total;

          const newGroups = groupArticlesByDate(action.payload.articles);
          newGroups.forEach((newGroup) => {
            const existingGroup = state.news.find((group) => group.date === newGroup.date);
            if (existingGroup) {
              existingGroup.articles = [...existingGroup.articles, ...newGroup.articles];
            } else {
              state.news.push(newGroup);
            }
          });
        })
        .addCase(fetchMoreNews.rejected, (state: NewsState, action: AnyAction) => {
          state.loading = false;
          state.error = action.error.message || 'Ошибка загрузки';
        })

        .addCase(fetchPreviousMonth.pending, (state: NewsState) => {
          state.loading = true;
        })
        .addCase(fetchPreviousMonth.fulfilled, (state: NewsState, action: { payload: InitialLoadResponse }) => {
          state.loading = false;
          state.hasMore = true;
          const newGroups = groupArticlesByDate(action.payload.articles);
          state.news = [...state.news, ...newGroups];

          const newMonth = parseInt(state.currentMonth) - 1;
          if (newMonth === 0) {
            state.currentMonth = '12';
            state.currentYear = String(parseInt(state.currentYear) - 1);
          } else {
            state.currentMonth = String(newMonth);
          }
        })
        .addCase(fetchPreviousMonth.rejected, (state: NewsState, action: AnyAction) => {
          state.loading = false;
          state.error = action.error.message || 'Ошибка загрузки';
        })


        .addCase(checkForNewArticles.pending, (state: NewsState) => {
          state.loading = true;
        })
        .addCase(checkForNewArticles.fulfilled, (
            state: NewsState,
            action
        ) => {
          state.loading = false;
          if (action.payload.articles.length > 0) {

            const newGroups = groupArticlesByDate(action.payload.articles);
            newGroups.forEach(newGroup => {
              const existingGroup = state.news.find(group => group.date === newGroup.date);
              if (existingGroup) {
                existingGroup.articles = [
                  ...newGroup.articles,
                  ...existingGroup.articles,
                ].sort((a, b) => new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime());
              } else {
                state.news.unshift(newGroup);
              }
            });
          }
        })
        .addCase(checkForNewArticles.rejected, (state: NewsState, action: AnyAction) => {
          state.loading = false;
          state.error = action.error.message || 'Ошибка загрузки';
        });
  },
});

export default newsSlice.reducer;