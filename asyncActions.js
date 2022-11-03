const redux = require('redux');
const axios = require('axios');
const applyMiddleware = redux.applyMiddleware;
const reduxThunkMiddleware = require('redux-thunk').default;

const initialState = {
    loading:false,
    data:[],
    error:''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR'

const fetchUsersRequest=()=>{
    return{
        type:FETCH_USERS_REQUESTED,
    }
}

const fetchUsersSuccess=(users)=>{
    return{
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}

const fetchUsersError=(error)=>{
    return{
        type:FETCH_USERS_ERROR,
        payload:error
    }
}

const usersReducer = (state=initialState,action)=>{
    switch(action.type){
        case FETCH_USERS_REQUESTED:
            return{
                ...state,
                loading:true
            }
        case FETCH_USERS_SUCCESS:
            return{
                ...state,
                loading:false,
                data:action.payload,
            } 
        case FETCH_USERS_ERROR:
            return{
                loading:false,
                data:[],
                error:action.payload,
            }       
    }
}

const createStore = redux.createStore;

const fetchUsers = () => {

    // Redux-Thunk allows the ability to action creator to return a function(with dispatch() && getState() as default arg) instead of 
    // an object and hence we can perform async task
    return function(dispatch,getState){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((res)=>{
            const users = res.data;
            dispatch(fetchUsersSuccess(users));
        }).catch((error)=>{
            console.log('Error Messageeeeeeeee',error);
            dispatch(fetchUsersError(error.message));
        })
    }
}

const store = createStore(usersReducer,applyMiddleware(reduxThunkMiddleware));
const unsub = store.subscribe(()=>{
    console.log('State Updateddddddddd',store.getState());
});
store.dispatch(fetchUsers());
