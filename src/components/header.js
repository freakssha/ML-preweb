import React from "react";
import styles from "../styles/Home.module.scss";
import Ticker from 'react-ticker'


export const Header = () => {

    return (
        <div className={styles.header}>
            <Ticker>
                {({ index }) => (
                    <div>
                        <a className={styles.title} href='/'>
                                ML-pre
                            <a className={styles.title} style={{color: 'blue', textDecorationColor: 'white'}}>
                                web
                            </a>
                        </a>
                        <a className={styles.title} style={{marginRight: 70, textDecoration: 'none'}}></a>

                        <a className={styles.title} href='https://freakssha.ru' style={{color: 'blue', textDecorationColor: 'white'}}>main</a>

                        <a className={styles.title} style={{marginRight: 70, textDecoration: 'none'}}></a>
                    </div>

                )}
            </Ticker>
        </div>
    )
}