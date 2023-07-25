const table = container.querySelector(".table");
const list = container.querySelectorAll(".list");

window.onload = () => {
  outputDataDisplay();
};


async function getData() {
  try {
    const response = await fetch(`${url}/noviti`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const { repayment_details } = await response.json();
    return repayment_details;
  } catch (error) {
    console.error(error);
  }
}


function renderHtmlTemplate(detailsArray) {
  let totaly = { principal: 0, interest: 0, monthly: 0 };
  const dynamicRows = detailsArray
      .map(({ month, remaining, principal, interest, monthly }) => {
        totaly.monthly += monthly;
        totaly.interest += interest;
        totaly.principal += principal;
        return `
        <tr>
          <td>${month}</td>
          <td>${remaining}</td>
          <td>${principal}</td>
          <td>${interest}</td>
          <td>${monthly}</td>
        </tr>`;
      })
      .join("");

    const tfootTemplate = `
      <tfoot>
        <tr>
          <td></td>
          <td>Total:</td>
          <td>${totaly.principal.toFixed(2)} EUR</td>
          <td>${totaly.interest.toFixed(2)} EUR</td>
          <td>${totaly.monthly.toFixed(2)} EUR</td>
        </tr>
      </tfoot>`;
    table.innerHTML = `
      <thead>
        <tr>
          <td>No.</td>
          <td>Remaining credit amount</td>
          <td>Principal part</td>
          <td>Interest</td>
          <td>Total payment</td>
        </tr>
      </thead>
      <tbody>${dynamicRows}</tbody>
      ${tfootTemplate}`;
}


async function outputDataDisplay() {
  const options = await getData();
  const lastArray = options[options.length - 1];

  if (lastArray.length === 0) {
    table.innerHTML = `<p>The table is empty... Calculate the new value!</p>`;
  } else {
    renderHtmlTemplate(lastArray.details);
    displayAllCasesTotalPayment(options);
  }
}


function displayAllCasesTotalPayment(dataCases) {
  const dynamicListValue = dataCases
    .map(({ id, amount, interest, term, details }) => {
      const totalPayment = calculateTotalMonthly(details);

      return `
        <li key="${id}" title="Click to open case: ${id}">
          <h3>Case: ${id}</h3>
          <p>Amount: ${amount}</p>
          <p>Interest: ${interest}%</p>
          <p>Term: ${term} months</p>
          <p>Total payment: ${totalPayment} €</p>
        </li>
      `;
    })
    .join("");

  list.forEach((element) => {
    element.innerHTML = dynamicListValue;
    element.addEventListener("click", (e) => chooseDisplayCase(e, dataCases));
  });
}

function calculateTotalMonthly(detailsArray) {
  let totalMonthly = 0;
  for (const { monthly } of detailsArray) {
    totalMonthly += monthly;
  }
  return totalMonthly.toFixed(2);
}

function chooseDisplayCase(e, data) {
  const caseId = Number(e.target.getAttribute("key"));
  const currentCase = data.find(({ id }) => id === caseId);
  if(currentCase) renderHtmlTemplate(currentCase.details);
}
