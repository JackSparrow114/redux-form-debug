import streams from '../apis/streams';
import { 
    SIGN_IN, 
    SIGN_OUT , 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM, 
    DELETE_STREAM, 
    EDIT_STREAM 
} from './types';
import history from '../history';

export const signIn = (userId) => {
    return {
        type : SIGN_IN,
        payload : userId
    };
};

export const signOut = () => {
    return {
        type : SIGN_OUT
    };
};

export const createStream = formValues => async (dispatch, getState) => {
    const {userId} = getState().auth;
    const newStream = await streams.post('/streams', { ...formValues, userId });

    dispatch({
        type : CREATE_STREAM,
        payload : newStream.data
    });
    history.push('/');
};

export const fetchStreams = () => async dispatch => {
    const myStreams = await streams.get('/streams');
    dispatch({
        type : FETCH_STREAMS,
        payload : myStreams.data
    });
};

export const fetchStream = id => async dispatch => {
    const requestedStream = await streams.get(`/streams/${id}`);

    dispatch({
        type : FETCH_STREAM,
        payload : requestedStream.data
    });
};

export const editStream = (id, formValues) => async dispatch => {
    const editedStream = await streams.patch(`/streams/${id}`, formValues);

    dispatch({
        type : EDIT_STREAM,
        payload : editedStream.data
    });
    history.push('/');
};

export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({
        tpe : DELETE_STREAM,
        payload : id
    });
};