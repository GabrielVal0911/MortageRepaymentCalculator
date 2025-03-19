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

function formatNumber(num) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
}

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputMortgageAmount.value.replace(/[.,]/g, ""));
  const term = Number(inputMortgageTerm.value) * 12;
  const interestRate = Number(inputInterestRate.value) / 100 / 12;

  const paymentMonthly =
    (amount * (interestRate * (1 + interestRate) ** term)) /
    ((1 + interestRate) ** term - 1);

  const totalRepayment = paymentMonthly * term;

  const monthlyPaymentInterestOnly = amount * interestRate;
  const totalPaymentInterestOnly = monthlyPaymentInterestOnly * term + amount;

  if (inputRepayment.checked) {
    console.log(formatNumber(paymentMonthly));
    console.log(`monthly payment: ${paymentMonthly}`);
    console.log(`total repayment: ${totalRepayment}`);
  } else if (inputInterestOnly.checked) {
    console.log(`monthly interest only: ${monthlyPaymentInterestOnly}`);
    console.log(`total interest: ${totalPaymentInterestOnly}`);
  }
});
