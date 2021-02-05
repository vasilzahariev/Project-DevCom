import styles from './index.module.css';
import { Slider, Grid, Input } from '@material-ui/core';

const RangedSlider = (props) => {
    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs>
                <Slider
                    className={styles.slider}
                    value={props.value}
                    onChange={props.onChange}
                    aria-labelledby="range-slider"
                    min={props.min}
                    max={props.max}
                    step={props.step}
                />
            </Grid>
            <Grid item>
                <Input
                    value={props.value[0]}
                    margin="dense"
                    onChange={props.onFirstValChange}
                    inputProps={{
                        step: props.step,
                        min: props.min,
                        max: props.max,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </Grid>
            <Grid item>
                <Input
                    className={styles.input}
                    value={props.value[1]}
                    margin="dense"
                    onChange={props.onSecondValChange}
                    inputProps={{
                        step: props.step,
                        min: props.min,
                        max: props.max,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </Grid>
        </Grid>
    );
}

export default RangedSlider;
