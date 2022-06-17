import React, {useState, useEffect} from 'react';

export const Home = () => {
    const [searchResults, setSearchResults] = useState({});
    const [inputVal, setInputVal] = useState('');
    const [foo, setFoo] = useState([]);
    const [active, setActive] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [searchResultsText, setSearchResultsText] = useState(false);
    const [danger, setDanger] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const test = (localStorage.getItem('nominations') && localStorage.getItem('nominations').length > 0) ? localStorage.getItem('nominations') : [];
        test.length > 0 && setFoo(JSON.parse(test));
        setDanger(false);
    }, [])

    useEffect(() => {
        localStorage.setItem('nominations', JSON.stringify(foo));
        setActive(true);
        if(foo.length === 5 && searchResults.length > 0) {
            setDanger(true);
        } else {
            setDanger(false);
        }
    }, [foo]);

    const doSomething = (e) => {
        if(e.keyCode === 13) {
            setSearchResultsText(true);
            fetch(`http://www.omdbapi.com/?s=${inputVal}&type=movie&apikey=265a831e&page=1`)
            .then(response => response.json())
            .then(data => {
                if(data.Response === 'False' || data.Error === 'Too many results.') {
                    setError(true);
                } else {
                    setError(false);
                    const pages = Math.ceil(data.totalResults/10);
                    setTotalPages(pages);
                    if(pages > 1) {
                        setNext(true);
                    }
                    setSearchResults(data.Search)
                }
            });
        }
    }

    const nominateMe = (e, item) => {
        setFoo([...foo, item]);
    }

    const tilesContainer = () => {
        return searchResults.map((item, index) => {
            const id = item.imdbID;
            const filterById = foo && foo.length > 0 && foo.filter(i => i['imdbID'] === id);
            const val = filterById.length > 0 || danger ? true : false;

            return <div className='movie-tile' key={id}>
                <div class="movie-details">
                    <div className='movie-title'>{item.Title}</div>
                    <div className='movie-year'>({item.Year})</div>
                </div>
                <button className="nominate-me" onClick={(e) => nominateMe(e, item)} disabled={val}>Nominate</button>
            </div>
        })
    }

    const removeNominee = (e, item) => {
        const getId = item.imdbID;
        const testThis = [...foo];
        testThis.splice(testThis.findIndex(i => i['imdbID'] === getId),1);
        setFoo(testThis)
    }

    const nominatedContainer = () => {
        return foo.map((item, index) => {
            const id = item.imdbID;

            return <div className='movie-tile' key={id}>
                <div class="movie-details">
                    <div className='movie-title'>{item.Title}</div>
                    <div className='movie-year'>({item.Year})</div>
                </div>
                <button className="nominate-me" id={id} onClick={(e) => removeNominee(e, item)}>Remove</button>
            </div>
        })
    }

    const nextResults = () => {
        setPrev(true);
        setCurrentPage(currentPage + 1);
        fetch(`http://www.omdbapi.com/?s=${inputVal}&type=movie&apikey=265a831e&page=${currentPage + 1}`)
        .then(response => response.json())
        .then(data => {
            if(currentPage + 1 === totalPages) {
                setNext(false);
                setPrev(true)
            } else {
                setNext(true);
            }
            setSearchResults(data.Search)
        });
    }

    const prevResults = () => {
        setNext(true);
        setCurrentPage(currentPage - 1);
        fetch(`http://www.omdbapi.com/?s=${inputVal}&type=movie&apikey=265a831e&page=${currentPage - 1}`)
        .then(response => response.json())
        .then(data => {
            if(currentPage - 1 === 1) {
                setPrev(false)
            } else {
                setPrev(true);
            }
            setSearchResults(data.Search)
        });
    }

    const widthClass = searchResults.length > 0 ? 'new-width' : '';

    return <div className='content-container'>
        <label for="movie-name-input" class="movie-name-input">Movie Title: </label>
        <input 
            className='input-movie'
            placeholder='Enter Movie Title to Nominate'
            val={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={doSomething}
            id="movie-name-input"
        />
        {error && inputVal.length > 0 && <div className="error-state">No Results to display for "{inputVal}"</div>}
        {searchResults.length > 0 && !danger && <div className='banner success'>
            You can nominate upto 5 movies.
        </div>} 
        {danger && <div className='banner danger'>
            You cannot nominate more than 5 movies.
        </div>} 
        <div className="one">
            {searchResults.length > 0 ? <div className={`one_1 ${widthClass}`}>
                <div>
                    {searchResultsText && <div className="search-results-title">
                        <span className="search-for">Search results for: </span>
                        <span className="result">"{inputVal}"</span>
                    </div>}
                    {tilesContainer()}
                </div>
                <div className="buttons-container">
                    {prev && currentPage !== 1 && <button class="prev" onClick={prevResults}>Previous</button>}
                    {next && <button class="next" onClick={nextResults}>Next</button>}
                </div>
            </div> : null}
            <div className={`one_2 ${widthClass}`}>
                <div className="nomination-title search-results-title">My Nominations</div>
                <div>{(active && foo.length > 0) ? nominatedContainer() : <div className="no-nominations">No Nominations Yet</div>}</div>
            </div>
        </div>
    </div>
}