export default actions = store => ({
  increment: state => ({ count: state.count + 1 }),
  decrement: state => ({ count: state.count - 1 }),
  moveNextStep: state => ({postingStep: state.postingStep+1}),
  movePreviousStep: state => ({postingStep: state.postingStep-1}),
  rebootSteps: state => ({postingStep: state.postingStep-4}),
  incrementSeats: (state) => ({ seats: Math.max(state.seats+1,1)}),
  decrementSeats: (state) => ({ seats: Math.max(state.seats-1,1)}),
  rebootSeats: (state) => ({seats:1}),
  setDate: (state,payload)=>({tripDate: payload.dateString}),
  rebootTripDate: (state) => ({tripDate:''}),
  setOriginCity: (state,payload)=>({originCity: payload}),
  rebootOriginCity:  (state) => ({originCity:''}),
  setDestinationCity: (state,payload)=>({destinationCity: payload}),
  rebootDestinationCity:  (state) => ({destinationCity:''}),
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
