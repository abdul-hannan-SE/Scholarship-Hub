import React, { useContext, useState } from "react";
import "./Form.css";
import { AuthContext } from "../../hook/HuzAuthProvider";

const Option1Form = () => {
  const ctx = useContext(AuthContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSubForm1, setShowSubForm1] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    minQualification: "CollegeStudentProgram",
    category: "national",
    targetedRegions: "Pakistan, Punjab, Ajk, Kpk, Gilgit, Blochistan, Fata",
    lastDateToApply: null,
    maxAge: null,
    maxIncomeLimit: 50000,
    description: null,
    title: null,
    durationOfProgram: null,
    amountOfScholarship: null,
    minSSCPrcntg: 0,
    FAQs: "",
    termsAndConditions: "",
    EligibilityCriteria: "",
  });
  const [programImg, setProgramImage] = useState(null);
  const handleShowSubForm1 = () => {
    setShowSubForm1(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "file") {
      // For file input, update separate state
      setProgramImage(e.target.files[0]);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Send form data to backend
    const apiData = new FormData();
    // Append each form field to FormData object
    for (const key in formData) {
      apiData.append(key, formData[key]);
    }
    if (programImg) {
      apiData.append("programImg", programImg);
    }
    const url = "http://localhost:8080/admin/program";
    fetch(url, {
      method: "POST",
      body: apiData,
    })
      .then((response) => {
        if (response.ok) {
          // Handle success
          console.log("Form data submitted successfully");
          setIsSuccess(true);
          ctx?.socketRef?.emit("send-noti", {
            targetedRegions: formData.targetedRegions,
          });
        } else {
          // Handle errors
          console.error("Error submitting form data");
        }
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form
      className="admin-upload-post-container text-center"
      onSubmit={handleSubmit}
    >
      <button
        className="button-blue button-auto-width button-height button-rounded"
        type="button"
        onClick={handleShowSubForm1}
      >
        Pre_College_Student_Form
      </button>
      {showSubForm1 && (
        <SubForm1
          formData={formData}
          handleChange={handleChange}
          isSuccess={isSuccess}
        />
      )}

      <br className="margin-top-16" />
      <button
        className="button-green button-auto-width button-height button-rounded"
        type="submit"
      >
        {isSubmitting ? "submitting..." : "submit"}
      </button>
    </form>
  );
};

const SubForm1 = ({ formData, handleChange, isSuccess }) => {
  return (
    <div
      className="admin-form-container"
      style={{
        marginTop: "20px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        textAlign: "left",
      }}
    >
      <label className="admin-form-label">
        Image:
        <input
          className="admin-form-input"
          type="file"
          accept="image/*"
          name="programImg"
          onChange={handleChange}
          value={formData.programImg}
        />
      </label>
      <br />

      <label className="admin-form-label">
        Targeted Regions (comma-separated list):
        <input
          className="admin-form-input"
          type="text"
          name="targetedRegions"
          onChange={handleChange}
          value={formData.targetedRegions}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Last Date To Apply:
        <input
          className="admin-form-input"
          type="text"
          name="lastDateToApply"
          onChange={handleChange}
          value={formData.lastDateToApply}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Max Age:
        <input
          className="admin-form-input"
          type="number"
          name="maxAge"
          onChange={handleChange}
          value={formData.maxAge}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Max Income Limit:
        <input
          className="admin-form-input"
          type="number"
          name="maxIncomeLimit"
          onChange={handleChange}
          value={formData.maxIncomeLimit}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Description:
        <textarea
          className="admin-form-textarea"
          name="description"
          onChange={handleChange}
          value={formData.description}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Title:
        <input
          className="admin-form-input"
          type="text"
          name="title"
          onChange={handleChange}
          value={formData.title}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Duration Of Program:
        <input
          className="admin-form-input"
          type="text"
          name="durationOfProgram"
          onChange={handleChange}
          value={formData.durationOfProgram}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Amount Of Scholarship:
        <input
          className="admin-form-input"
          type="text"
          name="amountOfScholarship"
          onChange={handleChange}
          value={formData.amountOfScholarship}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Minimum SSC Percentage:
        <input
          className="admin-form-input"
          type="number"
          name="minSSCPrcntg"
          onChange={handleChange}
          value={formData.minSSCPrcntg}
        />
      </label>
      <br />
      {/* <label className="admin-form-label">
        FAQs (Question and Answer, comma-separated):
        <textarea
          className="admin-form-textarea"
          name="FAQs"
          onChange={handleChange}
          value={formData.FAQs}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Terms And Conditions (comma-separated list):
        <textarea
          className="admin-form-textarea"
          name="termsAndConditions"
          onChange={handleChange}
          value={formData.termsAndConditions}
        />
      </label> */}
      <br />
      {/* <label className="admin-form-label">
        Eligibility Criteria (comma-separated list):
        <textarea
          className="admin-form-textarea"
          name="EligibilityCriteria"
          onChange={handleChange}
          value={formData.EligibilityCriteria}
        />
      </label> */}
      <br />
      {isSuccess ? (
        <div className="success-message">Form submitted successfully</div>
      ) : (
        <div className="success-message">
          Form is not submitted successfully
        </div>
      )}
    </div>
  );
};

export default Option1Form;
