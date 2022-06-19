import React from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions';
import { string, func } from 'prop-types';

import "./index.css";

const SearchInput = ({setSearchResultsText, inputVal, setError, setTotalPages, fetchData, setNext, setInputVal}) => {
	const getData = (e) => {		
		if(e.keyCode === 13) {
			setSearchResultsText(true);
			fetch(`http://www.omdbapi.com/?s=${inputVal}&type=movie&apikey=265a831e&page=1`)
			.then(response => response.json())
			.then(data => {
				const errorResponse = data.Response === 'False' || data.Error === 'Too many results.';
				if(errorResponse) {
					setError(true);
				} else {
					const pages = Math.ceil(data.totalResults/10);
					setError(false);
					setTotalPages(pages);
					fetchData(data.Search);

					if(pages > 1) {
						setNext(true);
					}
				}
			});
		}
	}

	return (
		<div>
			<label for="movie-name-input" className="movie-name-input">Movie Title: </label>
			<input 
				className='input-movie'
				placeholder='Enter Movie Title to Nominate'
				val={inputVal}
				onChange={(e) => setInputVal(e.target.value)}
				onKeyDown={getData}
				id="movie-name-input"
			/>
		</div>
	)
}

const mapStateToProps = state => {
	return {
			moviesList: state.moviesList,
			inputVal: state.inputVal
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchData: (data) => dispatch({ type: actionType.MOVIES_LIST, payload: data }),
		setError: (data) => dispatch({ type: actionType.ERROR, payload: data }),
		setSearchResultsText: (data) => dispatch({ type: actionType.SEARCH_RESULTS_TEXT, payload: data }),
		setTotalPages: (data) => dispatch({ type: actionType.TOTAL_PAGES, payload: data }),
		setNext: (data) => dispatch({ type: actionType.NEXT, payload: data }),
		setInputVal: (data) => dispatch({ type: actionType.INPUT_VAL, payload: data }),
	}
}

SearchInput.propTypes = {
	inputVal: string,
	setNext: func,
	fetchData: func,
	setError: func,
	setSearchResultsText: func,
	setTotalPages: func,
	setInputVal: func
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchInput);