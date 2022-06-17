import React from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions';

import './index.css';

const Tile = ({ tileId, nominatedData, item, nominatedDataList, removeNomination, id, val, button }) => {
	const eventOnClickFunc = () => {
		if (tileId === 'nominate') {
			nominatedData(item)
		} else {
			const getId = item.imdbID;
			const testThis = [...nominatedDataList];
			testThis.splice(testThis.findIndex(i => i['imdbID'] === getId), 1);
			removeNomination(testThis);
		}

	}
	return <div className='movie-tile' key={id}>
		<div className="movie-details">
			<div className='movie-title'>{item.Title}</div>
			<div className='movie-year'>({item.Year})</div>
		</div>
		<button className="rounded-button nominate-me" onClick={eventOnClickFunc} disabled={val || undefined}>{button}</button>
	</div>
}

const mapStateToProps = state => {
	return {
		nominatedDataList: state.nominatedData
	}
}

const mapDispatchToProps = dispatch => {
	return {
		nominatedData: (data) => dispatch({ type: actionType.NOMINATED_DATA, payload: data }),
		removeNomination: (data) => dispatch({ type: actionType.REMOVE_NOMINATED_DATA, payload: data })
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Tile);
