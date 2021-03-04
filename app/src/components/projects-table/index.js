import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import { useState, useContext, useEffect, useMemo } from 'react';
import ConfigContext from '../../contexts/ConfigContext';
import { useHistory } from 'react-router-dom';
import TableHead from '../table-head';
import TableColumn from '../table-column';
import Table from '../table';
import ProjectsRow from '../projects-row';

const ProjectsTable = props => {
    const configContext = useContext(ConfigContext);

    const history = useHistory();

    const [ended, setEnded] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch(`${configContext.restApiUrl}/project/getProjectsAndUsers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => promise.json()).then(response => {
            if (!response.status) history.push('/500');

            setProjects(response.projects);
        });
    }, [projects]);

    const renderer = useMemo(() => {
        return projects.map((pu, index) => {
            return (<ProjectsRow key={pu.project._id} index={index} project={pu.project} user={pu.user} />);
        });
    }, [projects]);

    return (
        <div>
            <Table>
                <TableHead>
                    <TableColumn xs={1}><b>#</b></TableColumn>
                    <TableColumn xs={3}><b>Name</b></TableColumn>
                    <TableColumn xs={2}><b>Url</b></TableColumn>
                    <TableColumn xs={2}><b>Owner</b></TableColumn>
                    <TableColumn xs={4}><b>Actions</b></TableColumn>
                </TableHead>
                {renderer}
            </Table>
        </div>
    );
}

export default ProjectsTable;
