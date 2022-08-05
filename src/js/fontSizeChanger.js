import getRefs, { calcState } from './refs';

const { calculatorViewWrapper } = getRefs();

export default function fontSizeChanger() {
  if (
    calcState.firstNumber.length +
      calcState.secondNumber.length +
      calcState.result.length >
    11
  ) {
    calculatorViewWrapper.classList.add('large-font');
  }
  if (
    calcState.firstNumber.length +
      calcState.secondNumber.length +
      calcState.result.length >
    19
  ) {
    calculatorViewWrapper.classList.add('medium-font');
    calculatorViewWrapper.classList.remove('large-font');
  }
  if (
    calcState.firstNumber.length +
      calcState.secondNumber.length +
      calcState.result.length >
    26
  ) {
    calculatorViewWrapper.classList.add('small-font');
    calculatorViewWrapper.classList.remove('medium-font');
  }
}
