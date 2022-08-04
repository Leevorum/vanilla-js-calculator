import getRefs, { calcState } from './refs';

const {
  calcFirstNumber,
  calcSecondNumber,
  calcSign,
  calculatorViewWrapper,
} = getRefs();

//Clear function
const clearAll = () => {
  calcState.firstNumber = '';
  calcState.secondNumber = '';
  calcState.sign = '';
  calcState.result = '';
  calcState.accumulator = '';
  calcFirstNumber.textContent = '0';
  calcSecondNumber.textContent = '';
  calcSign.textContent = '';
  calculatorViewWrapper.classList.remove('large-font');
  calculatorViewWrapper.classList.remove('medium-font');
  calculatorViewWrapper.classList.remove('small-font');
};
export default clearAll;
