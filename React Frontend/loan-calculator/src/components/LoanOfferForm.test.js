import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import LoanOfferForm from "./LoanOfferForm";
import { act } from "react";

jest.mock("axios");

describe("LoanOfferForm Component", () => {
  it("renders the form", async () => {
    axios.get.mockResolvedValueOnce({ data: [{ id: 1 }, { id: 2 }] });
    await act(async () => {
      render(<LoanOfferForm onSubmit={jest.fn()} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Amount")).toBeInTheDocument();
      expect(screen.getByText("Interest Rate")).toBeInTheDocument();
      expect(screen.getByText("Term")).toBeInTheDocument();
      expect(screen.getByText("Customer")).toBeInTheDocument();
    });
  });

  it("displays validation errors on empty form submission", async () => {
    await act(async () => {
      render(<LoanOfferForm onSubmit={jest.fn()} />);
    });
    await act(async () => {
      fireEvent.click(screen.getByText("Create Loan Offer"));
    });

    await waitFor(() => {
      expect(screen.getByText("Amount must not be empty")).toBeInTheDocument();
      expect(
        screen.getByText("Interest rate must not be empty")
      ).toBeInTheDocument();
      expect(screen.getByText("Term must not be empty")).toBeInTheDocument();
      expect(screen.getByText("Please select a customer")).toBeInTheDocument();
    });
  });

  it("submits the form successfully", async () => {
    const mockOnSubmit = jest.fn();
    const mockCustomerData = [
      {
        id: 1,
        name: "John Doe",
        email: "john@doe.com",
        city: "New York",
        zip_code: "10001",
        created_at: "2021-01-01T00:00:00Z",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@smith.com",
        city: "Boston",
        zip_code: "02108",
        created_at: "2021-01-01T00:00:00Z",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockCustomerData });

    render(<LoanOfferForm onSubmit={mockOnSubmit} />);

    await act(async () => {
      fireEvent.change(
        screen.getByPlaceholderText("Enter loan amount in euros"),
        { target: { value: "1000" } }
      );
      fireEvent.change(
        screen.getByPlaceholderText("Enter interest rate in %"),
        { target: { value: "5" } }
      );
      fireEvent.change(screen.getByPlaceholderText("Enter term in months"), {
        target: { value: "12" },
      });
      fireEvent.change(screen.getByLabelText("customer"), {
        target: { value: "1" },
      });

      fireEvent.click(screen.getByText("Create Loan Offer"));
    });

    await waitFor(() =>
      expect(mockOnSubmit).toHaveBeenCalledWith({
        amount: "1000",
        interest_rate: "5",
        term: "12",
        customer: "1",
      })
    );
  });
});
