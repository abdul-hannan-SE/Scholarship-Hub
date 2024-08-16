import { useNavigate } from "react-router-dom";
import { AuthContext } from "../hook/HuzAuthProvider";
import { useState, useContext } from "react";
import "./Eligibility.css";

const Eligibility = () => {
  const [category, setCategory] = useState("national");
  const [hasAdmissionLetter, setHasAdmissionLetter] = useState("false");
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAdmissionLetter = (e) => {
    setHasAdmissionLetter(e.target.value);
  };

  const handleCheckEligibility = async (e) => {
    e.preventDefault();

    try {
      if (!ctx?.user) {
        throw new Error("You are not logged in");
      }

      const response = await fetch(
        "http://localhost:8080/eligibilityChecher/checkEligibility",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ctx?.user?.token}`,
          },
          body: JSON.stringify({
            category: category,
            hasAdmissionLetter: hasAdmissionLetter,
          }),
        }
      );

      const responseData = await response.json();

      if (
        response.status === 400 ||
        response.status === 500 ||
        response.status === 401 ||
        response.status === 422
      ) {
        throw new Error(responseData.message);
      }

      navigate("/eligibility/results", {
        state: {
          allPrograms: responseData.allPrograms.programs,
          partialMatches: responseData.partialyMatchingPrograms.programs,
          fullMatches: responseData.matchedPrograms.programs,
          error: "",
        },
      });
    } catch (error) {
      navigate("/eligibility/results", {
        state: {
          allPrograms: [],
          partialMatches: [],
          fullMatches: [],
          error: error.message,
        },
      });
    }
  };

  return (
    <div className="program-selector">
      <div className="before-results">
        <h4>Category</h4>
        <select onChange={handleCategoryChange} value={category}>
          <option value="national">National</option>
          <option value="international">International</option>
        </select>
        <h4>Do you have any admission letter?</h4>
        <select onChange={handleAdmissionLetter} value={hasAdmissionLetter}>
          <option value="false">False</option>
          {category === "international" ? (
            <option value="true">True</option>
          ) : null}
        </select>
        <button onClick={handleCheckEligibility}>
          Check your eligibility!
        </button>
      </div>
    </div>
  );
};

export default Eligibility;
