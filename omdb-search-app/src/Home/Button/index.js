import React from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions';

import "./index.css";

const Button = ({customClass, setPrev, currentPage, currentPageNumber, inputVal, totalPages, setNext, fetchData, content}) => {
	const navigate = () => {
		if (customClass === 'next') {
			setPrev(true);
			currentPage(currentPageNumber + 1);
			fetch(`http://www.omdbapi.com/?s=${inputVal}&type=movie&apikey=265a831e&page=${currentPageNumber + 1}`)
				.then(response => response.json())
				.then(data => {
					if (currentPageNumber + 1 === totalPages) {
						setNext(false);
						setPrev(true)
					} else {
						setNext(true);
					}
					fetchData(data.Search)
				});
		} else if (customClass === 'prev') {
			setNext(true);
			currentPage(currentPageNumber - 1);
			fetch(`http://www.omdbapi.com/?s=${inputVal}&type=movie&apikey=265a831e&page=${currentPageNumber - 1}`)
				.then(response => response.json())
				.then(data => {
					if (currentPageNumber - 1 === 1) {
						setPrev(false)
					} else {
						setPrev(true);
					}
					fetchData(data.Search)
				});
		}
	}

	return (
		<button className={`rounded-button ${customClass}`} onClick={navigate}>{content}</button>
	)
}

const mapStateToProps = state => {
	return {
		currentPageNumber: state.currentPage,
		inputVal: state.inputVal,
		totalPages: state.totalPages
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchData: (data) => dispatch({ type: actionType.MOVIES_LIST, payload: data }),
		setNext: (data) => dispatch({ type: actionType.NEXT, payload: data }),
		nominatedData: (data) => dispatch({ type: actionType.NOMINATED_DATA, payload: data }),
		nominatedDataFromStorage: (data) => dispatch({ type: actionType.NOMINATED_DATA_FROM_STORAGE, payload: data }),
		currentPage: (data) => dispatch({ type: actionType.CURRENT_PAGE, payload: data }),
		setPrev: (data) => dispatch({ type: actionType.PREV, payload: data }),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Button);