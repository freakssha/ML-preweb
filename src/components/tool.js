import React, {useEffect, useState} from "react";
import {FilePond, registerPlugin} from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import InputBase from "@material-ui/core/InputBase";
import {Typography} from "@material-ui/core";
import axios from "axios";
import styles from "../styles/Home.module.scss";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";

registerPlugin();


export const userData = {user_parameters: null, user_func_name: null, user_arg_name: null}

let editedFile = 0

export const stepTitles = [<Typography style={{color: 'white'}}>Upload the file</Typography>,
    <Typography style={{color: 'white'}}>Select the input data parameters</Typography>,
    <Typography style={{color: 'white'}}>Name the function and the argument</Typography>]


export const StepContent1 = () => {
    const [file, setFile] = useState()

    return (
        <div style={{marginTop: 10}}>
            <FilePond
                name="file"
                required={true}
                allowMultiple={false}
                maxFiles={1}
                allowFileTypeValidation={true}
                acceptedFileTypes={['text/python']}
                files={file}
                onupdatefiles={setFile}
                className='filepond'
                labelIdle='Drag & Drop your model in .py or <span class="filepond--label-action">Browse</span>'
                style={{width: '100%'}}
                fileValidateTypeLabelExpectedTypesMap={{'text/python': '.py'}}
                fileValidateTypeLabelExpectedTypes='.py ONLY!'
                server={{url: './api/uploads', revert: '/revert'}}
            />
        </div>
    )
}

export const StepContent2 = () => {
    const [exampleValue, setExampleValue] = React.useState([
        {isMeaning: 1, types: 'integer', values: 'ValueExample or plug'},
        {isMeaning: 1, types: 'integer', values: 'ValueExample or plug'},
        {isMeaning: 1, types: 'integer', values: 'ValueExample or plug'},
    ]);


    const addInput = () => {
        setExampleValue([...exampleValue, {isMeaning: 1, types: 'integer', values: 'ValueExample or plug'}])
    }

    const deleteInput = () => {
        setExampleValue(exampleValue.slice(0, -1))
    }

    const checkData = () => {
        if (exampleValue !== null) {
            userData.parameters = exampleValue
        }
    }

    const handleChange = (event, i) => {
        const {name, value} = event.target
        const list = [...exampleValue]
        list[i][name] = value
        setExampleValue(list)

        userData.user_parameters = list
    };


    return (
        <div style={{marginTop: 10, marginBottom: 20}}>
            <Typography style={{color: 'white', marginBottom: 10}}>
                Examine the test dataset and move all the columns with exponential
                values. Some of them may contain insignificant values: id or characters.
                Check if you did it correctly and then proceed to the next step.
            </Typography>
            <Button
                color="primary"
                onClick={addInput}
                style={{color: 'blue'}}
            >
                Add
            </Button>
            <Button
                color="primary"
                onClick={deleteInput}
                style={{color: 'blue'}}
            >
                Delete
            </Button>
            <Button
                color="primary"
                onClick={checkData}
                style={{color: 'blue'}}
            >
                Сheck for correctness
            </Button>

            {exampleValue.map((item, i) =>
                <div key={i} style={{marginTop: 10, marginBottom: 10}}>
                    <FormControl>
                        <BootstrapInput
                            name='values'
                            value={item.values}
                            onChange={event => handleChange(event, i)}
                        />
                    </FormControl>

                    <FormControl style={{marginLeft: 10}}>
                        <Select
                            name='types'
                            value={item.types}
                            onChange={event => handleChange(event, i)}
                            input={<BootstrapInput/>}
                        >
                            <MenuItem value='integer'>integer</MenuItem>
                            <MenuItem value='string'>string</MenuItem>
                            <MenuItem value='boolean'>boolean</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl style={{marginLeft: 10}}>
                        <Select
                            name='isMeaning'
                            value={item.isMeaning}
                            onChange={event => handleChange(event, i)}
                            input={<BootstrapInput/>}
                        >
                            <MenuItem value={1}>meaningful</MenuItem>
                            <MenuItem value={0}>not meaningful</MenuItem>
                        </Select>
                    </FormControl>

                </div>
            )}
        </div>
    )
}


export const StepContent3 = () => {
    const [funcName, setFuncName] = React.useState('is_user_alive');
    const [argName, setArgName] = React.useState('user_data');


    const handleChangeFuncName = (event) => {
        setFuncName(event.target.value)
        userData.user_func_name = funcName
    };

    const handleChangeArgName = (event) => {
        setArgName(event.target.value)
        userData.user_arg_name = argName
    };

    return (
        <div style={{marginTop: 10, marginBottom: 20}}>
            <FormControl style={{marginRight: 10}}>
                <BootstrapInput
                    value={funcName}
                    onChange={handleChangeFuncName}
                />
            </FormControl>
            <FormControl style={{width: '20%'}}>
                <BootstrapInput
                    value={argName}
                    onChange={handleChangeArgName}
                />
            </FormControl>
        </div>
    );
}


export const StepContent4 = () => {
    const [files, setFiles] = useState([])


    return (
        <div>
            <FilePond

                files={files}
                allowMultiple={true}
                onupdatefiles={setFiles}
                className='filepond'
                labelIdle='Вставь & перетащи свою модель в расширении .py <span class="filepond--label-action">Browse</span>'
            />
        </div>
    )
}


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

export const Tool = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [isSubmitting, setSubmitting] = useState(false)


    useEffect(() => {
        if (isSubmitting) {
            postUserML();
        }
        setSubmitting(false)
    },)

    async function postUserML() {
        console.log(userData)
        axios({
            method: 'post',
            url: '/api/parameters',
            contentType: 'application/json',
            data: userData
        })
            .then(res => {
                editedFile = res.data
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
        <div style={{width: '100%'}}>
            <div style={{width: '100%', marginBottom: 11}} className={styles.glass}>
                <div style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: 6}}>
                    <div style={{padding: 23}}>
                        <Stepper activeStep={activeStep} orientation="vertical"
                                 style={{backgroundColor: 'rgba(0, 0, 0, 0)', borderRadius: 10}}>

                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                    <StepContent>
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
                                Call your function name with user data as an argument like this:
                                is_user_alive(user_data) - Wuale!
                                <Button style={{color: 'blue', marginLeft: 20}} onClick={() => {
                                    navigator.clipboard.writeText(editedFile)
                                }}>
                                    Click COPY&PAST your model
                                </Button>

                                <Button onClick={handleReset} className={styles.glass} style={{width: '100%'}}>
                                    Prepare another one?
                                </Button>
                            </Paper>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: 'white',
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#C8F751',
            background: 'white',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

