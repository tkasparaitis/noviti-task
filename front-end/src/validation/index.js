const LOWEST_VALUE = 5000
const HIGHEST_VALUE = 50000
const RANGE_VALIDATION_MESSAGE = `Value must be between ${LOWEST_VALUE} and ${HIGHEST_VALUE}`

const isAmountFieldValid = (e) => {
  e.preventDefault()
  const amountInputValue = e.target.getElementsByTagName('input')[0].value

  return amountInputValue >= LOWEST_VALUE && amountInputValue <= HIGHEST_VALUE
}

export default ({ form, onValid, onInvalid }) => {
  form.addEventListener('submit', (e) => {
    const isFormValid = isAmountFieldValid(e)

    isFormValid ? onValid() : onInvalid({ message: RANGE_VALIDATION_MESSAGE })
  })
}
