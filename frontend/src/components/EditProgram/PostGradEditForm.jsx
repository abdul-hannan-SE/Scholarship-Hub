import { useContext, useState } from "react";
import { AuthContext } from "../hook/HuzAuthProvider";
import "./Admin.css"


function PostGardEditForm({passedForm , setUpliftedForm}){

    const ctx = useContext(AuthContext);
    const [showSubForm1, setShowSubForm1] = useState(false);
    const [showSubForm2, setShowSubForm2] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false)
    const [subFormType , setSubFormType] = useState("national");


    const [formData,setFormData] = useState({
    minQualification: passedForm?.minQualification,
    category: "national",
    targetedRegions: passedForm?.targetedRegions,
    lastDateToApply: passedForm?.lastDateToApply,
    maxAge: passedForm?.maxAge,
    maxIncomeLimit: passedForm?.maxIncomeLimit,
    description: passedForm?.description,
    title: passedForm?.title,
    durationOfProgram:  passedForm?.durationOfProgram,
    amountOfScholarship: passedForm?.amountOfScholarship,
    FAQs: passedForm?.FAQs,
    termsAndConditions: passedForm?.termsAndConditions ? passedForm?.termsAndConditions.toString() : "",
    EligibilityCriteria: passedForm?.EligibilityCriteria ? passedForm?.EligibilityCriteria.toString() : "",
      isPHD_program: passedForm?.isPHD_program,
      minCGPA: passedForm?.minCGPA,
      requiresUniversityRank: passedForm?.requiresUniversityRank,
      requiresFirstDivison: passedForm?.requiresFirstDivison
    });

    const [formDatainter,setFormDatainter] = useState({
      minQualification: "PostGraduateStudentProgram",
      category: "international",
      targetedRegions: passedForm?.targetedRegions,
    lastDateToApply: passedForm?.lastDateToApply,
    maxAge: passedForm?.maxAge,
    description: passedForm?.description,
    title: passedForm?.title,
    durationOfProgram:  passedForm?.durationOfProgram,
      amountOfScholarship: passedForm?.amountOfScholarship,
      FAQs: passedForm?.FAQs,
      termsAndConditions: passedForm?.termsAndConditions ? passedForm?.termsAndConditions.toString() : "",
      EligibilityCriteria: passedForm?.EligibilityCriteria ? passedForm?.EligibilityCriteria.toString() : "",
        isPHD_program: passedForm?.isPHD_program,
        minCGPA: passedForm?.minCGPA,
        requiresUniversityRank: passedForm?.requiresUniversityRank,
        requiresFirstDivison: passedForm?.requiresFirstDivison
    });

    
    
    const handleShowSubForm1 = () => {
      setShowSubForm1(true);
      setShowSubForm2(false);
      setSubFormType("national");
    };
    
    const handleShowSubForm2 = () => {
      setShowSubForm2(true);
      setShowSubForm1(false);
      setSubFormType("international");
    };
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
  
    const handleChange2 = (e) => {
      const { name, value, type, checked } = e.target;
      setFormDatainter(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        setIsSubmitting(true);
        if(subFormType === "national"){
          setUpliftedForm(formData)
        }else{
          setUpliftedForm(formDatainter);
        }
       
    }



    return (
        <form className='admin-upload-post-container text-center' onSubmit={handleSubmit}>
             <h2 style={{textAlign:"center"}}>Edit Post Graduate Student Program</h2>
          <button className='button-blue button-auto-width button-height button-rounded' type="button" onClick={handleShowSubForm1}>National</button>
          {showSubForm1 && <SubForm1 formData={formData} handleChange={handleChange} />}
    
          <br className='margin-top-16' />
          <button className='button-blue button-auto-width button-height button-rounded' type="button" onClick={handleShowSubForm2}>International</button>
          {showSubForm2 && <SubForm2 formDatainter={formDatainter} handleChange2={handleChange2} />}
    
          <br className='margin-top-16' />
          
          <button className='button-green button-auto-width button-height button-rounded' type="submit">
      {isSubmitting ? "Submitting..." : "Submit"}
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
          <br />
          <label className='admin-form-label'>
            Only For Public Universities:
            <input className='admin-form-checkbox' type="checkbox" name="onlyForPublicUnis" onChange={handleChange} checked={formData.onlyForPublicUnis} />
          </label>
          <br />
          <label className='admin-form-label'>
            Minimum CGPA:
            <input className='admin-form-input' type="number" name="minCGPA" onChange={handleChange} value={formData.minCGPA} />
          </label>
          <br />
          <label className='admin-form-label'>
            Requires Employee of the Public Sector:
            <input className='admin-form-checkbox' type="checkbox" name="requiresUniversityRank" onChange={handleChange} checked={formData.requiresUniversityRank} />
          </label>
          <label className='admin-form-label'>
            Targeted Disciplines (comma-separated list):
            <input className='admin-form-input' type="text" name="targetedDisciplines" onChange={handleChange} value={formData.targetedDisciplines} />
          </label>
          <br />
    
        </div>

);
};





