const form = document.querySelector(".form");
const button = form.querySelector(".button");
window.form = form;

async function postData(options) {
  button.textContent = "Submiting...";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      button.textContent = "Error, try again...";
      throw new Error("Request failed");
    }

    const responseData = await response.json();
    console.log("Response:", responseData);
    button.textContent = "Successfully!";
  } catch (error) {
    console.error("Error:", error, options);
    button.textContent = "Error, try again...";
  }
}

function formDatainput() {
  const onFormSubmit = (e) => {
    e.preventDefault();
    postData({
      month: form.elements[2].value,
      amount: form.elements[0].value,
      interest: form.elements[1].value,
      type: form.elements[3].value,
    });

    form.reset();
  };

  form.addEventListener("submit", onFormSubmit);
}

formDatainput();
