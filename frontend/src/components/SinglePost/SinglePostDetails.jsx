import React, { useContext } from 'react';
import './SinglePostDetails.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { blog } from '../../dummydata';
import { AuthContext } from '../hook/HuzAuthProvider';

const ProgramDetails = () => {

    const [program , setProgram] = useState({});
    const [reviews , setReviews] = useState([]);
    const [error ,setError] = useState("");

    const [reviewDescription, setReviewDescription] = useState("");
    const [rating, setRating] = useState(1);

    const ctx = useContext(AuthContext);

    const {programId} = useParams();
  
    useEffect(()=>{
  
      const getSinglePostDetails=async()=>{
        try {
             const response = await fetch(`http://localhost:8080/user/program/${programId}` , {
              headers :{
                'Content-Type' : 'application/json'
              }
             });
  
             const responseData = await response.json();
  
             if(response.status===400 || response.status===500 || response.status===422){
              throw new Error(responseData.message);
             }
  
             setProgram(responseData.data);
             setReviews(responseData.reviews);
  
        } catch (error) {
            setError(error.message)
        }
    }
          
      getSinglePostDetails();
  
    },[]);

    const submitReview = async () => {
           if(reviewDescription.trim().length===0){
               alert("Please write a review");
               return;
           }

           try {
                const response = await fetch(`http://localhost:8080/review/add` , {
                    method : "POST" ,
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${ctx?.user?.token}`
                    },
                    body : JSON.stringify({
                        description : reviewDescription,
                        rating : rating ,
                        programId : programId
                    })
                });
  
                const responseData = await response.json();
  
                if(response.status===400 || response.status===500 || response.status===422 || response.status===401){
                    throw new Error(responseData.message);
                }
  
                setReviews((prev)=>{
                    return [...prev , responseData.review];
                
                });

                setReviewDescription("");
                setRating(1);
           } catch (error) {
                setError(error.message);
           }

           
    }


    const handleStarClick = (value) => {
        setRating(value);
      };
  
  return (
    <div className="program-details">
        {error!=="" ? <h4>{error}</h4> : null}
        <div className="program-image">
    <img src={program?.imageUrl ?program?.imageUrl : blog[0].cover } alt={program.title} />
  </div>
      <h2>{program.title}</h2>
      <div className="program-info">
        <p><strong>Description:</strong> {program?.description}</p>
        <p><strong>Last Date to Apply:</strong> {program?.lastDateToApply}</p>
        <p><strong>Max Age:</strong> {program?.maxAge}</p>
        <p><strong>Max Income Limit:</strong> {program?.maxIncomeLimit}</p>
        <p><strong>Amount of Scholarship:</strong> {program?.amountOfScholarship}</p>
        <p><strong>Duration of Program:</strong> {program?.durationOfProgram}</p>
        <p><strong>Targeted Regions:</strong> {program?.targetedRegions?.join(', ')}</p>
        <p><strong>Minimum Qualification:</strong> {program?.minQualification}</p>
        <p><strong>Category:</strong> {program?.category}</p>
        <p><strong>Minimum CGPA:</strong> {program?.minCGPA}</p>
      </div>
      <div className="reviews">
        <h3>Reviews:</h3>

        {reviews.length===0 && <h4 style={{marginTop:"10px" , color:"salmon"}}>This program has no reviews</h4>}
        {reviews?.map(review => (
          <div key={review._id} className="review">
                        <p><strong>Rating:</strong> <StarRating rating={review.rating} /></p>
            <p><strong>Description:</strong> {review.description}</p>
            <div className="creator-info">
              <img src={review?.creator?.imageUrl} alt={review?.creator?.username} />
              <p><strong>Creator:</strong> {review?.creator?.username}</p>
            </div>
          </div>
        ))}

        {error!=="" ? <h4 style={{color:"red"}}>{error}</h4> : null}
      </div>

      <div className="add-review">
    <h3>Add a Review</h3>
    <textarea
      placeholder="Write your review..."
      value={reviewDescription}
      onChange={(e) => setReviewDescription(e.target.value)}
    />
    <div>
      <label>Rating: </label>
      <StarPicker rating={rating} handleStarClick={handleStarClick} />
    </div>
    <button onClick={submitReview}>Submit Review</button>
    {error!=="" ? <h4 style={{color:"red"}}>{error}</h4> : null}
  </div>

    </div>
  );
};

const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star selected">&#9733;</span>);
      } else {
        stars.push(<span key={i} className="star selected">&#9734;</span>);
      }
    }
    return <div>{stars}</div>;
  };


  const StarPicker = ({rating , handleStarClick}) => {
  
  
    return (
      <div>
        <p>Select your rating:</p>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={index < rating ? "star selected" : "star"}
            onClick={() => handleStarClick(index + 1)}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  };
export default ProgramDetails;
