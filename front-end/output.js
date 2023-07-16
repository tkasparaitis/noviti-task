const tableBody = document.querySelector(".table-body");
const tableBodyTotalRow = tableBody.querySelector(".table-body__total-row");
const url = "http://127.0.0.1:8080/api";
window.url = url;

async function fetchData(currentApiPathInString) {
  try {
    const response = await fetch(`${url}/${currentApiPathInString}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const options = [
  {
    month: 1,
    amount: 10052.27,
    part: 1947.73,
    interest: 127.0,
    total: 2074.73,
  },
  {
    month: 2,
    amount: 10052.27,
    part: 1947.73,
    interest: 127.0,
    total: 2074.73,
  },
  {
    month: 3,
    amount: 10052.27,
    part: 1947.73,
    interest: 127.0,
    total: 2074.73,
  },
  {
    month: 4,
    amount: 10052.27,
    part: 1947.73,
    interest: 127.0,
    total: 2074.73,
  },
  {
    month: 5,
    amount: 10052.27,
    part: 1947.73,
    interest: 127.0,
    total: 2074.73,
  },
  {
    month: 6,
    amount: 10052.27,
    part: 1947.73,
    interest: 127.0,
    total: 2074.73,
  },
];

async function tableDataDisplay() {
  const data = await fetchData('noviti');
  let totaly = { part: 0, interest: 0, total: 0 };

  options?.forEach(({ month, amount, part, interest, total }) => {
    tableBodyTotalRow.insertAdjacentHTML(
      "beforebegin",
      `<tr><td>${month}</td>
    <td>${amount}</td>
    <td>${part}</td>
    <td>${interest}</td>
    <td>${total}</td></tr>`
    );

    totaly.part += part;
    totaly.interest += interest;
    totaly.total += total;
  });

  tableDataTotalDisplay(totaly);
}



function tableDataTotalDisplay(data) {
  const { part, interest, total } = data;
    const totalRow = tableBodyTotalRow.children;
   
    // "Principal part".
    totalRow[2].textContent = `${part} eur`;
    // "Interest".
    totalRow[3].textContent = `${interest} eur`;
    // "Total payment".
    totalRow[4].textContent = `${total} eur`;
}

tableDataDisplay();
