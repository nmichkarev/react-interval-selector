import React from 'react';
import PropTypes from 'prop-types';
import Interval from './Interval';
import Labels, { getPieces } from './Labels';
import './styles.css';


class ReactIntervalSelector extends React.Component {

	static propTypes = {
		count: PropTypes.number,
		initializer: PropTypes.func,
		fromInterval: PropTypes.any,
		toInterval: PropTypes.any,
		interval: PropTypes.any,
		onChangeSelection: PropTypes.func
	}

	static defaultProps = {
		count: 48,
		initializer: getPieces,
		fromInterval: '00:00',
		toInterval: '23:30',
		interval: '30m'
	}

	constructor(props) {
		super(props);
		const { initializer, fromInterval, toInterval, interval } = props;

		this.handleMouseUp = this.handleMouseUp.bind(this);

		let intervals;
		try {
			intervals = initializer(fromInterval, toInterval, interval);
			if (!Array.isArray(intervals)) throw new Error('Function should return an array');
		} catch(e) {
			throw e;
		}

		const selected = [];
		for (let i = 0; i < intervals.length; i++) {
			selected[i] = false;
		}

		this.state = { selected, startedOn: null, pulledTo: null, intervals };
	}

	componentDidMount() {
		document.addEventListener('mouseup', this.handleMouseUp);
	}

	componentWillUnmount() {
		document.removeEventListener('mouseup', this.handleMouseUp);
	}

	handleAreaMouseDown = (e) => {
		e.preventDefault();
	}

	handleIntervalMouseDown = (i, e) => {
		const { selected } = this.state;
		
		this.clickOnSelected = selected[i];

		this.setState({ startedOn: i, pulledTo: i });
	}

	handleAreaMouseUp = (e) => {
		if (this.state.startedOn === null) return;
		this.selectInterval(this.state.startedOn, this.state.pulledTo);
	}

	handleIntervalMouseEnter = (i, e) => {
		if (this.state.startedOn !== null) {
			this.setState({ pulledTo: i });
		}
	}

	handleIntervalMouseLeave = (i, e) => {
	}

	handleAreaMouseLeave = (e) => {
		this.setState({ pulledTo: null });
	}

	handleMouseUp(e) {
		this.setState({ startedOn: null, pulledTo: null });
		this.clickOnSelected = false;
	}

	handleTouchStart = (e) => {
	} 

	selectInterval(first, last) {
		const { selected } = this.state;

		const newSelected = selected.slice(0);
		const fromI = first < last ? first : last;
		const toI = first < last ? last : first;
		const value = !this.clickOnSelected;

		for (let i = fromI; i <= toI; i++) {
			newSelected[i] = value;
		}
		this.setState({ selected: newSelected });
		if (this.props.onChangeSelection) this.props.onChangeSelection(newSelected);
	}

	render() {
		const { selected, startedOn, pulledTo, intervals } = this.state;
		const { clickOnSelected } = this;
		const ranges = selected.map((v, k) => {
			let intSelected = v;

			if (startedOn !== null && pulledTo !== null) {
				if (startedOn < pulledTo) {
					if (k <= pulledTo && k >= startedOn) intSelected = !clickOnSelected;
				} else {
					if (k >= pulledTo && k <= startedOn) intSelected = !clickOnSelected;
				}
			} 
			return (<Interval 
				onMouseDown={this.handleIntervalMouseDown.bind(null, k)}
				onMouseEnter={this.handleIntervalMouseEnter.bind(null, k)}
				onMouseLeave={this.handleIntervalMouseLeave.bind(null, k)}
				selected={intSelected}
				text={intervals[k]}
				key={k} />);
		});

		return (
			<div className="ranges" 
				onMouseDown={this.handleAreaMouseDown}
				onMouseUp={this.handleAreaMouseUp}
				onMouseLeave={this.handleAreaMouseLeave} >
				<div className="ranges-container">
					{ranges}
				</div>
			</div>
		);
	}
};

export default ReactIntervalSelector;