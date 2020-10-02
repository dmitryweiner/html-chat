import React from 'react';
import cat from './cat.jpg';
import styles from './styles.css';

/**
 * For incapsulated styles see
 * @see https://medium.com/@epilande/working-with-css-modules-a6b8aad37f3a
 */

export default () => {
    return <img src={cat} className="cat-picture" />;
};
