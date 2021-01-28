import styles from './index.module.css';
import { FormControl, InputLabel, Select, withStyles, MenuItem } from '@material-ui/core';

const CssFormControl = withStyles({
    root: {
        '& label': {
            color: '#61dafb',
        },
        '& label.Mui-focused': {
            color: '#059dc7',
        },
        '& .MuiInput-underline': {
            color: 'white',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#61dafb',
        },
        '&:hover .MuiInput-underline:before': {
            borderBottomColor: '#30cefa',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#059dc7',
        },
        '& .MuiSelect-select option': {
            backgroundColor: '#282c34',
            fontSize: '.8rem'
        }
    },
})(FormControl);

const SelectInput = (props) => {
    const onChange = (e) => {
        e.preventDefault();

        props.setValue(e.target.value);
    }
    
    return (
        <CssFormControl>
            <InputLabel htmlFor="age-native-simple">{props.label}</InputLabel>
            <Select
                style={props.width ? { width: props.width + 'px' } : {}}
                native
                value={props.value}
                onChange={onChange}
                inputProps={{
                    name: props.name,
                }}
            >
                {props.children}
            </Select>
        </CssFormControl>
    );
}

export default SelectInput;
