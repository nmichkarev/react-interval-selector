import React from 'react';
import PropTypes from 'prop-types';
import Label from './Label';

class Interval extends React.Component {

	static propTypes = {
		selected: PropTypes.bool,
		text: PropTypes.string
	}

	static defaultProps = {
		text: ''
	}

	render() {
		const { selected, text } = this.props;
		const selectedCN = selected ? ' selected' : '';

		return (
			<div className="ranges-container__range">
				<div className={`range-interval${selectedCN}`} {...this.props} />
				<Label text={text} />
			</div>
		);
	}
}

export default Interval;