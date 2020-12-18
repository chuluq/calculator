// Listen event when key is pressed
const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');

keys.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    // determine type of key is clicked
    const key = e.target;
    const action = key.dataset.action;

    if (!action) {
      console.log('number is clicked!');
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      console.log('operator key!');
    }

    if (action === 'decimal') {
      console.log('decimal key!');
    }

    if (action === 'clear') {
      console.log('clear key!');
    }

    if (action === 'calculate') {
      console.log('equal key!');
    }
  }
});

// show number in display
const display = document.querySelector('.calculator__display');

keys.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    // if calculator shows 0
    // replace display with textContent of clicked key
    if (!action) {
      if (displayedNum === '0') {
        display.textContent = keyContent;
      } else {
        // if non-zero number append it
        display.textContent = displayedNum + keyContent;
      }
    }
  }
});
