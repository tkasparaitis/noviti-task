export const getRepaymentSchedule = async (totalAmount) => {
  const response = await fetch(
    `http://127.0.0.1:8080/api/noviti?totalAmount=${totalAmount}`
  )

  if (response.ok) {
    return response.json()
  }
}
