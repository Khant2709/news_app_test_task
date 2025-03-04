import React, {useEffect, useCallback} from 'react';

import {useDispatch, useSelector} from 'react-redux';

import {RootState, AppDispatch} from './store/store';
import {fetchInitialNews, fetchMoreNews, fetchPreviousMonth, checkForNewArticles} from './store/newsSlice';

import InfiniteScroll from 'react-infinite-scroll-component';

import CardArticleView from '@/components/cardArticle/cardArticleView';
import Preloader from '@/components/preloader/preloader';
import Layout from '@/components/layout/layout';

import {formatDate} from '@/utils/transformDate';

import imageDef from './assets/image.png';

import styles from './styles/App.module.scss';


function App() {
  const dispatch = useDispatch<AppDispatch>();
  const {news, page, hasMore, loading, error, currentYear, currentMonth} = useSelector(
      (state: RootState) => state.news
  );

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear()
        .toString();
    const month = (today.getMonth() + 1).toString();
    dispatch(fetchInitialNews({year, month}));

    const interval = setInterval(() => {
      dispatch(checkForNewArticles({year, month}));
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const lastGroup = news[news.length - 1];
      if (lastGroup && lastGroup.date.startsWith('01.')) {
        const prevMonth = parseInt(currentMonth) - 1;
        let targetYear = currentYear;
        let targetMonth = String(prevMonth);
        if (prevMonth === 0) {
          targetMonth = '12';
          targetYear = String(parseInt(currentYear) - 1);
        }
        dispatch(fetchPreviousMonth({year: targetYear, month: targetMonth}));
      } else {
        dispatch(fetchMoreNews(page + 1));
      }
    }
  }, [dispatch, news, page, hasMore, loading, currentYear, currentMonth]);

  const totalArticles = news.reduce((acc, group) => acc + group.articles.length, 0);
  const isFirstLoading = news.length === 0 && loading;

  return (
      <Layout>
        {isFirstLoading
            ? <Preloader/>
            : error
                ? <p className={styles.error}>{error}</p>
                : <InfiniteScroll
                    dataLength={totalArticles}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={<Preloader/>}
                    className={styles.window}
                >
                  {news.map((newsEl) => (
                      <React.Fragment key={newsEl.date}>
                        <p className={styles.title}>News for {newsEl.date}</p>
                        {newsEl.articles.map((article) => {
                          const hasImage = article.multimedia.length !== 0;
                          return (
                              <CardArticleView
                                  key={article._id}
                                  image={hasImage ? `https://static01.nyt.com/${article.multimedia[0].url}` : imageDef}
                                  source={article.source}
                                  abstract={article.abstract}
                                  date={formatDate(article.pub_date)}
                                  url={article.web_url}
                              />
                          );
                        })}
                      </React.Fragment>
                  ))}
                </InfiniteScroll>
        }
      </Layout>
  );
}

export default App;