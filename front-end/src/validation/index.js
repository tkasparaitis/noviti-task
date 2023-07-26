const LOWEST_VALUE = 5000
const HIGHEST_VALUE = 50000
const RANGE_VALIDATION_MESSAGE = `Value must be between ${LOWEST_VALUE} and ${HIGHEST_VALUE}`

const isAmountFieldValid = (e) => {
  e.preventDefault()
  const amountInputValue = e.target.getElementsByTagName('input')[0].value

  return {
    isValid:
      amountInputValue >= LOWEST_VALUE && amountInputValue <= HIGHEST_VALUE,
    amount: amountInputValue,
  }
}

export default ({ form, onValid, onInvalid }) => {
  form.addEventListener('submit', (e) => {
    const { isValid, amount } = isAmountFieldValid(e)

    isValid
      ? onValid({ amount })
      : onInvalid({ message: RANGE_VALIDATION_MESSAGE })
  })
}
