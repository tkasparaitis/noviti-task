const url = "http://127.0.0.1:8080/api";
const container = document.querySelector(".container");
const form = container.querySelector(".form");
const button = form.querySelector(".button");
const amountInput = form.querySelector('[name="amount"]');
const interestInput = form.querySelector('[name="interest"]');
const monthInput = form.querySelector('[name="month"]');
const repaymentSelect = form.querySelector('[name="repayment"]');
const amountInputDisplay = form.querySelector(".loan-amount").children[2];
const amountInputInitalValue = amountInput.value;
const setContent = (content) => (amountInputDisplay.textContent = content);

async function postData(dataToSend) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  };

  try {
    button.textContent = "Submitting...";
    const response = await fetch(`${url}/post`, requestOptions);
    if (!response.ok) {
      button.textContent = "Ups! Error...";
      throw new Error("Network response was not ok");
    }
    button.textContent = "Successfully!";
    const data = await response.json();
    outputDataDisplay();
  } catch (error) {
    button.textContent = "Ups! Error...";
    console.error(error);
  }
}

function inputformSubmit() {
  amountInputDisplay.textContent = amountInputInitalValue;
  setContent(amountInputInitalValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({
      month: monthInput.value,
      amount: amountInput.value,
      interest: interestInput.value,
      repayment: repaymentSelect.value,
    });
    form.reset();
    setContent(amountInputInitalValue);
    setButtonTextUpdate();
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  form.addEventListener("submit", handleSubmit);
  amountInput.addEventListener("input", handleChange);
}

function setButtonTextUpdate() {
  let timer;
  clearTimeout(timer);
  timer = setTimeout(() => {
    button.textContent = "Calculate";
  }, 3000);
}

inputformSubmit();
