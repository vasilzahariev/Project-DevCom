import styles from './index.module.css';
import { TextField, InputAdornment, ThemeProvider, withStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const CssTextField = withStyles({
    root: {
        '& label': {
            // color: '#61dafb',
            color: 'blue',
        },
        '& .MuiInput-underline': {
            color: 'white',
        },
        '& label.Mui-focused': {
            color: '#059dc7',
        },
        '& .MuiInput-underline:before': {
            // borderBottomColor: '#61dafb',
            borderBottomColor: 'blue',
        },
        '&:hover .MuiInput-underline:before': {
            borderBottomColor: '#30cefa',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#059dc7',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
        },
    },
})(TextField);

const SearchBar = (props) => {
    const onChange = (e) => {
        e.preventDefault();

        props.setValue(e.target.value);
    }

    return (
        <CssTextField id="custom-css-standard-input" label="Search" fullWidth={true} onChange={onChange} autoComplete='off' InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            ),
        }} />
    );
}

export default SearchBar;
