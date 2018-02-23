import createStore from "redux-zero";

const initialState = { count: 0, postingStep:0, seats:1, tripDate:'', originCity:'New York City', destinationCity:'' };
const store = createStore(initialState);

export default store;
