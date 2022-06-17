import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DANGER_BANNER, MY_NOMINATIONS, NEXT_BUTTON, NOMINATE, NO_NOMINATIONS, NO_RESULTS, PREVIOUS_BUTTON, REMOVE, SEARCH_RESULTS, SUCCESS_BANNER } from '../constants';

import * as actionType from '../store/actions';
import { Banner } from './Banner';
import Button from './Button';
import Tile from './Tile';

import './index.css';

const Home = ({ moviesList, nominatedDataFromStorage, nominatedDataList, error, inputVal, searchResultsText, prev, next, currentPageNumber }) => {
	const [danger, setDanger] = useState(false);
	const widthClass = moviesList && moviesList.length > 0 ? 'new-width' : '';

	useEffect(() => {
		const getLocalStorageItem = localStorage.getItem('nominations');
		const nominationItems = (getLocalStorageItem && getLocalStorageItem.length > 0) ? getLocalStorageItem : [];
		nominationItems.length > 0 && nominatedDataFromStorage(JSON.parse(nominationItems));
		setDanger(false);
	}, []);

	useEffect(() => {
		localStorage.setItem('nominations', JSON.stringify(nominatedDataList));
		const dataLengthCheck = nominatedDataList.length === 5 && moviesList && moviesList.length > 0;
		dataLengthCheck ? setDanger(true) : setDanger(false);
	}, [nominatedDataList]);

	const tilesContainer = () => {
		return moviesList && moviesList.map((item) => {
			const id = item.imdbID;
			const filterById = nominatedDataList && nominatedDataList.length > 0 && nominatedDataList.filter(i => i['imdbID'] === id);
			const val = filterById.length > 0 || danger ? true : false;

			return <Tile
				key={id}
				item={item}
				button={NOMINATE}
				val={val}
				tileId="nominate"
			/>
		})
	}

	const nominatedContainer = () => {
		return nominatedDataList.map((item, index) => {
			const id = item.imdbID;

			return <Tile
				key={id}
				item={item}
				button={REMOVE}
				tileId="remove"
			/>
		})
	}

	return <div className='content-container'>
		{error && inputVal.length > 0 && <div className="error-state">{NO_RESULTS} "{inputVal}"</div>}
		{moviesList && moviesList.length > 0 && !danger && <Banner message={SUCCESS_BANNER} customClass="success" />}
		{danger && <Banner message={DANGER_BANNER} customClass="danger" />}
		<div className="movie-list-container">
			{moviesList && moviesList.length > 0 ? <div className={`movie-list-all ${widthClass}`}>
				<div>
					{searchResultsText && <div className="search-results-title">
						<span className="search-for">{SEARCH_RESULTS} </span>
						<span className="result">"{inputVal}"</span>
					</div>}
					{tilesContainer()}
				</div>
				<div className="buttons-container">
					{prev && currentPageNumber !== 1 && <Button
						customClass="prev"
						content={PREVIOUS_BUTTON}
					/>}
					{next && <Button
						customClass="next"
						content={NEXT_BUTTON}
					/>}
				</div>
			</div> : null}
			<div className={`movie-list-nominated ${widthClass}`}>
				<div className="nomination-title search-results-title">{MY_NOMINATIONS}</div>
				<div>{(nominatedDataList.length > 0) ? nominatedContainer() : <div className="no-nominations">{NO_NOMINATIONS}</div>}</div>
			</div>
		</div>
	</div>
}

const mapStateToProps = state => {
	return {
		moviesList: state.moviesList,
		error: state.error,
		inputVal: state.inputVal,
		totalPages: state.totalPages,
		searchResultsText: state.searchResultsText,
		next: state.next,
		prev: state.prev,
		nominatedDataList: state.nominatedData,
		currentPageNumber: state.currentPage,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchData: (data) => dispatch({ type: actionType.MOVIES_LIST, payload: data }),
		setNext: (data) => dispatch({ type: actionType.NEXT, payload: data }),
		nominatedData: (data) => dispatch({ type: actionType.NOMINATED_DATA, payload: data }),
		nominatedDataFromStorage: (data) => dispatch({ type: actionType.NOMINATED_DATA_FROM_STORAGE, payload: data }),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

