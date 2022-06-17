import * as actionType from './actions';
const initialState = {
    error: false,
    searchResultsText: false,
    totalPages: 0,
    next: false,
    prev: false,
    moviesList: [],
    inputVal: '',
    nominatedData: [],
    currentPage: 1
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.MOVIES_LIST:
            return {
                ...state,
                moviesList: action.payload
            }
        case actionType.ERROR:
            return {
                ...state,
                error: action.payload
            }
        case actionType.SEARCH_RESULTS_TEXT:
            return {
                ...state,
                searchResultsText: action.payload
            }
        case actionType.TOTAL_PAGES:
            return {
                ...state,
                totalPages: action.payload
            }
        case actionType.NEXT:
            return {
                ...state,
                next: action.payload
            }
        case actionType.PREV:
            return {
                ...state,
                prev: action.payload
            }
        case actionType.INPUT_VAL:
            return {
                ...state,
                inputVal: action.payload
            }
        case actionType.NOMINATED_DATA:
            return {
                ...state,
                nominatedData: [...state.nominatedData, action.payload]
            }
        case actionType.REMOVE_NOMINATED_DATA:
            return {
                ...state,
                nominatedData: action.payload
            }
        case actionType.NOMINATED_DATA_FROM_STORAGE:
            return {
                ...state,
                nominatedData: action.payload
            }
        case actionType.CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        default:
            return state
    }
}
export default reducer;