import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import LoanOfferForm from "./LoanOfferForm";

const mock = new MockAdapter(axios);

describe("<LoanOfferForm />", () => {
  const customers = [{ id: 1 }, { id: 2 }];
  const onSubmit = jest.fn();

  beforeEach(() => {
    mock.reset();
    mock.onGet("http://localhost:8000/customers/").reply(200, customers);
  });

  test("fetches and displays customers", async () => {
    render(<LoanOfferForm onSubmit={onSubmit} />);
    await waitFor(() => {
      expect(screen.getByText("Select a customer ID")).toBeInTheDocument();
    });
    customers.forEach((customer) => {
      expect(screen.getByText(customer.id)).toBeInTheDocument();
    });
  });

  test("displays validation errors", async () => {
    render(<LoanOfferForm onSubmit={onSubmit} />);
    fireEvent.click(screen.getByText("Create Loan Offer"));

    expect(await screen.findAllByText(/must not be empty/i)).toHaveLength(4);
  });

  test("submits the form with correct data", async () => {
    render(<LoanOfferForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/Amount/i), {
      target: { value: "1000" },
    });
    fireEvent.change(screen.getByLabelText(/Interest Rate/i), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByLabelText(/Term/i), {
      target: { value: "12" },
    });
    fireEvent.change(screen.getByLabelText(/Customer/i), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByText("Create Loan Offer"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        amount: "1000",
        interest_rate: "5",
        term: "12",
        customer: "1",
      });
    });
  });
});
