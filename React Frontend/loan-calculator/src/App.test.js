import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "./App";

const mock = new MockAdapter(axios);

describe("<App />", () => {
  const loanOffer = {
    id: 1,
    amount: 1000,
    interest_rate: 5,
    term: 12,
    monthly_payment: 85.61,
    customer: 1,
  };

  beforeEach(() => {
    mock.reset();
    mock
      .onGet("http://localhost:8000/customers/")
      .reply(200, [{ id: 1 }, { id: 2 }]);
    mock.onPost("http://localhost:8000/loanoffers/").reply(201, { id: 1 });
    mock.onGet("http://localhost:8000/loanoffers/1/").reply(200, loanOffer);
  });

  test("creates and displays loan offer", async () => {
    render(<App />);

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
      expect(
        screen.getByText("Loan Offer created successfully")
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Customer ID: 1/)).toBeInTheDocument();
      expect(screen.getByText(/Amount: 1000 euros/)).toBeInTheDocument();
      expect(screen.getByText(/Interest Rate: 5%/)).toBeInTheDocument();
      expect(screen.getByText(/Term: 12 months/)).toBeInTheDocument();
      expect(screen.getByText(/Monthly Payment: 85.61/)).toBeInTheDocument();
    });
  });

  test("handles fetch loan offer error", async () => {
    mock.onGet("http://localhost:8000/loanoffers/1/").reply(500);

    render(<App />);

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
      expect(
        screen.getByText("Loan Offer created successfully")
      ).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Error fetching loan offer")).toBeInTheDocument();
    });
  });
});
