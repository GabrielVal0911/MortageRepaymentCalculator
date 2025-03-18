const btnClearAll = document.getElementById("btn-clear-all");
const inputMortgageAmount = document.getElementById("mortgage-amount");
const inputMortgageTerm = document.getElementById("mortgage-term");
const inputInterestRate = document.getElementById("interest-rate");
const inputRepayment = document.getElementById("input-repayment");
const inputInterestOnly = document.getElementById("input-interest-only");
const btnSubmit = document.getElementById("btn-submit");

btnClearAll.addEventListener("click", clearAll);

function clearAll() {
  inputMortgageAmount.value = "";
  inputMortgageTerm.value = "";
  inputInterestRate.value = "";
  inputRepayment.checked = false;
  inputInterestOnly.checked = false;
}

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputMortgageAmount.value);
  const term = Number(inputMortgageTerm.value) * 12;
  const interestRate = Number(inputInterestRate.value) / 100 / 12;

  //   console.log(
  //     (amount * interestRate * (1 + interestRate) ** term) /
  //       (1 + interestRate) ** term -
  //       1
  //   );
});
