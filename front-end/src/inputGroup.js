const ERROR_CLASS = 'error'
const AMOUNT_ERROR_ID = 'amount-error'
const INPUT_GROUP_CLASS = 'input-group'

const getInputGroup = () =>
  document.getElementsByClassName(INPUT_GROUP_CLASS)[0]

const setAmountErrorText = (text) => {
  const amountError = document.getElementById(AMOUNT_ERROR_ID)
  amountError.textContent = text
}

const addInputGroupClass = (classname) => {
  const inputGroup = getInputGroup()
  inputGroup.classList.add(classname)
}

const removeInputGroupClass = (classname) => {
  const inputGroup = getInputGroup()
  inputGroup.classList.remove(classname)
}

export const showInputGroupError = ({ message }) => {
  setAmountErrorText(message)
  addInputGroupClass(ERROR_CLASS)
}

export const hideInputGroupError = () => {
  setAmountErrorText('')
  removeInputGroupClass(ERROR_CLASS)
}
