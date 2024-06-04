import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "./App.js";
import { act } from "react";

jest.mock("axios");

describe("App Component", () => {
  it("renders Loan Calculator heading", () => {
    act(() => {
      render(<App />);
    });
    expect(screen.getByText("Loan Calculator")).toBeInTheDocument();
  });

  it("creates a loan offer and displays it", async () => {
    axios.post.mockResolvedValueOnce({
      data: { id: 1 },
    });

    axios.get.mockResolvedValueOnce({
      data: {
        amount: 1000,
        interest_rate: 5,
        term: 12,
        monthly_payment: 85.61,
        customer: 1,
      },
    });

    render(<App />);

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
      fireEvent.change(screen.getByLabelText("Customer"), {
        target: { value: "1" },
      });

      fireEvent.click(screen.getByText("Create Loan Offer"));
    });

    await waitFor(() =>
      expect(
        screen.getByText("Loan Offer created successfully")
      ).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(screen.getByText("Monthly Payment: 85.61")).toBeInTheDocument()
    );
  });

  it("displays error message on loan offer creation failure", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { non_field_errors: ["Error creating loan offer"] } },
    });

    render(<App />);

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
      fireEvent.change(screen.getByLabelText("Customer"), {
        target: { value: "1" },
      });

      fireEvent.click(screen.getByText("Create Loan Offer"));
    });

    await waitFor(() =>
      expect(
        screen.getByText(
          (_, element) => element.textContent === "Error creating loan offer"
        )
      ).toBeInTheDocument()
    );
  });
});
