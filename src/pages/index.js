import styles from '../styles/Home.module.scss'
import React, {useEffect, useState} from 'react'


import {Footer} from "../components/footer";
import {
    StepContent1,
    StepContent2,
    StepContent3,
    StepContent4,
    stepTitles, userData
} from "../components/stepContents";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {Header} from "../components/header";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));




function getSteps() {
    return stepTitles;
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <StepContent1/>;
        case 1:
            return <StepContent2/>;
        case 2:
            return <StepContent3/>;
        default:
            return <StepContent4/>;
    }
}

export default function Home() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [isSubmitting, setSubmitting] = useState(false )


    useEffect(() => {
        if (isSubmitting) {
            postUserML();
        }
        setSubmitting(false)
    }, )

    async function postUserML() {
        console.log(userData)
        axios({
            method: 'post',
            url: '/api/parameters',
            contentType: 'application/json',
            data: userData
        })
            .then(res => {
                console.log(res)
            })
    }



    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

        if (activeStep == 2) {
            setSubmitting(true)
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        console.log(userData)
    };

    return (
        <div className={styles.container}>

            <main className={styles.main}>
                <Header/>


                <div style={{width:'100%'}} className={styles.glass}>
                    <Stepper activeStep={activeStep} orientation="vertical" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: 15}}>

                        {steps.map((label, index) => (
                            <Step key={label} >
                                <StepLabel>{label}</StepLabel>
                                <StepContent >
                                    <Typography>{getStepContent(index)}</Typography>
                                    <div className={classes.actionsContainer}>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                style={{color: 'white'}}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNext}
                                            >
                                                {activeStep === steps.length - 1 ? 'I`m ready' : 'Next'}
                                            </Button>
                                        </div>
                                    </div>
                                </StepContent>
                            </Step>
                        ))}

                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} className={styles.glass}>
                            <Button onClick={handleReset} className={styles.glass} style={{width: '100%'}}>
                                Подготовить другой файл?
                            </Button>
                        </Paper>
                    )}
                </div>




            </main>



        </div>
    )
}

//ml-preweb.freakssha.ru/api
