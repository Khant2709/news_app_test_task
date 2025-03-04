import React from 'react';
import styles from '@/styles/cardArticle.module.scss'


interface CardProps {
  image: string;
  source: string;
  abstract: string;
  date: string;
  url: string;
}

const CardArticleView: React.FC<CardProps> = ({image, source, abstract, date, url}) => {
  return (
      <article className={styles.card}>
        <img alt={`image_${date}`} src={image} className={styles.img}/>
        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.containerInformation}>
          <p className={styles.title_article}>{source}</p>
          <p className={styles.text}>{abstract}</p>
          <p className={styles.date}>{date}</p>
        </a>
      </article>
  );
};

export default CardArticleView;