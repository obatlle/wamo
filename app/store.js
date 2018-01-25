import createStore from "redux-zero";

const initialState = { count: 0, postingStep:1 };
const store = createStore(initialState);

export default store;
