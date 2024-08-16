import React from 'react';
import './Eligibility.css';
import { useLocation,useNavigate } from 'react-router-dom';
import { blog } from '../../dummydata';


const ProgramList = ({ programs, title }) => {
  const navigate = useNavigate();

  const navigateToDetails = (programId) => {
    navigate(`/program/${programId}`);
  };

  return (
    <div className='program-list'>
      <h2>{title}</h2>
      <div className='grid'>
        {programs.length > 0 &&
          programs.map((val) => (
            <div
              key={val._id}
              style={{ cursor: 'pointer' }}
              className='program-item shadow'
              onClick={() => navigateToDetails(val._id)}
            >
              <div className='img'>
                <img
                  src={val?.imageUrl ? val.imageUrl : blog[0].cover}
                  alt=''
                />
              </div>
              <div className='text'>
                <div className='admin flexSB'>
                  <span>
                    <i className='fa fa-user'></i>
                    <label htmlFor=''>Admin</label>
                  </span>
                  <span>
                    <i className='fa fa-calendar-alt'></i>
                    <label htmlFor=''>{val?.lastDateToApply}</label>
                  </span>
                  <span>
                    <i className='fa fa-comments'></i>
                    <label htmlFor=''>{val?.noOfReviews} reviews</label>
                  </span>
                </div>
                <h1>{val?.title}</h1>
                <p>{val?.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const ProgramDashboard = ({ allPrograms, partialMatches, fullMatches }) => {
  return (
    <div className="dashboard">
      {allPrograms.length > 0 ? <ProgramList programs={allPrograms} title="All Programs" /> : null }
      {partialMatches.length > 0 ? <ProgramList programs={partialMatches} title="Partially Matched Programs" /> : null }
      {fullMatches.length > 0 ? <ProgramList programs={fullMatches} title="Fully Matched Programs" /> : null }
    </div>
  );
};

const EligibilityResults = () => {
  const location = useLocation();
  const { allPrograms, partialMatches, fullMatches, error } = location.state;

  return (
    <div className="results-page">
      {error && <h4 style={{ color: 'red' }}>{error}</h4>}
      <ProgramDashboard allPrograms={allPrograms} fullMatches={fullMatches} partialMatches={partialMatches} />
    </div>
  );
};

export default EligibilityResults;
