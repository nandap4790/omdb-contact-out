import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import * as actionType from '../store/actions';
import { Banner } from './Banner';
import Tile from './Tile';

const Home = (props) => {
    const [foo, setFoo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [prev, setPrev] = useState(false);
    const [danger, setDanger] = useState(false);

    useEffect(() => {
        const test = (localStorage.getItem('nominations') && localStorage.getItem('nominations').length > 0) ? localStorage.getItem('nominations') : [];
        test.length > 0 && props.nominatedDataFromStorage(JSON.parse(test));
        setDanger(false);
    }, [])

    useEffect(() => {
        localStorage.setItem('nominations', JSON.stringify(props.nominatedDataList));
        if(props.nominatedDataList.length === 5 && props.moviesList && props.moviesList.length > 0) {
            setDanger(true);
        } else {
            setDanger(false);
        }
    }, [props.nominatedDataList]);

    const nominateMe = (e, item) => {
        setFoo([...foo, item]);
    }

    const tilesContainer = () => {
        return props.moviesList && props.moviesList.map((item, index) => {
            const id = item.imdbID;
            const filterById = foo && foo.length > 0 && foo.filter(i => i['imdbID'] === id);
            const val = filterById.length > 0 || danger ? true : false;

            return <Tile
                        key={id}
                        item={item}
                        button="Nominate"
                        val={val}
                        tileId="nominate"
                    />
        })
    }

    const removeNominee = (e, item) => {
        const getId = item.imdbID;
        const testThis = [...foo];
        testThis.splice(testThis.findIndex(i => i['imdbID'] === getId),1);
        setFoo(testThis)
    }

    const nominatedContainer = () => {
        return props.nominatedDataList.map((item, index) => {
            const id = item.imdbID;

            return <Tile
                    key={id}
                    item={item}
                    button="Remove"
                    tileId="remove"
                />
        })
    }

    const nextResults = () => {
        setPrev(true);
        setCurrentPage(currentPage + 1);
        fetch(`http://www.omdbapi.com/?s=${props.inputVal}&type=movie&apikey=265a831e&page=${currentPage + 1}`)
        .then(response => response.json())
        .then(data => {
            if(currentPage + 1 === props.totalPages) {
                props.setNext(false);
                setPrev(true)
            } else {
                props.setNext(true);
            }
            props.fetchData(data.Search)
        });
    }

    const prevResults = () => {
        props.setNext(true);
        setCurrentPage(currentPage - 1);
        fetch(`http://www.omdbapi.com/?s=${props.inputVal}&type=movie&apikey=265a831e&page=${currentPage - 1}`)
        .then(response => response.json())
        .then(data => {
            if(currentPage - 1 === 1) {
                setPrev(false)
            } else {
                setPrev(true);
            }
            props.fetchData(data.Search)
        });
    }

    const widthClass = props.moviesList && props.moviesList.length > 0 ? 'new-width' : '';

    return <div className='content-container'>
        {props.error && props.inputVal.length > 0 && <div className="error-state">No Results to display for "{props.inputVal}"</div>}
        {props.moviesList && props.moviesList.length > 0 && !danger && <Banner message="You can nominate upto 5 movies." customClass="success" />}
        {danger && <Banner message="You cannot nominate more than 5 movies." customClass="danger" />}
        <div className="one">
            {props.moviesList && props.moviesList.length > 0 ? <div className={`one_1 ${widthClass}`}>
                <div>
                    {props.searchResultsText && <div className="search-results-title">
                        <span className="search-for">Search results for: </span>
                        <span className="result">"{props.inputVal}"</span>
                    </div>}
                    {tilesContainer()}
                </div>
                <div className="buttons-container">
                    {prev && currentPage !== 1 && <button class="prev" onClick={prevResults}>Previous</button>}
                    {props.next && <button class="next" onClick={nextResults}>Next</button>}
                </div>
            </div> : null}
            <div className={`one_2 ${widthClass}`}>
                <div className="nomination-title search-results-title">My Nominations</div>
                <div>{(props.nominatedDataList.length > 0) ? nominatedContainer() : <div className="no-nominations">No Nominations Yet</div>}</div>
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
        nominatedDataList: state.nominatedData
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

