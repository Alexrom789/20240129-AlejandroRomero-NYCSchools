import React, { useState } from 'react';
import './App.css';
import SchoolCardList from './components/SchoolCardList.tsx';
import SearchBar from './components/SearchBar.tsx';

interface AppProps {};

// NOTE** With more time I would use intersectObserver to implement infinite scroll to limit number of schools rendered on viewport.

const App: React.FC<AppProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center">
      <h1 className='text-white text-2xl my-4'>NYC Highschools</h1>
      <SearchBar onSearch={handleSearch} />
      <SchoolCardList searchTerm={searchTerm} />
    </div>
  );
};

export default App;