function getRefs() {
  return {
    container: document.querySelector('.container'),
    calculator: document.querySelector('.calculator'),
    calcFirstNumber: document.querySelector('.calculator-first-number'),
    calcSecondNumber: document.querySelector('.calculator-second-number'),
    calcSign: document.querySelector('.calculator-sign'),
    calculatorNumbers: document.querySelector('.calculator-numbers'),
    calculatorFunctions: document.querySelector('.calculator-functions'),
    calculatorViewWrapper: document.querySelector('.view-wrapper'),
  };
}

export const calcState = {
  firstNumber: '',
  secondNumber: '',
  sign: '',
  result: '',
  accumulator: '',
};
export const functionsArray = ['Clear', 'Enter', '=', '/', '*', '-', '+', '%'];
export const numbersArray = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '.',
];
export default getRefs;
