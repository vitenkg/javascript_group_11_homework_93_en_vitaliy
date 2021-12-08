import {toast} from "react-toastify";
import WarningIcon from '@material-ui/icons/Warning';
import axiosApi from "../../axiosApi";

export const FETCH_MAIN_REQUEST = 'FETCH_MAIN_REQUEST';
export const FETCH_MAIN_SUCCESS = 'FETCH_MAIN_SUCCESS';
export const FETCH_MAIN_FAILURE = 'FETCH_MAIN_FAILURE';

export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

export const CREATE_TRACK_HISTORY_REQUEST = 'CREATE_TRACK_HISTORY_REQUEST';
export const CREATE_TRACK_HISTORY_SUCCESS = 'CREATE_TRACK_HISTORY_SUCCESS';
export const CREATE_TRACK_HISTORY_FAILURE = 'CREATE_TRACK_HISTORY_FAILURE';

export const FETCH_HISTORY_REQUEST = 'FETCH_HISTORY_REQUEST';
export const FETCH_HISTORY_SUCCESS = 'FETCH_HISTORY_SUCCESS';
export const FETCH_HISTORY_FAILURE = 'FETCH_HISTORY_FAILURE';

export const fetchMainRequest = () => ({type: FETCH_MAIN_REQUEST});
export const fetchMainSuccess = data => ({type: FETCH_MAIN_SUCCESS, payload: data});
export const fetchMainFailure = () => ({type: FETCH_MAIN_FAILURE});

export const fetchAlbumsRequest = () => ({type: FETCH_ALBUMS_REQUEST});
export const fetchAlbumsSuccess = data => ({type: FETCH_ALBUMS_SUCCESS, payload: data});
export const fetchAlbumsFailure = () => ({type: FETCH_ALBUMS_FAILURE});

export const fetchTracksRequest = () => ({type: FETCH_TRACKS_REQUEST});
export const fetchTracksSuccess = data => ({type: FETCH_TRACKS_SUCCESS, payload: data});
export const fetchTracksFailure = () => ({type: FETCH_TRACKS_FAILURE});

export const createTrackHistoryRequest = () => ({type: CREATE_TRACK_HISTORY_REQUEST});
export const createTrackHistorySuccess = data => ({type: CREATE_TRACK_HISTORY_SUCCESS, payload: data});
export const createTrackHistoryFailure = error => ({type: CREATE_TRACK_HISTORY_FAILURE, payload: error});

export const fetchHistoryRequest = () => ({type: FETCH_HISTORY_REQUEST});
export const fetchHistorySuccess = data => ({type: FETCH_HISTORY_SUCCESS, payload: data});
export const fetchHistoryFailure = error => ({type: FETCH_HISTORY_FAILURE, payload: error});


export const fetchArtists = () => {
    return async dispatch => {
        try {
            dispatch(fetchMainRequest());
            const response = await axiosApi.get('/artists');
            dispatch(fetchMainSuccess(response.data));
        } catch (e) {
            dispatch(fetchMainFailure());
            toast.error('Could not fetch products!', {
                theme: 'colored',
                icon: <WarningIcon/>
            });
        }
    };
};

export const fetchAlbums = id => {
    return async dispatch => {
        let response = null;
        try {
            dispatch(fetchAlbumsRequest());
            if (id) {
                response = await axiosApi.get('/albums?artist=' + id);
            } else {
                response = await axiosApi.get('/albums');
            }
            dispatch(fetchAlbumsSuccess(response.data));
        } catch (e) {
            dispatch(fetchAlbumsFailure());
        }
    };
};

export const fetchTracks = (id, token) => {
    return async dispatch => {
        let response = null;
        try {
            dispatch(fetchTracksRequest());
            if (id) {
                response = await axiosApi.get('/tracks?album=' + id, {
                    headers: {
                        'Authorization': token,
                    }
                });
            } else {
                response = await axiosApi.get('/tracks');
            }
            dispatch(fetchTracksSuccess(response.data));
        } catch (e) {
            dispatch(fetchTracksFailure());
            if (e.response.status === 401) {
                toast.warning('You are not authorized');
            } else {
                toast.error('Could not fount tracks', {
                    theme: 'colored',
                    icon: <WarningIcon/>,
                });
            }
        }
    };
};


export const createTrackHistory = (token, track) => {
  return async dispatch => {
    try {
        dispatch(createTrackHistoryRequest());
        const response = await axiosApi.post('/track_history',{
         track: track,
        },{
            headers: {
                'Authorization': token,
            },

        });
        dispatch(createTrackHistorySuccess(response.data));
    } catch (e) {
        dispatch(createTrackHistoryFailure());
    }
  };
};

export const fetchHistory = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(fetchHistoryRequest());
            const response = await axiosApi.get('/track_history',{
                headers: {
                    'Authorization': getState().users.user && getState().users.user.token,
                },
            });
            dispatch(fetchHistorySuccess(response.data));
        } catch (e) {
            dispatch(fetchHistoryFailure());
        }
    };
};