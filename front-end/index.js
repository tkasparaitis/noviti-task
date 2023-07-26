import { showInputGroupError, hideInputGroupError } from './src/inputGroup.js'
import bindFormValidation from './src/validation.js'

const FORM_ID = 'amount-form'

const form = document.getElementById(FORM_ID)

bindFormValidation({
  form,
  onValid: hideInputGroupError,
  onInvalid: showInputGroupError,
})
