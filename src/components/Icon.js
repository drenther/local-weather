import React from 'react';

export const Icon = ({icon, desc}) => {
	return (
		<div className="icon">
			<div>{desc}</div>
			<img src={`http://openweathermap.org/img/w/${icon}.png`} alt="weather_icon"/>
		</div>
	);
}