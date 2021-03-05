import React from "react";
import styles from "../styles/Home.module.scss";
import Typography from "@material-ui/core/Typography";


export const About = () => {

    return (
        <div className={styles.grid}>

            <Typography className={styles.description}>
                It will prepare any machine learning model for implementation on your site or in a bot in one line. You can take it on <a href="https://kaggle.com" style={{color: 'blue'}}>Kaggle</a>.
            </Typography>

            <a href='https://github.com/freakssha/ml-preweb' target='_blank' className={styles.title_links} style={{fontSize: 30}}>
                How is this done?
            </a>

            <a href='https://habr.com/ru/sandbox/149942/' target='_blank' className={styles.title_links} style={{fontSize: 30}}>
                Example with Titanic case
            </a>

        </div>
    )
}