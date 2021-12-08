import {
    FETCH_ALBUMS_FAILURE,
    FETCH_ALBUMS_REQUEST,
    FETCH_ALBUMS_SUCCESS, FETCH_HISTORY_FAILURE, FETCH_HISTORY_REQUEST, FETCH_HISTORY_SUCCESS,
    FETCH_MAIN_FAILURE,
    FETCH_MAIN_REQUEST,
    FETCH_MAIN_SUCCESS, FETCH_TRACKS_FAILURE, FETCH_TRACKS_REQUEST, FETCH_TRACKS_SUCCESS
} from "../Actions/mainActions";


const initialState = {
    fetchLoading: false,
    singleLoading: false,
    artists: [],
    albums: null,
    tracks: null,
    history: null,
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MAIN_REQUEST:
            return {...state, fetchLoading: true};
        case FETCH_MAIN_SUCCESS:
            return {...state,  fetchLoading: false, artists: action.payload};
        case FETCH_MAIN_FAILURE:
            return {...state, fetchLoading: false};
        case FETCH_ALBUMS_REQUEST:
            return {...state, singleLoading: true};
        case FETCH_ALBUMS_SUCCESS:
            return {...state,  singleLoading: false, albums: action.payload};
        case FETCH_ALBUMS_FAILURE:
            return {...state, singleLoading: false};
        case FETCH_TRACKS_REQUEST:
            return {...state, singleLoading: true};
        case FETCH_TRACKS_SUCCESS:
            return {...state,  singleLoading: false, tracks: action.payload};
        case FETCH_TRACKS_FAILURE:
            return {...state, singleLoading: false};
        case FETCH_HISTORY_REQUEST:
            return {...state, singleLoading: true};
        case FETCH_HISTORY_SUCCESS:
            return {...state,  singleLoading: false, history: action.payload};
        case FETCH_HISTORY_FAILURE:
            return {...state, singleLoading: false};
        default:
            return state;
    }
};

export default mainReducer;