// Listen event when key is pressed
const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');

// show number in display
keys.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    // determine type of key is clicked
    // using data-action
    const key = e.target;
    const action = key.dataset.action;
    const previousKeyType = calculator.dataset.previousKeyType;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    // no action means no data-set
    // number key
    if (!action) {
      // hits number key after an operator key
      Array.from(key.parentNode.children).forEach((k) =>
        k.classList.remove('is-depressed')
      );

      // if calculator shows 0
      // replace display with textContent of clicked key
      // update display after click operator key
      if (displayedNum === '0' || previousKeyType === 'operator') {
        display.textContent = keyContent;
      } else {
        // if non-zero number append it
        display.textContent = displayedNum + keyContent;
      }

      // update data-previous-key-type
      calculator.dataset.previousKeyType = 'number';
    }

    // decimal key
    if (action === 'decimal') {
      // do nothing if string has a dot
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.';
      } else if (previousKeyType === 'operator') {
        display.textContent = '0.';
      }

      calculator.dataset.previousKeyType = 'decimal';
    }

    // higlight operator key when click
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      // only check firstValue since secondValue always exists
      if (firstValue && operator && previousKeyType !== 'operator') {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;

        // Update calculated value as firstValue
        calculator.dataset.firstValue = calcValue;
      } else {
        // If there are no calculations, set displayedNum as the firstValue
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add('is-depressed');
      // Add custom attribute
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.operator = action;
    }

    // calculate number
    if (action === 'calculate') {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      display.textContent = calculate(firstValue, operator, secondValue);

      calculator.dataset.previousKeyType = 'operator';
    }

    // clear
    if (action == -'clear') {
      // ...
      calculator.dataset.previousKeyType = 'clear';
    }
  }
});

const calculate = (n1, operator, n2) => {
  let result = '';

  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
};
