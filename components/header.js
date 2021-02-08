import React from "react";
import styles from "../styles/Home.module.scss";

export const Header = () => {

    return (
        <div>
            <h1 className={styles.title}>
                <a style={{color: 'white'}}>ML-pre<a style={{color: '#3F51B5'}}>web</a></a>
            </h1>
            <p className={styles.description}>
                It will prepare any machine learning model for implementation on your site or in a bot in one line. You can take it on <a href="https://kaggle.com">Kaggle</a>.
            </p>

        </div>
    )
}