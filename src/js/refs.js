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

export default getRefs;
