import React, { Component } from 'react';
import { Temperature, Icon, Metadata } from './components';
import { tempConverter, round } from './lib/helpers';

class App extends Component {
	state = {
		loading: true,
		unit: 'C'
	}

	handleUnitChange = () => {
		const unit = this.state.unit === 'C' ? 'F' : 'C';
		const temp = tempConverter(this.state.kelvinTemp, unit);
		this.setState({unit, temp});
	}

	componentWillMount() {
		fetch('http://ip-api.com/json').then(res => res.json()).then(coords => {
				fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${round(coords.lat)}&lon=${round(coords.lon)}&APPID=5e79fd281827fb5500a85085ca31e3ec`)
					.then(res => res.json(), err => console.error("Error while fetching your local weather."))
					.then(data => {
						const kelvinTemp = data.main.temp;
						const temp = tempConverter(kelvinTemp, this.state.unit);
						this.setState({
							loading: false,
							icon: data.weather[0].icon,
							desc: data.weather[0].description,
							city: data.name,
							temp,
							kelvinTemp
						});
					});
			})
	}

  render() {
		if (this.state.loading)
			return (
				<div className="app">
					<div className="loader">
						L<span className="spin">&empty;</span>ading
					</div>
				</div>
			);
		else 
			return (
				<div className="app">
					<Icon icon={this.state.icon} desc={this.state.desc}/>
					<Temperature temp={this.state.temp} unit={this.state.unit} unitChange={this.handleUnitChange}/>
					<Metadata city={this.state.city}/>
				</div>
			);
  }
}

export default App;