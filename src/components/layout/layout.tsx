import React from 'react';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

import styles from '@/styles/layout.module.scss';


const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return (
      <div className={styles.layout}>
        <Header/>
        <main className={styles.content}>{children}</main>
        <Footer/>
      </div>
  );
};

export default Layout;