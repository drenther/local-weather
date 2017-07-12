import React from 'react';

export const Temperature = (props) => {
	return (
		<div className="temperature" onClick={props.unitChange}>
			<span className="value">{props.temp}</span> °<span className="unit">{props.unit}</span>
		</div>
	);
}