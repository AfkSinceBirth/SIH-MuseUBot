import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "../Styles/PaymentForm.css";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        try {
            // Ensure amount is a number and within reasonable limits
            const parsedAmount = Math.floor(Number(amount) * 100); // Convert to cents
            if (
                isNaN(parsedAmount) ||
                parsedAmount <= 0 ||
                parsedAmount > 100000000
            ) {
                setError(
                    "Amount must be a positive number and less than $1,000,000."
                );
                return;
            }

            const {
                data: { clientSecret },
            } = await axios.post("http://localhost:5000/create-payment", {
                amount: parsedAmount, // Send the converted amount
            });

            const cardElement = elements.getElement(CardElement);
            const { paymentIntent, error } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            name: "Customer Name", // Replace with actual customer details if needed
                        },
                    },
                }
            );

            if (error) {
                setError(`Payment failed: ${error.message}`);
                setSuccess(null);
            } else {
                if (paymentIntent.status === "succeeded") {
                    setSuccess("Payment successful!");
                    setError(null);
                }
            }
        } catch (error) {
            setError(
                `Error: ${
                    error.response ? error.response.data.error : error.message
                }`
            );
            setSuccess(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount in USD"
                required
            />
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
        </form>
    );
};

export default PaymentForm;
