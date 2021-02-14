import React from "react";
import styles from "../styles/Home.module.scss";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import {IconButton} from "@material-ui/core";

export const Header = () => {

    return (
        <div style={{width:'100%', marginBottom: 25}} className={styles.glass}>
            <div  style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: 15}}>
            <div  style={{padding: 23}}>

            <h6 className={styles.title}>
                <a style={{color: 'white'}}>ML-pre<a style={{color: '#3F51B5'}}>web</a></a>
            </h6>
            <Typography style={{color: 'white'}}>
                It will prepare any machine learning model for implementation on your site or in a bot in one line. You can take it on <a href="https://kaggle.com">Kaggle</a>.
            </Typography>

            <div className={styles.title_links}>
                <h6>
                    <a>Example with Titanic case</a>
                </h6>
                <h6>
                    <img style={{width: 50}}/>
                </h6>
            </div>

            </div>
            </div>
        </div>
    )
}