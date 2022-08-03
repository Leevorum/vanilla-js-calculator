import getRefs from './refs';
import dragElement from './dragElement';
import handleClickFunctions from './handleClickFunction';
import handleClickNumbers from './handleClickNumbers';
const { container, calculatorNumbers, calculatorFunctions } = getRefs();

export function calculatorState() {
  return {
    firstNumber: '',
    secondNumber: '',
    sign: '',
    result: '',
    accumulator: '',
  };
}

export default function app() {
  calculatorNumbers.addEventListener('click', handleClickNumbers);
  calculatorFunctions.addEventListener('click', handleClickFunctions);
}

// Make the DIV element draggable:
dragElement(container);
