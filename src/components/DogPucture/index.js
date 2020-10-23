import React from 'react';
import doggo from './doggo.jpg';
import styles from './styles.module.css';

export default function DogPicture() {
    return (
        <div className={styles.doggo}>
            <img src={doggo} alt="doggo" />
        </div>
    );
}
