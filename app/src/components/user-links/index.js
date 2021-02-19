import styles from './index.module.css';
import { Grid } from '@material-ui/core';
import HeaderLink from '../header-link';
import GitHubIcon from '@material-ui/icons/GitHub';
import WebIcon from '@material-ui/icons/Web';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import ALink from '../link';

const UserLinks = (props) => {
    return (
        <div className={styles.links}>
            <Grid container justify='center' alignItems='center' spacing={2}>
                {props.userLinks.gitHubUrl ? <Grid item><ALink to={props.userLinks.gitHubUrl}><GitHubIcon fontSize='large' /></ALink></Grid> : ''}

                {props.userLinks.websiteUrl ? <Grid item><ALink to={props.userLinks.websiteUrl}><WebIcon fontSize='large' /></ALink></Grid> : ''}

                {props.userLinks.linkedInUrl ? <Grid item><ALink to={props.userLinks.linkedInUrl}><LinkedInIcon fontSize='large' /></ALink></Grid> : ''}

                {props.userLinks.youTubeUrl ? <Grid item><ALink to={props.userLinks.youTubeUrl}><YouTubeIcon fontSize='large' /></ALink></Grid> : ''}

                {props.userLinks.twitterUrl ? <Grid item><ALink to={props.userLinks.twitterUrl}><TwitterIcon fontSize='large' /></ALink></Grid> : ''}

                {props.userLinks.facebookUrl ? <Grid item><ALink to={props.userLinks.facebookUrl}><FacebookIcon fontSize='large' /></ALink></Grid> : ''}

                {props.userLinks.instagramUrl ? <Grid item><ALink to={props.userLinks.instagramUrl}><InstagramIcon fontSize='large' /></ALink></Grid> : ''}
            </Grid>
        </div>
    );
}

export default UserLinks;
