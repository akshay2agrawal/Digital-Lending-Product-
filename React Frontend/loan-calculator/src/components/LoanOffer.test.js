import React from "react";
import { render } from "@testing-library/react";
import LoanOffer from "./LoanOffer";
import { act } from "react";

describe("LoanOffer Component", () => {
  it("renders loan offer details", () => {
    const loanOffer = {
      amount: 1000,
      interestRate: 5,
      term: 12,
      monthlyPayment: 85.61,
      customer: 1,
    };

    let getByText;
    act(() => {
      ({ getByText } = render(<LoanOffer {...loanOffer} />));
    });

    expect(getByText("Customer ID: 1")).toBeInTheDocument();
    expect(getByText("Amount: 1000 euros")).toBeInTheDocument();
    expect(getByText("Interest Rate: 5%")).toBeInTheDocument();
    expect(getByText("Term: 12 months")).toBeInTheDocument();
    expect(getByText("Monthly Payment: 85.61")).toBeInTheDocument();
  });
});
