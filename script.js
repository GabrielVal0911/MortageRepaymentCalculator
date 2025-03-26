const btnClearAll = document.getElementById("btn-clear-all");
const inputMortgageAmount = document.getElementById("mortgage-amount");
const inputMortgageTerm = document.getElementById("mortgage-term");
const inputInterestRate = document.getElementById("interest-rate");
const inputRepayment = document.getElementById("input-repayment");
const inputInterestOnly = document.getElementById("input-interest-only");
const btnSubmit = document.getElementById("btn-submit");
const containerMortgageType = document.getElementById(
  "container-mortgage-type"
);
const monthlyRepaymentsAmount = document.getElementById(
  "monthly-repayments-amount"
);
const totalRepaymentsAmount = document.getElementById(
  "total-repayments-amount"
);
const containerResultEmpty = document.getElementById("container-result-empty");
const containerResultCompleted = document.getElementById(
  "container-result-completed"
);

btnClearAll.addEventListener("click", clearAll);

function clearAll() {
  inputMortgageAmount.value = "";
  inputMortgageTerm.value = "";
  inputInterestRate.value = "";
  inputRepayment.checked = false;
  inputInterestOnly.checked = false;

  displayContent(false);
}

function displayContent(state) {
  // try to refactor this later
  if (state) {
    containerResultEmpty.classList.add("hidden");
    containerResultCompleted.classList.remove("hidden");
  } else {
    containerResultEmpty.classList.remove("hidden");
    containerResultCompleted.classList.add("hidden");
  }
}

function formatNumber(num) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
}

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = parseInt(inputMortgageAmount.value.replaceAll(",", ""));
  const term = Number(inputMortgageTerm.value) * 12;
  const interestRate = Number(inputInterestRate.value) / 100 / 12;

  // const amount = Number(inputMortgageAmount.value.replace(/[.,]/g, ""));

  let isAmountValid = checkAmount(),
    isTermValid = checkTerm(),
    isInterestRateValid = checkInterestRate(),
    isCheckedMortgageType = checkMortgageType();

  let isFormValid =
    isAmountValid &&
    isTermValid &&
    isInterestRateValid &&
    isCheckedMortgageType;

  const paymentMonthly =
    (amount * (interestRate * (1 + interestRate) ** term)) /
    ((1 + interestRate) ** term - 1);

  const totalRepayment = paymentMonthly * term;

  const monthlyPaymentInterestOnly = amount * interestRate;
  const totalPaymentInterestOnly = monthlyPaymentInterestOnly * term + amount;

  if (isFormValid) {
    displayContent(true);
    if (inputRepayment.checked) {
      monthlyRepaymentsAmount.textContent = formatNumber(paymentMonthly);
      totalRepaymentsAmount.textContent = formatNumber(totalRepayment);
    } else if (inputInterestOnly.checked) {
      monthlyRepaymentsAmount.textContent = formatNumber(
        monthlyPaymentInterestOnly
      );
      totalRepaymentsAmount.textContent = formatNumber(
        totalPaymentInterestOnly
      );
    }
  }
});

const isRequired = (value) => (value === "" ? false : true);

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;

  // add the error class

  input.classList.add("error");

  // show the error message
  const span = formField.querySelector("span");
  if (span) {
    span.classList.add("error-span");
  }

  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  input.classList.remove("error");

  const span = formField.querySelector("span");
  if (span) {
    span.classList.remove("error-span");
  }

  const errorElement = formField.querySelector("small");
  const mortgageTypeElement = document.getElementById("mortgage-type");

  // hide the error message
  const error = errorElement || mortgageTypeElement;
  if (error) {
    error.textContent = "";
  }
};

const checkAmount = () => {
  let valid = false;

  if (!isRequired(inputMortgageAmount.value)) {
    showError(inputMortgageAmount, "This field is required");
  } else {
    showSuccess(inputMortgageAmount);
    valid = true;
  }
  return valid;
};

const checkTerm = () => {
  let valid = false;

  if (!isRequired(inputMortgageTerm.value)) {
    showError(inputMortgageTerm, "This field is required");
  } else {
    showSuccess(inputMortgageTerm);
    valid = true;
  }
  return valid;
};

const checkInterestRate = () => {
  let valid = false;

  if (!isRequired(inputInterestRate.value)) {
    showError(inputInterestRate, "This field is required");
  } else {
    showSuccess(inputInterestRate);
    valid = true;
  }
  return valid;
};

const checkMortgageType = () => {
  let valid = false;

  if (!inputRepayment.checked && !inputInterestOnly.checked) {
    showError(containerMortgageType, "This field is required");
  } else {
    showSuccess(containerMortgageType);
    valid = true;
  }
  return valid;
};

// Format value of input(adding comma after 3 numbers)

inputMortgageAmount.oninput = function () {
  let removeChar = this.value.replace(/[^0-9\.]/g, ""); // This is to remove alphabets and special characters.

  let removeDot = removeChar.replace(/\./g, ""); // This is to remove "DOT"
  this.value = removeDot;

  let formatedNumber = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  this.value = formatedNumber;
};
