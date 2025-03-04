import {getDate} from "@/utils/transformDate";
import {Article, DateGroup} from "@/store/interfaceSlice";


export const groupArticlesByDate = (articles: Article[]): DateGroup[] => {
  const dateMap: { [key: string]: Article[] } = {};
  articles.forEach(article => {
    const date = getDate(article.pub_date);
    dateMap[date] = dateMap[date] || [];
    dateMap[date].push(article);
  });

  return Object.entries(dateMap)
      .map(([date, articles]) => ({date, articles}))
      .sort((a, b) => Date.parse(b.date.split('.')
          .reverse()
          .join('-')) - Date.parse(a.date.split('.')
          .reverse()
          .join('-')));
};