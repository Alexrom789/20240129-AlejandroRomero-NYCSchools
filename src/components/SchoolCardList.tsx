import React, { useState, useEffect } from 'react';
import SchoolCard from './SchoolCard.tsx';

interface SchoolCardListProps {
  searchTerm: string;
}

interface SchoolData {
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
  }
}

const SchoolCardList: React.FC<SchoolCardListProps> = ({ searchTerm }) => {
  const [data, setData] = useState<SchoolData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filteredData, setFilteredData] = useState<SchoolData[]>([]);

  // NOTE** With more time I would use intersectObserver to implement infinite scroll to limit number of schools rendered on viewport.

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolResponse = await fetch('https://data.cityofnewyork.us/resource/s3k6-pzi2.json');
        const satResponse = await fetch('https://data.cityofnewyork.us/resource/f9bf-2cp4.json');

        if (!schoolResponse.ok || !satResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const schoolData = await schoolResponse.json();
        const satData = await satResponse.json();

        // Merge the two datasets based on the 'dbn' key
        const mergedData = schoolData.map((school) => ({
          ...school,
          sat_scores: satData.find((sat: any) => sat.dbn === school.dbn) || {}, // Empty object if no match
        }));

        setData(mergedData);
        setFilteredData(mergedData); // Set filtered data initially with all schools
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs once after the initial render.

  useEffect(() => {
    // Filter data based on the search term
    if (data) {
      const filtered = data.filter((school) =>
        school.school_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [data, searchTerm]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {filteredData.map((school) => (
        <SchoolCard key={school.dbn} school={school} />
      ))}
    </div>
  );
};

export default SchoolCardList;