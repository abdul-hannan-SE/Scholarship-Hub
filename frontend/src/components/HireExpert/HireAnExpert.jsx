import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import "./HireAnExpert.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AuthContext } from "../hook/HuzAuthProvider";

const HireAnExpert = () => {
    const [expert, setExpert] = useState({});
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const stripe = useStripe();
    const element = useElements();

    const { expertId } = useParams();

    const ctx = useContext(AuthContext);

    useEffect(() => {
        const getExpertDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/user/get-expert/${expertId}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const responseData = await response.json();

                if (response.status === 400 || response.status === 500 || response.status === 422) {
                    throw new Error(responseData.message);
                }

                setExpert(responseData.expert);

            } catch (error) {
                setError(error.message);
            }
        }

        getExpertDetails();

    }, [expertId]);

    const handleConfirmHireExpert = async () => {
        try {
            const paymentMethod = await stripe.createPaymentMethod({
                type: "card",
                card: element?.getElement(CardElement)
            });

            const pmId = paymentMethod?.paymentMethod.id;

            const response = await fetch(`http://localhost:8080/user/hireExpert`, {
                method: "POST",
                body: JSON.stringify({
                    expertId: expert._id,
                    paymentMethodId: pmId
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ctx?.user?.token}`
                }
            });

            const responseData = await response.json();

            if (response.status === 400 || response.status === 500 || response.status === 422 || response.status === 401) {
                throw new Error(responseData.message);
            }

            setSuccessMsg(responseData.message);
            setError("");

        } catch (error) {
            setError(error.message);
            setSuccessMsg("");
        }
    }

    return (
        <div className="expert-profile">
            <h2>Expert Profile</h2>
            <div className="profile-details">
                <div>
                    <strong>Username:</strong> {expert.username}
                </div>
                <div>
                    <strong>Email:</strong> {expert.email}
                </div>
                <div>
                    <strong>Role:</strong> {expert.role}
                </div>
            </div>

            <div className="payment-section">
                <h4>Payment Amount: 10$</h4>
                <div style={{ margin: "20px" }}>
                    <CardElement />
                </div>
            </div>

            <button className="btn" onClick={handleConfirmHireExpert}>Confirm Hiring</button>

            {error !== "" ? <h4 style={{ color: "red" }}>{error}</h4> : null}
            {successMsg !== "" ? <h4 style={{ color: "green" }}>{successMsg}</h4> : null}
        </div>
    );
};

export default HireAnExpert;
