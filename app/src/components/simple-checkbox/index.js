import styles from './index.module.css';
import { FormControlLabel, Checkbox } from '@material-ui/core';

const SimpleCheckbox = (props) => {
    return (
        <div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={props.checked}
                        onClick={props.onClick}
                        name={props.name}
                        color='primary'
                    />
                }
                label={props.label}
            />
        </div>
    );
}

export default SimpleCheckbox;
