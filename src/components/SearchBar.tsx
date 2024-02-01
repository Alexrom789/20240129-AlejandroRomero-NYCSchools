import React, { useState, ChangeEvent } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <>
      <input
        aria-label="Search for schools"
        className='rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding text-white px-3 py-1 transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-white focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none'
        type='search'
        placeholder='Search Schools'
        value={searchTerm}
        onChange={handleSearch}
      />
    </>
  );
};

export default SearchBar;