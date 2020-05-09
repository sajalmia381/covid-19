import React from 'react';

import { Navbar, Cards, Chart, CountryPicker, Footer } from './components';
import styles from './App.module.css';
import { fetchData } from './api'

class App extends React.Component {

  state = {
    data: {},
    country: ''
  }

  async componentDidMount(){
    let data = await fetchData()
    this.setState({data: data})
  }
  handleCountryChange = async (country) => {
    console.log(country)
    let data = await fetchData(country)
    this.setState({data: data, country: country})
  }

  render() {
    const { data, country } = this.state;

    return <div className={styles.container}>
        <Navbar />
        <Cards data={data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country}/>
        <Footer />
    </div>
  }
}
export default App;
