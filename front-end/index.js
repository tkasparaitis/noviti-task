import { showFormError, hideFormError } from './src/repaymentForm/index.js'
import bindFormValidation from './src/validation/index.js'
import {
  rerenderTable,
  showTable,
  hideTable,
} from './src/scheduleTable/index.js'
import { showLoader, hideLoader } from './src/loader/index.js'
import { getRepaymentSchedule } from './src/api.js'

const FORM_ID = 'amount-form'
const TABLE_ID = 'schedule-table'

const form = document.getElementById(FORM_ID)
const table = document.getElementById(TABLE_ID)

const onValid = async ({ amount }) => {
  showLoader()
  hideTable(table)
  hideFormError()
  const { schedule } = await getRepaymentSchedule(amount)
  hideLoader()
  rerenderTable(table, schedule)
  showTable(table)
}

const onInvalid = (e) => {
  showFormError(e)
  hideTable(table)
}

bindFormValidation({
  form,
  onValid,
  onInvalid,
})
