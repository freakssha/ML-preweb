import styles from '../styles/Home.module.scss'
import React from 'react'
import {Footer} from "../components/footer";
import {Tool} from "../components/tool";
import {About} from "../components/about";
import {Header} from "../components/header";


export default function Home() {

    return (
        <div className={styles.container}>

            <main className={styles.main}>

                <Header/>
                <About/>
                <Tool/>
                <Footer/>

            </main>

        </div>
    )
}

//ml-preweb.freakssha.ru/api
