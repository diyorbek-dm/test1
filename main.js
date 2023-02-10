// Global variabels - DOM
const btn = document.querySelectorAll('.btn')
const remove = document.querySelector('.remove')
const task = document.querySelector('.task')
const result = document.querySelector('.result')
const output = document.querySelector('.output')
const error = document.querySelector('.error')

// Connecting theme changer
document.querySelector('.darkMode').addEventListener('click', event => {
  // All buttons
  btn.forEach(elem => {
    elem.classList.toggle('btn-light')
  })

  // Body
  document.body.classList.toggle('body-light')

  // Output
  output.classList.toggle('output-light')

  // Result 
  document.querySelector('.result').classList.toggle('result-light')
})

// Variables
let a = ''
let b = ''
let sign = ''
let stop = false

// Listener for all buttons
document.querySelector('.buttons').addEventListener('click', event => {

  // Cheking for empty && button
  if (!event.target.classList.contains('btn')) return

  // Connecting target listener
  const value = event.target.textContent

  // numbers || operators
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
  const operators = ['+', '-', '*', '/', '%']

  // Checking number values
  if (numbers.includes(value)) {
    if (b === '' && sign === '') {
      a += value
      console.log('A ' + a)
      result.textContent = a
    } else if (a !== '' && b !== '' && stop) {
      b = value
      stop = false
      result.textContent = b
    } else {
      b += value
      console.log('B ' + b)
      result.textContent = b
    }
    return
  }

  // Checking operator values
  if (operators.includes(value)) {
    sign = value
    console.log('sign ' + sign)
    result.textContent = sign
    return
  }

  // Math operators
  if (value === '=') {
    task.textContent = `${a} ${sign} ${b}`
    if (b === '') b = a

    switch (sign) {
      case '+':
        a = (+a) + (+b)
        break;
      case '-':
        a = (+a) - (+b)
        break;
      case '*':
        a = (+a) * (+b)
        break;
      case '/':
        if (b === '0' || a === '0') {
          output.classList.add('output-error')
          error.classList.add('error-active')

          result.textContent = '0'
          a = ''
          b = ''
          sign = ''
          return
        }
        a = (+a) / (+b)
        break;
      case '%':
        if (b === '0' || a === '0') {
          result.textContent = '0'
          a = ''
          b = ''
          sign = ''
          return
        }
        a = (+a) % (+b)
        break;
    }

    stop = true
    result.textContent = a
  }

  // AC | Clear All
  if (value === 'AC') {
    a = ''
    b = ''
    stop = false
    result.textContent = 0
    output.classList.remove('output-error')
    error.classList.remove('error-active')
    task.textContent = `${a = ''} ${sign = ''} ${b = ''}`
  }
})
