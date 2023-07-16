const inputRangeParent = document.querySelector(".loan-amount");
const inputRange = inputRangeParent.querySelector("input");
const inputText = inputRangeParent.querySelector("span");
const initialValue = inputRange.value;

function inputRangeEventHandler() {
  inputText.textContent = initialValue;

  const inputAction = (e) => {
    inputText.textContent = e.target.value;
  };

  inputRange.addEventListener("input", inputAction);

}

inputRangeEventHandler();
