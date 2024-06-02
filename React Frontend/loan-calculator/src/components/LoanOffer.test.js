import React from "react";
import { render, screen } from "@testing-library/react";
import LoanOffer from "./LoanOffer";

describe("LoanOffer", () => {
  test("renders loan offer details correctly", () => {
    const loanOfferProps = {
      amount: 10000,
      interestRate: 5,
      term: 24,
      monthlyPayment: 450.57,
      customer: 1,
    };

    render(<LoanOffer {...loanOfferProps} />);

    const amountDisplay = screen.getByText(/10000 euros/i);
    const interestRateDisplay = screen.getByText(/5%/i);
    const termDisplay = screen.getByText(/24 months/i);
    const monthlyPaymentDisplay = screen.getByText(/450.57/i);
    const customerDisplay = screen.getByText(/Customer ID: 1/i);

    expect(amountDisplay).toBeInTheDocument();
    expect(interestRateDisplay).toBeInTheDocument();
    expect(termDisplay).toBeInTheDocument();
    expect(monthlyPaymentDisplay).toBeInTheDocument();
    expect(customerDisplay).toBeInTheDocument();
  });
});
