import axios from "axios";
import React, { useEffect, useState } from "react";
import LoanOfferForm from "./components/LoanOfferForm.jsx";
import LoanOffer from "./components/LoanOffer.jsx";
import "./App.css";

const App = () => {
  const [loanOffer, setLoanOffer] = useState(null);
  const [loanOfferId, setLoanOfferId] = useState(null);
  const [message, setMessage] = useState([]);

  const createLoanOffer = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/loanoffers/",
        formData
      );
      setLoanOfferId(response.data.id);
      setMessage("Loan Offer created successfully");
    } catch (error) {
      console.log(
        "Error creating loan offer:",
        Object.values(error.response.data)[0]
      );
      // setMessage("Error creating loan offer");
      setMessage(Object.values(error.response.data)[0]);

      console.log("Error creating loan offer:", error.response.data);
    }
  };

  useEffect(() => {
    const fetchLoanOffer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/loanoffers/${loanOfferId}/`
        );
        setLoanOffer(response.data);
      } catch (error) {
        console.error("Error fetching loan offer:", error);
        setMessage("Error fetching loan offer");
      }
    };

    if (loanOfferId) {
      fetchLoanOffer();
    }
  }, [loanOfferId]);

  return (
    <div className="container">
      <h1>Loan Calculator</h1>
      {message && <p className="message">{message}</p>}
      <LoanOfferForm onSubmit={createLoanOffer} />
      {loanOffer && (
        <div className="loan-offer">
          <LoanOffer
            amount={loanOffer.amount}
            interestRate={loanOffer.interest_rate}
            term={loanOffer.term}
            monthlyPayment={loanOffer.monthly_payment}
            customer={loanOffer.customer}
          />
        </div>
      )}
    </div>
  );
};

export default App;
