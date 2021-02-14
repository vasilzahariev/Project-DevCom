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
import Link from '../link';

const UserLinks = (props) => {
    return (
        <div className={styles.links}>
            <Grid container spacing={2} justify='center' alignItems='center'>
                <Grid item>
                    {props.userLinks.gitHubUrl ? <HeaderLink to={props.userLinks.gitHubUrl}><GitHubIcon fontSize='large' /></HeaderLink> : ''}
                </Grid>
                <Grid item>
                    {props.userLinks.websiteUrl ? <HeaderLink to={props.userLinks.websiteUrl}><WebIcon fontSize='large' /></HeaderLink> : ''}
                </Grid>
                <Grid item>
                    {props.userLinks.linkedInUrl ? <HeaderLink to={props.userLinks.linkedInUrl}><LinkedInIcon fontSize='large' /></HeaderLink> : ''}
                </Grid>
                <Grid item>
                    {props.userLinks.youTubeUrl ? <HeaderLink to={props.userLinks.youTubeUrl}><YouTubeIcon fontSize='large' /></HeaderLink> : ''}
                </Grid>
                <Grid item>
                    {props.userLinks.twitterUrl ? <HeaderLink to={props.userLinks.twitterUrl}><TwitterIcon fontSize='large' /></HeaderLink> : ''}
                </Grid>
                <Grid item>
                    {props.userLinks.facebookUrl ? <HeaderLink to={props.userLinks.facebookUrl}><FacebookIcon fontSize='large' /></HeaderLink> : ''}
                </Grid>
                <Grid item>
                    {props.userLinks.instagramUrl ? <HeaderLink to={props.userLinks.instagramUrl}><InstagramIcon fontSize='large' /></HeaderLink> : ''}
                </Grid>
                <Grid item>
                    {props.userLinks.url ? <HeaderLink to={props.userLinks.gitHubLink}><GitHubIcon fontSize='large' /></HeaderLink> : ''}
                </Grid>
            </Grid>
        </div>
    );
}

export default UserLinks;
