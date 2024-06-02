import React from "react";
import "../App.css";

const LoanOffer = ({
  amount,
  interestRate,
  term,
  monthlyPayment,
  customer,
}) => {
  return (
    <div className="loan-offer">
      <h3>Loan Offer</h3>
      <p>Customer ID: {customer} </p>
      <p>Amount: {amount} euros</p>
      <p>Interest Rate: {interestRate}%</p>
      <p>Term: {term} months</p>
      <p style={{ fontWeight: "bold" }}>Monthly Payment: {monthlyPayment}</p>
    </div>
  );
};

export default LoanOffer;
