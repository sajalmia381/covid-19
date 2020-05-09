import React, {useState, useEffect} from 'react';
import {Container, FormControl, NativeSelect} from '@material-ui/core';

import styles from './CountryPicker.module.css';

import {fetchContries} from '../../api';

const CountryPicker = ({handleCountryChange}) => {
    const [countries, setCountries] = useState([])
        
    useEffect(() => {
        const fetchAPI = async () => {
            setCountries(await fetchContries())
        }
        fetchAPI()
    }, [setCountries])
    return <Container className={styles.container}>
        <FormControl className={styles.formGroup}>
            <label htmlFor="countryChanger">Filter by Countries</label>
            <NativeSelect id="countryChanger" onChange={(e) => {handleCountryChange(e.target.value)}} className={styles.select}>
                <option value=''>Global</option>
                {countries.map(({name, iso3}, i) => <option key={i} value={name}>{name}</option>)}
            </NativeSelect>
        </FormControl>
    </Container>
}

export default CountryPicker