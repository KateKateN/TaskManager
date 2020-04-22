const redux = require('redux');
const createStore = redux.createStore; // func

// store need to be initializided with a reduces, 
// because reducer closely connected to the store, its the only thing that may update the state
// that is why we need to passed reducer to this createStore func
// reducer before the create store 
// reducer just function recieves 2 arg (state(old state) and action)
// reducer return updated state

const initialState = {
   counter: 0
}

// Reducer
const rootReducer = (state = initialState, action) => {
   // logic
   if (action.type === 'INC_COUNTER'){
      return {
         ...state,
         counter: state.counter + 1
      }
   }
   if (action.type === 'ADD_COUNTER'){
      return {
         ...state,
         counter: state.counter + action.value
      }
   }
   return state;
}

// Store 
const store = createStore(rootReducer);
console.log(store.getState());

// Subscriptions (after the store was creacted) triggered when action is dispatched (state updating)
// inform me when need to get a new state bacause somthing change
// subscription method takes argument - a func which will be executed when state will upated 

store.subscribe(() => {
   console.log('[Subscription]', store.getState())
});


// Dispatching Action
// dispatch func takes arg => action (js ojcet needs to have type property, can add any other properties like id name ...)
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());

