import React, { useState } from 'react';

interface SchoolCardProps {
  school: {
    dbn: string;
    school_name: string;
    primary_address_line_1: string;
    city: string;
    state_code: string;
    zip: string;
    phone_number: string;
    school_email: string;
    total_students: string;
    overview_paragraph: string;
    sat_scores: {
      sat_critical_reading_avg_score: string;
      sat_math_avg_score: string;
      sat_writing_avg_score: string;
    };
  };
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  const {
    dbn,
    school_name,
    primary_address_line_1,
    city,
    state_code,
    zip,
    phone_number,
    school_email,
    total_students,
    overview_paragraph,
    sat_scores,
  } = school; // Use destructuring

  const tooltipText = 'Click card for more info';
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleView = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      key={dbn}
      className={`m-4 p-4 bg-white rounded shadow-md hover:cursor-pointer max-w-xl text-black min-w-xl border-2 transition-transform duration-300 ease-in-out transform ${
        isExpanded ? 'border-blue-500 scale-105' : 'scale-100'
      }`}
      title={tooltipText}
      onClick={toggleView}
    >
      <h2 className="text-xl font-bold mb-2 text-center">{school_name}</h2>
      {isExpanded ? (
        <>
          <p className="text-sm mb-3">{overview_paragraph}</p>
          <div className='flex flex-col md:flex-row justify-between'>   
            <div className='flex-col'>
                {Object.keys(sat_scores).length !== 0 ? (
                    <>
                        <p>SAT Reading Avg Score: {sat_scores.sat_critical_reading_avg_score}</p>
                        <p>SAT Math Avg Score: {sat_scores.sat_math_avg_score}</p>
                        <p>SAT Writing Avg Score: {sat_scores.sat_writing_avg_score}</p>
                    </>
                    ) : (
                        <p>No SAT Scores available for this school.</p>
                    )}
                <p className="mb-2">{`Number of Students: ${total_students}`}</p>
           </div>
           <div className='flex-col'>
                <p>{`${primary_address_line_1},`}</p>
                <p>{`${city} ${state_code} ${zip}`}</p>
                <p>{phone_number}</p>
                <p>{school_email}</p>
            </div>
        </div>
        </>
      ) : (
        <div className='text-center'>
          <p>{`${primary_address_line_1}, ${city} ${state_code} ${zip}`}</p>
          <p>{phone_number}</p>
          <p>{school_email}</p>
        </div>
      )}
    </div>
  );
};

export default SchoolCard;