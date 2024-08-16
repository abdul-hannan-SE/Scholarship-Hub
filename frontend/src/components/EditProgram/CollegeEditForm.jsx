
import { useContext, useState } from "react";
import "./Form.css"
import { AuthContext } from "../hook/HuzAuthProvider";
function CollegeEditForm({passedForm , setUpliftedForm}){
    const ctx = useContext(AuthContext);
  const [showSubForm1, setShowSubForm1] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    minQualification: "CollegeStudentProgram",
    category:'national',
    targetedRegions: passedForm?.targetedRegions,
      lastDateToApply: passedForm?.lastDateToApply,
      maxAge: passedForm?.maxAge,
      maxIncomeLimit: passedForm?.maxIncomeLimit,
      description: passedForm?.description,
      title: passedForm?.title,
      durationOfProgram:  passedForm?.durationOfProgram,
      amountOfScholarship: passedForm?.amountOfScholarship,
      minSSCPrcntg: passedForm?.minSSCPrcntg,
      FAQs: passedForm?.FAQs,
      termsAndConditions: passedForm?.termsAndConditions ? passedForm?.termsAndConditions.toString() : "",
      EligibilityCriteria: passedForm?.EligibilityCriteria ? passedForm?.EligibilityCriteria.toString() : "",
  });

  const handleShowSubForm1 = () => {
    setShowSubForm1(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
     setUpliftedForm(formData);

  }

        return (
            <form className='admin-upload-post-container text-center' onSubmit={handleSubmit}>
              <button className='button-blue button-auto-width button-height button-rounded' type="button" onClick={handleShowSubForm1}>Pre_College_Student_Form</button>
              {showSubForm1 && <SubForm1 formData={formData} handleChange={handleChange} />}
        
              <br className='margin-top-16' />
              <button className='button-green button-auto-width button-height button-rounded' type="submit">
                {isSubmitting ? "submitting..." : "submit"}
              </button>
            </form>
          );
        };
        
        const SubForm1 = ({ formData, handleChange }) => {
        
        
        
          return (
            <div className='admin-form-container' style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', textAlign: "left" }}>
              <label className='admin-form-label'>
                Targeted Regions (comma-separated list):
                <input className='admin-form-input' type="text" name="targetedRegions" onChange={handleChange} value={formData.targetedRegions} />
              </label>
              <br />
              <label className='admin-form-label'>
                Last Date To Apply:
                <input className='admin-form-input' type="text" name="lastDateToApply" onChange={handleChange} value={formData.lastDateToApply} />
              </label>
              <br />
              <label className='admin-form-label'>
                Max Age:
                <input className='admin-form-input' type="number" name="maxAge" onChange={handleChange} value={formData.maxAge} />
              </label>
              <br />
              <label className='admin-form-label'>
                Max Income Limit:
                <input className='admin-form-input' type="number" name="maxIncomeLimit" onChange={handleChange} value={formData.maxIncomeLimit} />
              </label>
              <br />
              <label className='admin-form-label'>
                Description:
                <textarea className='admin-form-textarea' name="description" onChange={handleChange} value={formData.description} />
              </label>
              <br />
              <label className='admin-form-label'>
                Title:
                <input className='admin-form-input' type="text" name="title" onChange={handleChange} value={formData.title} />
              </label>
              <br />
              <label className='admin-form-label'>
                Duration Of Program:
                <input className='admin-form-input' type="text" name="durationOfProgram" onChange={handleChange} value={formData.durationOfProgram} />
              </label>
              <br />
              <label className='admin-form-label'>
                Amount Of Scholarship:
                <input className='admin-form-input' type="text" name="amountOfScholarship" onChange={handleChange} value={formData.amountOfScholarship} />
              </label>
              <br />
              <label className='admin-form-label'>
                Minimum SSC Percentage:
                <input className='admin-form-input' type="number" name="minSSCPrcntg" onChange={handleChange} value={formData.minSSCPrcntg} />
              </label>
              <br />
              <label className='admin-form-label'>
                FAQs (Question and Answer, comma-separated):
                <textarea className='admin-form-textarea' name="FAQs" onChange={handleChange} value={formData.FAQs} />
              </label>
              <br />
              <label className='admin-form-label'>
                Terms And Conditions (comma-separated list):
                <textarea className='admin-form-textarea' name="termsAndConditions" onChange={handleChange} value={formData.termsAndConditions} />
              </label>
              <br />
              <label className='admin-form-label'>
                Eligibility Criteria (comma-separated list):
                <textarea className='admin-form-textarea' name="EligibilityCriteria" onChange={handleChange} value={formData.EligibilityCriteria} />
              </label>
        
            </div>
    )
}

export default CollegeEditForm;