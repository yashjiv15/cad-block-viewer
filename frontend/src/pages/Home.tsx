// src/pages/Home.tsx
import FileUpload from '../components/FileUpload';
import BlockList from '../components/BlockList';
import BlockDetails from '../components/BlockDetails';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';

export default function Home() {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="container">
      <h1>CAD Block Details Viewer</h1>
      <FileUpload />
      <SearchBar setSearchQuery={setSearchQuery} />
      <div style={{ display: 'flex', gap: '2rem' }}>
        <BlockList
          searchQuery={searchQuery}
          onSelectBlock={(id) => setSelectedBlockId(id)}
        />
        {selectedBlockId && <BlockDetails id={selectedBlockId} />}
      </div>
    </div>
  );
}
