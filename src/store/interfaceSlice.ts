export interface Multimedia {
  url: string;
}

export interface Article {
  _id: string;
  abstract: string;
  pub_date: string;
  source: string;
  web_url: string;
  multimedia: Multimedia[];
}

export interface DateGroup {
  date: string;
  articles: Article[];
}

export interface InitialLoadResponse {
  articles: Article[];
  total: number;
}

export interface MoreNewsResponse {
  page: number;
  articles: Article[];
  total: number;
}

export interface NewArticlesResponse {
  articles: Article[];
}

export interface NewsState {
  news: DateGroup[];
  page: number;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentYear: string;
  currentMonth: string;
}