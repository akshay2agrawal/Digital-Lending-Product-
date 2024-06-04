import React, { useState, useEffect } from "react";
import axios from "axios";
import "../LoanOfferForm.css";

const LoanOfferForm = ({ onSubmit }) => {
  const [availableCustomers, setAvailableCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    amount: "",
    interest_rate: "",
    term: "",
    customer: "",
  });

  const handleCustomerIdChange = (event) => {
    setCustomerId(event.target.value);
    setFormData({ ...formData, customer: event.target.value });
  };

  // useEffect(() => {
  //   const fetchAvailableCustomers = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8000/customers/");
  //       setAvailableCustomers(response.data);
  //     } catch (error) {
  //       if (error.response && error.response.data) {
  //         console.error(
  //           "Error fetching available customer data:",
  //           error.response.data
  //         );
  //       } else {
  //         console.error("Error fetching available customer data:", error);
  //       }
  //     }
  //   };
  //   fetchAvailableCustomers();
  // }, []);

  useEffect(() => {
    const fetchAvailableCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/customers/");
        setAvailableCustomers(response.data);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(
            "Error fetching available customer data:",
            error.response.data
          );
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from server:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
      }
    };
    fetchAvailableCustomers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
      setFormData({
        amount: "",
        interest_rate: "",
        term: "",
        customer: "",
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate amount
    if (!formData.amount) {
      errors.amount = "Amount must not be empty";
    }

    // Validate interest rate
    if (!formData.interest_rate) {
      errors.interest_rate = "Interest rate must not be empty";
    }

    // Validate term
    if (!formData.term) {
      errors.term = "Term must not be empty";
    }

    // Validate customer
    if (!formData.customer) {
      errors.customer = "Please select a customer";
    }

    return errors;
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter loan amount in euros"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        {errors.amount && <div style={{ color: "red" }}>{errors.amount}</div>}
        <div>
          <label htmlFor="interest_rate">Interest Rate</label>
          <input
            type="number"
            id="interest_rate"
            name="interest_rate"
            placeholder="Enter interest rate in %"
            value={formData.interest_rate}
            onChange={handleChange}
          />
        </div>
        {errors.interest_rate && (
          <div style={{ color: "red" }}>{errors.interest_rate}</div>
        )}
        <div>
          <label htmlFor="term">Term</label>
          <input
            type="number"
            id="term"
            name="term"
            placeholder="Enter term in months"
            value={formData.term}
            onChange={handleChange}
          />
        </div>
        {errors.term && <div style={{ color: "red" }}>{errors.term}</div>}
        <div>
          <label htmlFor="customer">Customer</label>
          <select
            id="customer"
            value={customerId}
            onChange={handleCustomerIdChange}
            htmlFor="customer"
          >
            <option value="">Select a customer ID</option>
            {availableCustomers &&
              availableCustomers.map &&
              availableCustomers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.id}
                </option>
              ))}
          </select>
        </div>
        {errors.customer && (
          <div style={{ color: "red" }}>{errors.customer}</div>
        )}
        <button type="submit">Create Loan Offer</button>
      </div>
    </form>
  );
};

export default LoanOfferForm;
