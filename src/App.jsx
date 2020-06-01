import React from 'react';

import ReactGa from 'react-ga';
import { Navbar, Cards, Chart, CountryPicker, Footer } from './components';
import styles from './App.module.css';
import { fetchData } from './api';



class App extends React.Component {

  state = {
    data: {},
    country: ''
  }

  async componentDidMount(){
    if(process.env.NODE_ENV === 'production') {
      if (process.env.GOOGLE_ANALYTIC_ID) {
        ReactGa.initialize(process.env.GOOGLE_ANALYTIC_ID);
        ReactGa.pageview(window.location.pathname + window.location.search)
      }
    }
    let data = await fetchData()
    this.setState({data: data})
  }
  handleCountryChange = async (country) => {
    let data = await fetchData(country)
    this.setState({data: data, country: country})
  }

  render() {
    const { data, country } = this.state;
    return <div className={styles.container}>
        <Navbar/>
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country}/>
        <Footer/>
    </div>
  }
}
export default App;
