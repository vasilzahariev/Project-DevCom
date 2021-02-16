import { Grid } from '@material-ui/core';
import { useMemo } from 'react';
import EducationRenderCard from '../education-render-card';
import styles from './index.module.css';

const EducationsRenderer = (props) => {
    const renderer = useMemo(() => {
        return props.educations.map((edu, index) => {
            return (
                <EducationRenderCard key={edu._id} index={index} edu={edu} />
            );
        })
    }, [props.educations]);

    return (
        <div className={styles.edus}>
            <Grid container direction='row' justify='center' alignItems='stretch' spacing={4}>
                {renderer}
            </Grid>
        </div>
    );
}

export default EducationsRenderer;
