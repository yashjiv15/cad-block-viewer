// src/components/BlockList.tsx
import { useEffect, useState } from 'react';
import { getBlocks } from '../services/api';

interface Block {
  id: string;
  name: string;
  type: string;
}

interface Props {
  searchQuery: string;
  onSelectBlock: (id: string) => void;
}

export default function BlockList({ searchQuery, onSelectBlock }: Props) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(10); // Number of blocks per page

  useEffect(() => {
    const fetchBlocks = async () => {
      const { data } = await getBlocks({ search: searchQuery, page: currentPage, limit });
      setBlocks(data.blocks || []);
      setTotalPages(data.totalPages || 0); // Assuming your API returns total pages
    };
    fetchBlocks();
  }, [searchQuery, currentPage, limit]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="block-list">
      <h3>Blocks</h3>
      <div style={{ maxHeight: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '1rem' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {blocks.map((block) => (
            <li
              key={block.id}
              className="block-item"
              onClick={() => onSelectBlock(block.id)}
            >
              {block.name} ({block.type})
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}