import { showFormError, hideFormError } from './src/repaymentForm/index.js'
import bindFormValidation from './src/validation/index.js'
import {
  rerenderTable,
  showTable,
  hideTable,
} from './src/scheduleTable/index.js'
import { getRepaymentSchedule } from './src/api.js'

const data = [
  { remaining: 10052.27, principal: 1947.73, interest: 127.0, total: 2074.73 },
  { remaining: 8083.93, principal: 1968.34, interest: 106.39, total: 2074.73 },
  { remaining: 6094.75, principal: 1989.18, interest: 85.55, total: 2074.73 },
  { remaining: 4084.52, principal: 2010.23, interest: 64.5, total: 2074.73 },
  { remaining: 2053.02, principal: 2031.5, interest: 43.23, total: 2074.73 },
  { remaining: 0.0, principal: 2053.02, interest: 21.73, total: 2074.73 },
]

const FORM_ID = 'amount-form'
const TABLE_ID = 'schedule-table'

const form = document.getElementById(FORM_ID)
const table = document.getElementById(TABLE_ID)

const onValid = async ({ amount }) => {
  const { schedule } = await getRepaymentSchedule(amount)
  hideFormError()
  showTable(table)
  rerenderTable(table, schedule)
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
