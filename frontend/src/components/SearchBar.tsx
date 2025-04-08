// src/components/SearchBar.tsx
import React from 'react';

interface Props {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ setSearchQuery }: Props) {
  return (
    <input
      type="text"
      placeholder="Search blocks..."
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{ margin: '1rem 0', padding: '0.5rem', width: '100%' }}
    />
  );
}
