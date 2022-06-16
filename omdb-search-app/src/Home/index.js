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

    useEffect(() => {
        const test = (localStorage.getItem('nominations') && localStorage.getItem('nominations').length > 0) ? localStorage.getItem('nominations') : [];
        test.length > 0 && setFoo(JSON.parse(test));
    }, [])

    useEffect(() => {
        console.log(foo)
        if(foo && foo.length > 0) {
            localStorage.setItem('nominations', JSON.stringify(foo));
            setActive(true);
        }
    }, [foo]);

    const doSomething = (e) => {
        if(e.keyCode === 13) {
            fetch(`http://www.omdbapi.com/?s=${inputVal}&type=movie&apikey=265a831e&page=1`)
            .then(response => response.json())
            .then(data => {
                const pages = Math.ceil(data.totalResults/10);
                setTotalPages(pages);
                if(pages > 1) {
                    setNext(true);
                }
                setSearchResults(data.Search)
            });
        }
    }

    const nominateMe = (e, item) => {
        setFoo([...foo, item]);
        e.target.setAttribute('disabled', true);
    }

    const tilesContainer = () => {
        return searchResults.map((item, index) => {
            const id = item.imdbID;
            // const getIdsFromLocal = localStorage.getItem('nominations') && localStorage.getItem('nominations').split(',');
            const isDisabled = foo && foo.length > 0 ? foo.includes(id) : false;

            return <div className='movie-tile' key={index}>
                <div class="movie-details">
                    <div className='movie-title'>{item.Title}</div>
                    <div className='movie-year'>({item.Year})</div>
                </div>
                <button className="nominate-me" onClick={(e) => nominateMe(e, item)} disabled={isDisabled}>Nominate</button>
            </div>
        })
    }

    const removeNominee = (e, item) => {
        const getId = item.imdbID;
        const testThis = [...foo];
        testThis.splice(testThis.findIndex(i => i.id === getId),1);
        setFoo(testThis)
    }

    const nominatedContainer = () => {
        return foo.map((item, index) => {
            const id = item.imdbID;

            return <div key={id}>
                <div>{item.Title}</div>
                <div>{item.Year}</div>
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

    return <div className='content-container'>
        <input 
            className='input-movie'
            placeholder='Enter Movie Name'
            val={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={doSomething}
             />
        <div className="one">
            <div className="one_1">
                <div>
                    <div className="search-results-title">
                        <span className="search-for">Search results for: </span>
                        <span className="result">{inputVal}</span>
                    </div>
                    {searchResults.length > 0 ? tilesContainer() : null}
                </div>
                <div className="buttons-container">
                    {prev && currentPage !== 1 && <button class="prev" onClick={prevResults}>Previous</button>}
                    {next && <button class="next" onClick={nextResults}>Next</button>}
                </div>
            </div>
            <div className='one_2'>
                <div>{(active && foo.length > 0) ? nominatedContainer() : null}</div>
            </div>
        </div>
    </div>
}