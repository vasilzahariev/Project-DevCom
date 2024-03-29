import { useState } from 'react';
import styles from './index.module.css';
import { Grid, Button, MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import SearchBar from '../search-bar';
import SelectInput from '../select-input';
import SearchButton from '../search-button';
import { useMediaQuery } from 'react-responsive';

const HeaderSearch = () => {
    const history = useHistory();

    const isMobile = useMediaQuery({ query: '(max-width: 1224px)' });

    const [searchValue, setSearchValue] = useState('');
    const [category, setCategory] = useState('news');

    const onSubmit = (e) => {
        e.preventDefault();

        if (searchValue === '')
            return;

        const searchEncoded = encodeURIComponent(searchValue);
        const categoryEncoded = encodeURIComponent(category);

        history.push(`/search/${categoryEncoded}/${searchEncoded}`);
    }

    return (
        <form onSubmit={onSubmit}>
            {isMobile ?
                <SearchBar setValue={setSearchValue} />
                :
                <Grid container justify='center' alignItems='center' spacing={3}>
                    <Grid item xs={8}>
                        <SearchBar setValue={setSearchValue} />
                    </Grid>
                    <Grid item xs={2}>
                        <SelectInput label='Category' name='category' value={category} setValue={setCategory}>
                            <option value='news'>News</option>
                            <option value='forum'>Forum Posts</option>
                            <option value='jobs'>Jobs</option>
                            <option value='projects'>Projects</option>
                            <option value='users'>Users</option>
                        </SelectInput>
                    </Grid>
                    <Grid item xs={2}>
                        <SearchButton searchVal={searchValue} />
                    </Grid>
                </Grid>
            }
        </form>
    );
}

export default HeaderSearch;
