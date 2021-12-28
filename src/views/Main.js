import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStreamsList } from '../data';
import styles from '../style.module.scss';

const GridView = ({ children, ...props }) => (
  <div className={styles.gridView} {...props}>
    {children}
  </div>
);

const App = ({}) => {
  const streams = useStreamsList();

  return (
    <GridView>
      <h1 style={{ width: '100%' }}>Live streams</h1>
      {streams === null ? (
        <div>Loading...</div>
      ) : (
        streams.map((s) => (
          <Link
            to={`/play/${s.slug}`}
            className={styles.gridVideoItem}
            tabIndex="0"
            key={s.slug}
          >
            <img
              src={s.thumb.replace('https://', 'http://')}
              className={styles.thumbnail}
            />
            <div className={styles.gridVideoItemTitle}>
              {s.display}
            </div>
          </Link>
        ))
      )}
    </GridView>
  );
};

export default App;
