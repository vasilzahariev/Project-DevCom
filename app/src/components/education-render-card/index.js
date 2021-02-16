import { Grid } from '@material-ui/core';
import styles from './index.module.css';
import ALink from '../link';

const EducationRenderCard = (props) => {
    const edu = props.edu

    return (
        <Grid item xs={12}>
            <div className={styles.card}>
                <Grid container direction='row'>
                    <Grid item xs={6}>
                        <Grid container direction='column' alignItems='flex-start' spacing={3}>
                            <Grid item><ALink to={edu.schoolLink}>{edu.school}</ALink></Grid>
                            <Grid item>{edu.specialization}</Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container direction='column' alignItems='flex-end' spacing={3}>
                            <Grid item>{edu.degree}</Grid>
                            <Grid item>{edu.years[0] === edu.years[1] ? '' : `${edu.years[0]} - ${edu.years[1]}`}</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    );
}

export default EducationRenderCard;
