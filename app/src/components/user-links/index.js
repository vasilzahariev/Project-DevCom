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
            <Grid container spacing={2} justify='center' alignItems='center'>
                <Grid item>
                    {props.userLinks.gitHubUrl ? <ALink to={props.userLinks.gitHubUrl}><GitHubIcon fontSize='large' /></ALink> : ''}
                </Grid>
                <Grid item>
                    {props.userLinks.websiteUrl ? <ALink to={props.userLinks.websiteUrl}><WebIcon fontSize='large' /></ALink> : ''}
                </Grid>
                <Grid item>
                    {props.userLinks.linkedInUrl ? <ALink to={props.userLinks.linkedInUrl}><LinkedInIcon fontSize='large' /></ALink> : ''}
                </Grid>
                <Grid item>
                    {props.userLinks.youTubeUrl ? <ALink to={props.userLinks.youTubeUrl}><YouTubeIcon fontSize='large' /></ALink> : ''}
                </Grid>
                <Grid item>
                    {props.userLinks.twitterUrl ? <ALink to={props.userLinks.twitterUrl}><TwitterIcon fontSize='large' /></ALink> : ''}
                </Grid>
                <Grid item>
                    {props.userLinks.facebookUrl ? <ALink to={props.userLinks.facebookUrl}><FacebookIcon fontSize='large' /></ALink> : ''}
                </Grid>
                <Grid item>
                    {props.userLinks.instagramUrl ? <ALink to={props.userLinks.instagramUrl}><InstagramIcon fontSize='large' /></ALink> : ''}
                </Grid>
                <Grid item>
                    {props.userLinks.url ? <ALink to={props.userLinks.gitHubLink}><GitHubIcon fontSize='large' /></ALink> : ''}
                </Grid>
            </Grid>
        </div>
    );
}

export default UserLinks;
