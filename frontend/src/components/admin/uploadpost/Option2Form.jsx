import React, { useContext, useState } from "react";
import "./Form.css";
import { AuthContext } from "../../hook/HuzAuthProvider";

const Option2Form = () => {
  const ctx = useContext(AuthContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSubForm1, setShowSubForm1] = useState(false);
  const [showSubForm2, setShowSubForm2] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    minQualification: "UniversityStudentProgram",
    category: "national",
    targetedRegions: "Pakistan, Punjab,Ajk, Kpk, Gilgit, Blochistan, Fata",
    lastDateToApply: null,
    maxAge: null,
    maxIncomeLimit: null,
    description: null,
    title: null,
    durationOfProgram: null,
    amountOfScholarship: null,
    minSSCPrcntg: 0,
    FAQs: "",
    termsAndConditions: "",
    EligibilityCriteria: "",
    onlyForPublicUnis: false,
    minSHCPrcntg: 0,
    requiresUniversityRank: false,
    requiresFirstDivison: false,
  });
  const [formDatainter, setFormDatainter] = useState({
    minQualification: "UniversityStudentProgram",
    category: "international",
    targetedRegions: "Pakistan, Punjab,Ajk, Kpk, Gilgit, Blochistan, Fata",
    lastDateToApply: null,
    maxAge: null,
    maxIncomeLimit: null,
    description: null,
    title: null,
    durationOfProgram: null,
    amountOfScholarship: null,
    minSSCPrcntg: 0,
    FAQs: "",
    termsAndConditions: "",
    EligibilityCriteria: "",
    programLink: "",
    mustHoldInternationalUniversityAcceptance: false,
    targetedDisciplines: null,
    minCGPA: 0,
    requiresFirstDivison: false,
  });
  const [programImg1, setProgramImage1] = useState(null);
  const handleShowSubForm1 = () => {
    setShowSubForm1(true);
    setShowSubForm2(false);
  };

  const handleShowSubForm2 = () => {
    setShowSubForm2(true);
    setShowSubForm1(false);
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "file") {
      // For file input, update separate state
      setProgramImage1(e.target.files[0]);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };
  const handleChange2 = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "file") {
      // For file input, update separate state
      setProgramImage1(e.target.files[0]);
    } else {
      setFormDatainter((prevState) => ({
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

    // Append form data based on the active form (national or international)
    if (showSubForm1) {
      // Append form data from the national section
      for (const key in formData) {
        apiData.append(key, formData[key]);
      }
    } else if (showSubForm2) {
      // Append form data from the international section
      for (const key in formDatainter) {
        apiData.append(key, formDatainter[key]);
      }
      
    }
    
   // Append the image if it exists
   if (programImg1) {
    apiData.append("programImg", programImg1);
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
      <div className="formtext">Post_graduate_program</div>
      <button
        className="button-blue button-auto-width button-height button-rounded"
        type="button"
        onClick={handleShowSubForm2}
      >
        International
      </button>
      {showSubForm2 && (
        <SubForm2
          formDatainter={formDatainter}
          handleChange2={handleChange2}
          isSuccess={isSuccess}
        />
      )}

      <br className="margin-top-16" />
      <button
        className="button-blue button-auto-width button-height button-rounded"
        type="button"
        onClick={handleShowSubForm1}
      >
        National
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
        {isSubmitting ? "Submitting..." : "Submit"}
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
      </label>
      <br /> */}
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
      <label className="admin-form-label">
        Only For Public Universities:
        <input
          className="admin-form-checkbox"
          type="checkbox"
          name="onlyForPublicUnis"
          onChange={handleChange}
          checked={formData.onlyForPublicUnis}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Minimum SHC Percentage:
        <input
          className="admin-form-input"
          type="number"
          name="minSHCPrcntg"
          onChange={handleChange}
          value={formData.minSHCPrcntg}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Requires University Rank:
        <input
          className="admin-form-checkbox"
          type="checkbox"
          name="requiresUniversityRank"
          onChange={handleChange}
          checked={formData.requiresUniversityRank}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Requires First Division:
        <input
          className="admin-form-checkbox"
          type="checkbox"
          name="requiresFirstDivison"
          onChange={handleChange}
          checked={formData.requiresFirstDivison}
        />
      </label>
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

const SubForm2 = ({ formDatainter, handleChange2, isSuccess }) => {
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
          onChange={handleChange2}
          value={formDatainter.programImg}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Targeted Regions (comma-separated list):
        <input
          className="admin-form-input"
          type="text"
          name="targetedRegions"
          onChange={handleChange2}
          value={formDatainter.targetedRegions}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Last Date To Apply:
        <input
          className="admin-form-input"
          type="text"
          name="lastDateToApply"
          onChange={handleChange2}
          value={formDatainter.lastDateToApply}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Max Age:
        <input
          className="admin-form-input"
          type="number"
          name="maxAge"
          onChange={handleChange2}
          value={formDatainter.maxAge}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Max Income Limit:
        <input
          className="admin-form-input"
          type="number"
          name="maxIncomeLimit"
          onChange={handleChange2}
          value={formDatainter.maxIncomeLimit}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Description:
        <textarea
          className="admin-form-textarea"
          name="description"
          onChange={handleChange2}
          value={formDatainter.description}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Title:
        <input
          className="admin-form-input"
          type="text"
          name="title"
          onChange={handleChange2}
          value={formDatainter.title}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Duration Of Program:
        <input
          className="admin-form-input"
          type="text"
          name="durationOfProgram"
          onChange={handleChange2}
          value={formDatainter.durationOfProgram}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Amount Of Scholarship:
        <input
          className="admin-form-input"
          type="text"
          name="amountOfScholarship"
          onChange={handleChange2}
          value={formDatainter.amountOfScholarship}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Minimum SSC Percentage:
        <input
          className="admin-form-input"
          type="number"
          name="minSSCPrcntg"
          onChange={handleChange2}
          value={formDatainter.minSSCPrcntg}
        />
      </label>
      <br />
      {/* <label className="admin-form-label">
        FAQs (Question and Answer, comma-separated):
        <textarea
          className="admin-form-textarea"
          name="FAQs"
          onChange={handleChange2}
          value={formDatainter.FAQs}
        />
      </label> */}
      {/* <br />
      <label className="admin-form-label">
        Terms And Conditions (comma-separated list):
        <textarea
          className="admin-form-textarea"
          name="termsAndConditions"
          onChange={handleChange2}
          value={formDatainter.termsAndConditions}
        />
      </label> */}
      {/* <br />
      <label className="admin-form-label">
        Eligibility Criteria (comma-separated list):
        <textarea
          className="admin-form-textarea"
          name="EligibilityCriteria"
          onChange={handleChange2}
          value={formDatainter.EligibilityCriteria}
        />
      </label> */}
      <br />
      <label className="admin-form-label">
        Program Link:
        <input
          className="admin-form-input"
          type="text"
          name="programLink"
          onChange={handleChange2}
          value={formDatainter.programLink}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Must Hold International University Acceptance:
        <input
          className="admin-form-checkbox"
          type="checkbox"
          name="mustHoldInternationalUniversityAcceptance"
          onChange={handleChange2}
          checked={formDatainter.mustHoldInternationalUniversityAcceptance}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Targeted Disciplines (comma-separated list):
        <input
          className="admin-form-input"
          type="text"
          name="targetedDisciplines"
          onChange={handleChange2}
          value={formDatainter.targetedDisciplines}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Minimum CGPA:
        <input
          className="admin-form-input"
          type="number"
          name="minCGPA"
          onChange={handleChange2}
          value={formDatainter.minCGPA}
        />
      </label>
      <br />
      <label className="admin-form-label">
        Requires First Division:
        <input
          className="admin-form-checkbox"
          type="checkbox"
          name="requiresFirstDivison"
          onChange={handleChange2}
          checked={formDatainter.requiresFirstDivison}
        />
      </label>
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

export default Option2Form;
