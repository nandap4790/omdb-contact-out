import React from 'react';
import { string } from 'prop-types'

import './index.css';

export const Banner = ({ customClass, message }) => {
	return (
		<div className={`banner ${customClass}`}>
			{message}
		</div>
	)
}

Banner.defaultProps = {
	customClass: '',
	message: ''
};

Banner.propTypes = {
	customClass: string,
	message: string
}