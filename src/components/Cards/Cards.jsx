import React from 'react';

import { Container, Card, CardContent, Typography, Grid } from '@material-ui/core';

import Countup from 'react-countup';
import cx from 'classnames';
import styles from './Cards.module.css'


const Cards = ({ data: {confirmed, recovered, deaths, lastUpdate }}) => {
    if (!confirmed) {
        return <div>
            'Loading...'
        </div>
    }
    return <Container className={styles.container}>
        <Grid container spacing={3} justify="center">
            <Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.infected)}>
                <CardContent>
                    <Typography className={styles.infectedLabel} variant='h4'>Infected</Typography>
                    <Typography variant='h3' gutterBottom>
                        <Countup start={0} end={confirmed.value} duration={1.5} separator=',' />
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant='body2'>Number of active case</Typography>
                </CardContent>
            </Grid>
            <Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.recover)}>
                <CardContent>
                    <Typography variant='h4' className={styles.recoverLabel}>Recovered</Typography>
                    <Typography variant='h3' gutterBottom>
                        <Countup start={0} end={recovered.value} duration={1.5} separator=',' />
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant='body2'>Number of recoveries</Typography>
                </CardContent>
            </Grid>
            <Grid item xs={12} md={3} component={Card} className={cx(styles.card, styles.deaths)}>
                <CardContent>
                    <Typography variant='h4' className={styles.deathsLabel}>Deaths</Typography>
                    <Typography variant='h3' gutterBottom>
                        <Countup start={0} end={deaths.value} duration={1.5} separator=',' />
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant='body2'>Number of Deaths</Typography>
                </CardContent>
            </Grid>
        </Grid>
    </Container>
}

export default Cards