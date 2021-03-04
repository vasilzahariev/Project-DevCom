import styles from './index.module.css';
import TableColumn from '../table-column';
import TableRow from '../table-row';
import HeaderLink from '../header-link';
import { useHistory } from 'react-router-dom';
import TableBtn from '../table-btn'
import { useState, useContext } from 'react';
import EditProjectDialog from '../edit-project-dialog';
import ConfigContext from '../../contexts/ConfigContext';

const ProjectsRow = props => {
    const configContext = useContext(ConfigContext);

    const history = useHistory();

    const [editOpen, setEditOpen] = useState(false);

    const view = e => {
        history.push(`/projects/${props.project.projectUrl}`);
    }

    const edit = e => {
        setEditOpen(true);
    }

    const remove = async e => {
        if (!window.confirm(`Are you sure you want to delete project with name: "${props.project.name}"`)) return;

        const promise = await fetch(`${configContext.restApiUrl}/project/deleteProject/${props.project._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await promise.json();

        if (!response.status) history.push('/500');
    }

    return (
        <TableRow>
            <TableColumn xs={1}>{props.index}</TableColumn>
            <TableColumn xs={3}>{props.project.name}</TableColumn>
            <TableColumn xs={2}>{props.project.projectUrl}</TableColumn>
            <TableColumn xs={2}><HeaderLink to={`/u/${props.user.username}`}>{props.user.username}</HeaderLink></TableColumn>
            <TableColumn xs={4}>
                <TableBtn color='blue' onClick={view}>View</TableBtn>
                <TableBtn color='yellow' onClick={edit}>Edit</TableBtn>
                {editOpen ? <EditProjectDialog open={editOpen} setOpen={setEditOpen} project={props.project} /> : ''}
                <TableBtn color='red' onClick={remove}>Delete</TableBtn>
            </TableColumn>
        </TableRow>
    );
}

export default ProjectsRow;
