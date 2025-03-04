import React from 'react';

import icon from '@/assets/footer.png';

import styles from '@/styles/footer.module.scss';


const Footer: React.FC = () => {
  return (
      <footer className={styles.footer}>
        <nav className={styles.nav}>
          <p>Log In</p>
          <p>About Us</p>
          <p>Publishers</p>
          <p>Sitemap</p>
        </nav>
        <div className={styles.containerImg}>
          <p>Powered by</p>
          <img alt={'Powered by'} src={icon}/>
        </div>
        <p>
          © 2023 Outsider. Inspired by Insider
        </p>
      </footer>
  );
};

export default Footer;