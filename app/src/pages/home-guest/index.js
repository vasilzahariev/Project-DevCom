import { useHistory } from 'react-router-dom';
import styles from './index.module.css';
import Layout from '../../components/layout';
import SpecialTextArea from '../../components/special-text-area';
import { Grid } from '@material-ui/core';
import EpicProgrammer from '../../components/epic-programmer';
import SubmitBtn from '../../components/submit-btn';
import DescriptionIcon from '@material-ui/icons/Description';
import ForumIcon from '@material-ui/icons/Forum';
import WorkIcon from '@material-ui/icons/Work';
import BookIcon from '@material-ui/icons/Book';
import SchoolIcon from '@material-ui/icons/School';
import CodeIcon from '@material-ui/icons/Code';
import HeaderLink from '../../components/header-link';
import ChatIcon from '@material-ui/icons/Chat';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import ALink from '../../components/link';
import UserContext from '../../contexts/UserContext';
import { useContext } from 'react';

const HomeGuest = () => {
    const userContext = useContext(UserContext);

    const history = useHistory();

    return (
        <Layout>
            <Grid style={{ marginTop: '2.5%' }} container justify='center'>
                <Grid item xs={12}>
                    <div className={styles.img}>
                        <img src='/logo_transparent.png' alt='Logo' width='30%' />
                        <p className={styles.underImgText}>A platform for <EpicProgrammer><b>programmers</b></EpicProgrammer> and <EpicProgrammer><b>developers</b></EpicProgrammer> from all area and angles in the <EpicProgrammer><b>world of programming</b></EpicProgrammer></p>
                        {userContext.user.loggedIn ? '' :
                            <div>
                                <div style={{ display: 'inline', marginRight: '2%' }}><SubmitBtn color='green' fontSize='1.8rem' onClick={() => { history.push('/auth/register') }}>JOIN US NOW</SubmitBtn></div>
                                <div style={{ display: 'inline' }} onClick={() => { history.push('/auth/login') }}><SubmitBtn color='blue' fontSize='1.8rem'>LOG IN</SubmitBtn></div>
                            </div>}
                    </div>
                    <br />
                    <br />
                    <hr />
                </Grid>
                <Grid item xs={12}>
                    <div className={styles.functionalities}>
                        <h1>Functionalities</h1>
                        <Grid style={{ fontSize: '1.3rem' }} container justify='center' alignItems='center' spacing={5}>
                            <Grid item>
                                <HeaderLink to='/news'>
                                    <Grid container alignItems='center' spacing={2}>
                                        <Grid item><DescriptionIcon fontSize='large' /></Grid>
                                        <Grid item>Latest News in the Programming World</Grid>
                                    </Grid>
                                </HeaderLink>
                            </Grid>
                            <Grid item>
                                <HeaderLink to='/forum'>
                                    <Grid container alignItems='center' spacing={2}>
                                        <Grid item><ForumIcon fontSize='large' /></Grid>
                                        <Grid item>Forums and Communities</Grid>
                                    </Grid>
                                </HeaderLink>
                            </Grid>
                            <Grid item>
                                <HeaderLink to='/jobs'>
                                    <Grid container alignItems='center' spacing={2}>
                                        <Grid item><WorkIcon fontSize='large' /></Grid>
                                        <Grid item>Find Jobs</Grid>
                                    </Grid>
                                </HeaderLink>
                            </Grid>
                            <Grid item>
                                <HeaderLink to={userContext.user.loggedIn ? `/u/${userContext.user.username}` : '/auth/register'}>
                                    <Grid container alignItems='center' spacing={2}>
                                        <Grid item><BookIcon fontSize='large' /></Grid>
                                        <Grid item>Personal Blogs</Grid>
                                    </Grid>
                                </HeaderLink>
                            </Grid>
                            <Grid item>
                                <HeaderLink to={userContext.user.loggedIn ? `/u/${userContext.user.username}` : '/auth/register'}>
                                    <Grid container alignItems='center' spacing={2}>
                                        <Grid item><SchoolIcon fontSize='large' /></Grid>
                                        <Grid item>Add Your Educations</Grid>
                                    </Grid>
                                </HeaderLink>
                            </Grid>
                            <Grid item>
                                <HeaderLink to={userContext.user.loggedIn ? `/u/${userContext.user.username}` : '/auth/register'}>
                                    <Grid container alignItems='center' spacing={2}>
                                        <Grid item><WorkIcon fontSize='large' /></Grid>
                                        <Grid item>Add Your Work Experiences</Grid>
                                    </Grid>
                                </HeaderLink>
                            </Grid>
                            <Grid item>
                                <HeaderLink to={userContext.user.loggedIn ? `/u/${userContext.user.username}` : '/auth/register'}>
                                    <Grid container alignItems='center' spacing={2}>
                                        <Grid item><CodeIcon fontSize='large' /></Grid>
                                        <Grid item>Document Your Projects</Grid>
                                    </Grid>
                                </HeaderLink>
                            </Grid>
                            <Grid item>
                                <HeaderLink to={userContext.user.loggedIn ? `/chat` : '/auth/register'}>
                                    <Grid container alignItems='center' spacing={2}>
                                        <Grid item><ChatIcon fontSize='large' /></Grid>
                                        <Grid item>Chat</Grid>
                                    </Grid>
                                </HeaderLink>
                            </Grid>
                        </Grid>
                    </div>
                    <br />
                    <br />
                    <hr />
                </Grid>
                <Grid item xs={12}>
                    <div className={styles.functionalities}>
                        <h1>Contacts</h1>
                        <Grid container justify='center' alignItems='center' spacing={5}>
                            <Grid style={{ fontSize: '1.7rem' }} item xs={12}><ALink to='mailto:vasilzahariev1707@abv.bg'>vasilzahariev1707@abv.bg</ALink></Grid>
                            <Grid item><ALink to='https://www.facebook.com/DevCom-108732774604083'><FacebookIcon style={{ fontSize: 50 }} /></ALink></Grid>
                            <Grid item><ALink to='https://twitter.com/PDevcom'><TwitterIcon style={{ fontSize: 50 }} /></ALink></Grid>
                            <Grid item><ALink to='https://www.instagram.com/project_devcom/'><InstagramIcon style={{ fontSize: 50 }} /></ALink></Grid>
                        </Grid>
                    </div>
                    <br />
                    <br />
                    <hr />
                </Grid>
                <Grid style={{ textAlign: 'center' }} item xs={12}>
                    <h1>GitHub</h1>
                    <ALink to='https://github.com/vasilzahariev/Project-DevCom'><GitHubIcon style={{ fontSize: 50 }} /></ALink>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default HomeGuest;
