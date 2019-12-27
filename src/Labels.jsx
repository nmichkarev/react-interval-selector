import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

 
function getPieces(fInterval, tInterval, interval) {
	
	let fromInterval = fInterval.split(':');
	let toInterval = tInterval.split(':');

	const momentFrom = moment().hours(fromInterval[0]).minutes(fromInterval[1]);
	const momentTo   = moment().hours(toInterval[0]).minutes(toInterval[1]);
	const duration   = moment.duration(Number(interval.slice(0, -1)), interval.slice(-1));
	const ints = [];

	let step = momentFrom;

	while (step.isBefore(momentTo)) {
		ints.push(step.format('HH:mm'));
		step = step.add(duration)
	}
	return ints;
}

class Labels extends React.Component {
	
	static propTypes = {
		fromInterval: PropTypes.string,
		toInterval: PropTypes.string,
		interval: PropTypes.string
	}

	static defaultProps = {
		fromInterval: '00:00',
		toInterval: '23:30',
		interval: '30m'
	}


	render() {
		let { fromInterval, toInterval, interval } = this.props;
		const intervals = getPieces(fromInterval, toInterval, interval)
			.map(int => <div className="ranges-label" key={int}>{int}</div>);

		return (
			<div className="labels-container">
				{intervals}
			</div>
		);
	}
}

export default Labels;

export { getPieces };