const SubForm2 = ({ formDatainter, handleChange2 }) => {



  return (
    <div className='admin-form-container' style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', textAlign: "left" }}>
      <label className='admin-form-label'>
        Targeted Regions (comma-separated list):
        <input className='admin-form-input' type="text" name="targetedRegions" onChange={handleChange2} value={formDatainter.targetedRegions} />
      </label>
      <br />
      <label className='admin-form-label'>
        Last Date To Apply:
        <input className='admin-form-input' type="text" name="lastDateToApply" onChange={handleChange2} value={formDatainter.lastDateToApply} />
      </label>
      <br />
      <label className='admin-form-label'>
        Max Age:
        <input className='admin-form-input' type="number" name="maxAge" onChange={handleChange2} value={formDatainter.maxAge} />
      </label>
      <br />
      <label className='admin-form-label'>
        Description:
        <textarea className='admin-form-textarea' name="description" onChange={handleChange2} value={formDatainter.description} />
      </label>
      <br />
      <label className='admin-form-label'>
        Title:
        <input className='admin-form-input' type="text" name="title" onChange={handleChange2} value={formDatainter.title} />
      </label>
      <br />
      <label className='admin-form-label'>
        Duration Of Program:
        <input className='admin-form-input' type="text" name="durationOfProgram" onChange={handleChange2} value={formDatainter.durationOfProgram} />
      </label>
      <br />
      <label className='admin-form-label'>
        Amount Of Scholarship:
        <input className='admin-form-input' type="text" name="amountOfScholarship" onChange={handleChange2} value={formDatainter.amountOfScholarship} />
      </label>
      <br />
      <label className='admin-form-label'>
        FAQs (Question and Answer, comma-separated):
        <textarea className='admin-form-textarea' name="FAQs" onChange={handleChange2} value={formDatainter.FAQs} />
      </label>
      <br />
      <label className='admin-form-label'>
        Terms And Conditions (comma-separated list):
        <textarea className='admin-form-textarea' name="termsAndConditions" onChange={handleChange2} value={formDatainter.termsAndConditions} />
      </label>
      <br />
      <label className='admin-form-label'>
        Eligibility Criteria (comma-separated list):
        <textarea className='admin-form-textarea' name="EligibilityCriteria" onChange={handleChange2} value={formDatainter.EligibilityCriteria} />
      </label>
      <br />
      <label className='admin-form-label'>
        Only For Public Universities:
        <input className='admin-form-checkbox' type="checkbox" name="onlyForPublicUnis" onChange={handleChange2} checked={formDatainter.onlyForPublicUnis} />
      </label>
      <br />
      <label className='admin-form-label'>
        Minimum CGPA:
        <input className='admin-form-input' type="number" name="minCGPA" onChange={handleChange2} value={formDatainter.minCGPA} />
      </label>
      <br />
      <label className='admin-form-label'>
        Requires Employee of the Public Sector:
        <input className='admin-form-checkbox' type="checkbox" name="requiresUniversityRank" onChange={handleChange2} checked={formDatainter.requiresUniversityRank} />
      </label>
      <label className='admin-form-label'>
        Targeted Disciplines (comma-separated list):
        <input className='admin-form-input' type="text" name="targetedDisciplines" onChange={handleChange2} value={formDatainter.targetedDisciplines} />
      </label>
      <br />

    </div>
    )
}

export default PostGardEditForm;