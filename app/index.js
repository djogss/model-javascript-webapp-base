console.log('Hello World!');  
import expect, { createSpy, spyOn, isSpy } from 'expect'

const counter = (state = 0, action) => {
    switch(action.type){
      case  'INC': return state + 1;
      case  'DEC': return state - 1;
      default: return state;
    }
  }

  expect(counter(1, {type:'INC'})).toEqual(2)
  
  expect(counter(1, {type:'DEC'})).toEqual(0)
  
  expect(counter(1, {type:'UNKNOWN'})).toEqual(1)
  
  expect(counter(undefined, {})).toEqual(0)
  
  console.log("All tests success")

console.log("test success")
  