import React, {useState, useEffect} from 'react';

import { fetchDailyData } from '../../api';

import { Line, Bar } from 'react-chartjs-2';
import { Container } from '@material-ui/core';
import styles from './Chart.module.css';


const Chart = ({data: {confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData ] = useState([])
    
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData())
        }
        fetchAPI()
    }, [])

    const dailyLineChart = (
        dailyData.length !== 0 
        ? <Line 
        data={{
            labels: dailyData.map(({date}) => date),
            datasets: [{
                data: dailyData.map(({confirmed}) => confirmed),
                label: 'infected',
                borderColor: '#3333ff',
                fill: true

            }, {
                data: dailyData.map(({deaths}) => deaths),
                label: 'Deaths',
                borderColor: 'rgba(255, 0, 0, .5)',
                fill: true

            }]
        }}
        /> : null
    )
    const barCountryChart = (
        confirmed
        ? <Bar 
            data={{
                labels: ['Infected', 'Recoveries', 'Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: ['rgba(0, 0, 225, .5)', 'rgba(0, 225, 0, .5)', 'rgba(225, 0, 0, .5)'],
                    data: [confirmed.value, recovered.value, deaths.value]
                }]
            }}
            options ={{
                legend: {display: false},
                title: {display: true, text: `Current state in ${country}`}
            }}
        /> : null
    )
    const showChart = (
        country ? <div>
            <h3 className={styles.chartTitle}>Data of {country}</h3>
            {barCountryChart}
        </div> : <div>
            <h3 className={styles.chartTitle}>Daily COVID 2019 Data</h3>
            {dailyLineChart}
        </div>
    ) 

    return <Container>
        <div className={styles.container}>
            {showChart}
            
        </div>
    </Container>
}

export default Chart