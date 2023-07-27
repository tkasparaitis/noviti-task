const VISIBLE_CLASS = 'visible'

const getRows = (data) =>
  data.map(({ remaining, principal, interest, total }, index) => {
    const tr = document.createElement('tr')

    const id = document.createElement('td')
    id.appendChild(document.createTextNode(index + 1))

    const remainingAmount = document.createElement('td')
    remainingAmount.appendChild(document.createTextNode(remaining))

    const principalPart = document.createElement('td')
    principalPart.appendChild(document.createTextNode(principal))

    const interestRate = document.createElement('td')
    interestRate.appendChild(document.createTextNode(interest))

    const totalPayment = document.createElement('td')
    totalPayment.appendChild(document.createTextNode(total))

    tr.appendChild(id)
    tr.appendChild(remainingAmount)
    tr.appendChild(principalPart)
    tr.appendChild(interestRate)
    tr.appendChild(totalPayment)

    return tr
  })

export const rerenderTable = (table, data) => {
  const newRows = getRows(data)

  table.removeChild(table.getElementsByTagName('tbody')[0])
  const tbody = document.createElement('tbody')
  newRows.forEach((row) => tbody.appendChild(row))
  table.appendChild(tbody)
}

export const showTable = (table) => table.classList.add(VISIBLE_CLASS)

export const hideTable = (table) => table.classList.remove(VISIBLE_CLASS)
