import getRefs from './refs';
import { calculatorState } from './app';

const {
  calcFirstNumber,
  calcSecondNumber,
  calcSign,
  calculatorViewWrapper,
} = getRefs();
let {
  firstNumber,
  secondNumber,
  sign,
  result,
  accumulator,
} = calculatorState();

//Clear function
const clearAll = () => {
  firstNumber = '';
  secondNumber = '';
  sign = '';
  result = '';
  accumulator = '';
  calcFirstNumber.textContent = '0';
  calcSecondNumber.textContent = '';
  calcSign.textContent = '';
  calculatorViewWrapper.classList.remove('large-font');
  calculatorViewWrapper.classList.remove('medium-font');
  calculatorViewWrapper.classList.remove('small-font');
};
export default clearAll;
