import styles from './index.module.css';
import { FormControlLabel, Checkbox } from '@material-ui/core';

const SimpleCheckbox = (props) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={props.checked}
                    onClick={props.onClick}
                    name={props.name}
                    color="primary"
                />
            }
            label={props.label}
        />
    );
}

export default SimpleCheckbox;
