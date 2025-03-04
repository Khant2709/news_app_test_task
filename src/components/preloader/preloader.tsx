import React from 'react';
import styles from '@/styles/preloader.module.scss';


const Preloader: React.FC = () => {
  const pointsCount = 8;
  const radius = 35;
  const center = 35;

  const points = Array.from({length: pointsCount}, (_, index) => {
    const angle = (index * (360 / pointsCount)) * (Math.PI / 180);
    const x = Math.cos(angle) * radius + center;
    const y = Math.sin(angle) * radius + center;
    return {x, y};
  });

  return (
      <div className={styles.container_preloader}>
        {points.map((point, i) => (
            <div
                key={i}
                className={styles.point}
                style={{
                  '--x': `${point.x}px`,
                  '--y': `${point.y}px`,
                  '--size': `${8 + i * 2}px`,
                } as React.CSSProperties}
            />
        ))}
      </div>
  );
};

export default Preloader;