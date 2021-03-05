import styles from '../styles/Home.module.scss'
import React, {useEffect, useState} from 'react'


import {Footer} from "../components/footer";
import {
    StepContent1,
    StepContent2,
    StepContent3,
    StepContent4,
    stepTitles, Tool, userData
} from "../components/tool";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {About} from "../components/about";
import axios from "axios";
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
