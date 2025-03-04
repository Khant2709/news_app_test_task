import React, {useState} from 'react';

import burger from '@/assets/burger.png';
import exit from '@/assets/vector.png';

import styles from '@/styles/header.module.scss';


const Header: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);

  return (
      <header className={styles.header}>
        {showNavbar
            ? <Navbar onClose={() => setShowNavbar(false)}/>
            : <>
              <img
                  alt="burger"
                  src={burger}
                  className={styles.burger}
                  onClick={() => setShowNavbar(true)}
              />
              <p className={styles.title}>BESIDER</p>
            </>
        }
      </header>
  );
};

const Navbar: React.FC<{ onClose: () => void }> = ({onClose}) => (
    <section className={styles.navbar}>
      <img alt="X" src={exit} className={styles.exit} onClick={onClose}/>
      <nav>
        <p>SCIENCE</p>
        <p>GENERAL</p>
        <p>ENTERTAINMENT</p>
        <p>TECHNOLOGY</p>
        <p>BUSINESS</p>
        <p>HEALTH</p>
        <p>SPORTS</p>
      </nav>
    </section>
);

export default Header;