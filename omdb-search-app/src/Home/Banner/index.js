import React from 'react';

import './index.css';

export const Banner = ({ customClass="", message="" }) => {
	return (
		<div className={`banner ${customClass}`}>
			{message}
		</div>
	)
}