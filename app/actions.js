export default actions = store => ({
  increment: state => ({ count: state.count + 1 }),
  decrement: state => ({ count: state.count - 1 }),
  moveNextStep: state => ({postingStep: state.postingStep+1}),
  movePreviousStep: state => ({postingStep: state.postingStep-1}),
  rebootSteps: state => ({postingStep: 1}),
});


//PostingScreen.js
//
//<button onClick={() => increment(10)}>Increment 10</button>
//
//Action.js
//
//const actions = store => ({
//  increment: (state, payload) => ({ count: state.count + payload }),
//});
