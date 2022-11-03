const redux = require('redux');
const reduxLogger = require('redux-logger');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCK = 'CAKE_RESTOCK';
const ICECREAM_RESTOCK = 'ICECREAM_RESTOCK';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';

const logger = reduxLogger.createLogger();

//Action creators (functions that returns actions(objects with type))
function orderCake(){
    return{
        type:CAKE_ORDERED,
        quantity:1
    }
}

function reStockCakes(qty=1){
    return{
        type:CAKE_RESTOCK,
        payload:qty
    }
}

function orderIcecream(){
    return{
        type:ICECREAM_ORDERED,
        quantity:1
    }
}

function reStockIcecream(qty=1){
    return{
        type:ICECREAM_RESTOCK,
        payload:qty
    }
}

// Reducer
// const initialState = {
//     numberOfCakes:10,
//     numberOfIcecreams:20
// }

const cakeInitialState = {
    numberOfCakes:10,
}
const icecreamInitialState = {
    numberOfIcecreams:20,
}


const cakeReducer = (state=cakeInitialState,action)=>{
    switch(action.type){
        case CAKE_ORDERED:
        return{
            ...state,// copy the state attributes first before changing any
            numberOfCakes:state.numberOfCakes-1
        }
        case CAKE_RESTOCK:
            return{
                ...state,
                numberOfCakes:state.numberOfCakes+action.payload
            }
        default:
            return state;
    }
}

const icecreamReducer = (state=icecreamInitialState,action)=>{
    switch(action.type){
        case ICECREAM_ORDERED:
            return{
                ...state,
                numberOfIcecreams:state.numberOfIcecreams-1
            }
        case ICECREAM_RESTOCK:
            return{
                ...state,
                numberOfIcecreams:state.numberOfIcecreams+action.payload
            }
        default:
            return state;
    }
}
const rootReducer = combineReducers({cake:cakeReducer,icecream:icecreamReducer}) // to combine multiple reducers
const store = createStore(rootReducer,applyMiddleware(logger));

console.log('My Console .... Initial State',store.getState());

const unsubscribe = store.subscribe(()=>{
    // console.log('State Updated', store.getState()); // since we are now using redux-logger so don't need it now
});

// using direct store.dispatch
        // store.dispatch(orderCake());
        // store.dispatch(orderCake());
        // store.dispatch(orderCake());
        // store.dispatch(reStockCakes(3));

// using bindActionCreator (), it is not necessary these days. We can use the above method.
const actions = bindActionCreators({orderCake,reStockCakes,orderIcecream,reStockIcecream},store.dispatch);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.reStockCakes(3);
actions.orderIcecream();
actions.orderIcecream();
actions.reStockIcecream(2);

unsubscribe();