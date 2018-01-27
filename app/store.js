import createStore from "redux-zero";

const initialState = { count: 0, postingStep:0 };
const store = createStore(initialState);

export default store;
