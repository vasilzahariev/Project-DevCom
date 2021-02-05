import { useState } from 'react';
import styles from './index.module.css';
import { Grid, Button, MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import SearchBar from '../search-bar';
import SelectInput from '../select-input';
import SearchButton from '../search-button';

const HeaderSearch = () => {
    const history = useHistory();

    const [searchValue, setSearchValue] = useState('');
    const [category, setCategory] = useState('all');

    const onSubmit = (e) => {
        e.preventDefault();

        if (searchValue === '')
            return;

        const searchEncoded = encodeURIComponent(searchValue);
        const categoryEncoded = encodeURIComponent(category);

        history.push(`/search?q=${searchEncoded}` + (category === 'all' ? '' : `&cat=${categoryEncoded}`));
    }

    return (
        <form onSubmit={onSubmit}>
            <Grid container justify='center' alignItems='center' spacing={3}>
                <Grid item xs={8}>
                    <SearchBar setValue={setSearchValue} />
                </Grid>
                <Grid item xs={2}>
                    <SelectInput label='Category' name='category' value={category} setValue={setCategory}>
                        <option value="all">All</option>
                        <option value='news'>News</option>
                        <option value='forum'>Forum Posts</option>
                        <option value='jobs'>Jobs</option>
                    </SelectInput>
                </Grid>
                <Grid item xs={2}>
                    <SearchButton searchVal={searchValue} />
                </Grid>
            </Grid>
        </form>
    );
}

export default HeaderSearch;
