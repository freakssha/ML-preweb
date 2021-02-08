import React, {useState} from "react";
import { FilePond, registerPlugin } from 'react-filepond';
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import InputBase from "@material-ui/core/InputBase";
import {Typography} from "@material-ui/core";
registerPlugin();

export const userData = {file: null, parameters: null, funcName: null, argName: null}

export const stepTitles = [<Typography style={{color: 'white'}}>Upload the file</Typography>,
                           <Typography style={{color: 'white'}}>Select the input data parameters</Typography>,
                           <Typography style={{color: 'white'}}>Name the function and the argument</Typography>]



export const StepContent1 = () => {
    const [file, setFile] = useState(null)

    if (file !== null) {
        userData.file = file
    }

    return (
        <div style={{marginTop: 10}}>
            <FilePond
                files={file}
                allowMultiple={true}
                onupdatefiles={setFile}
                className='filepond'
                labelIdle='Drag & Drop your model in .py or <span class="filepond--label-action">Browse</span>'
                style={{width: '100%'}}
            />
        </div>
    )
}

export const StepContent2 = () => {
    const [exampleValue, setExampleValue] = React.useState([
        { isMeaning: 1, types: 'integer', values: 'ValueExample or plug' },
        { isMeaning: 1, types: 'integer', values: 'ValueExample or plug' },
        { isMeaning: 1, types: 'integer', values: 'ValueExample or plug' },
        ]);


    const addInput = () => {
        setExampleValue([...exampleValue, { isMeaning: 1, types: 'integer', values: 'ValueExample or plug' }])
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
        const { name, value } = event.target
        const list = [...exampleValue]
        list[i][name] = value
        setExampleValue(list)
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
            >
                Add
            </Button>
            <Button
                color="primary"
                onClick={deleteInput}
            >
                Delete
            </Button>
            <Button
                color="primary"
                onClick={checkData}
            >
                Сheck for correctness
            </Button>

            {exampleValue.map((item, i) =>
                <div key={i} style={{marginTop: 10, marginBottom:10}}>
                    <FormControl >
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
                            input={<BootstrapInput />}
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
                            input={<BootstrapInput />}
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
        setFuncName(event.target.date)
        userData.funcName = funcName
    };

    const handleChangeArgName = (event) => {
        setArgName(event.target.date)
        userData.argName = argName
    };

    return (
        <div  style={{marginTop: 10, marginBottom: 20}}>
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
            borderColor: '#80bdff',
            background: 'white',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

