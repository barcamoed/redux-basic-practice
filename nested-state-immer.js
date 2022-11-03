const produce = require('immer').produce;
const redux = require('redux');

const initialState = {
    name:'Rizwan',
    address:{
        city:'Okara',
        zip:'1122'
    }
}

const ADDRESS_UPDATE = 'ADDRESS_UPDATE';

const actionCreatorForState=(newAddress)=>{
    return{
        type:ADDRESS_UPDATE,
        payload:newAddress
    }
}

const addressReducer=(state=initialState,action)=>{

    switch(action.type){
        case ADDRESS_UPDATE:

        // Without immer.js, state handling can be complex like below

            // return{
            //     ...state,
            //     address:{
            //         ...state.address,
            //         city:action.payload
            //     }
            // }

        // with immer.js    

            return produce(state,(stateCopy)=>{
                stateCopy.address.city=action.payload;
            })
        default:
            return state;    
            
    }

}

const store = redux.createStore(addressReducer);

console.log('Initial State',store.getState());

const unsub = store.subscribe(()=>{
    console.log('Updated State',store.getState());
});
store.dispatch(actionCreatorForState('Lahore'));
unsub();