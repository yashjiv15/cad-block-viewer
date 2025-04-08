import { useEffect, useState } from 'react';
import { getBlockById } from '../services/api';

interface Props {
  id: string;
}

export default function BlockDetails({ id }: Props) {
  const [block, setBlock] = useState<any>(null);

  useEffect(() => {
    const fetchBlock = async () => {
      try {
        const { data } = await getBlockById(id);
        setBlock(data);
      } catch (error) {
        console.error("Error fetching block:", error);
      }
    };
    fetchBlock();
  }, [id]);

  if (!block) return <div className="block-details">Loading...</div>;

  return (
    <div className="block-details">
      <h3>Block Details</h3>
      <p><strong>Name:</strong> {block.name}</p>
      <p><strong>Coordinates:</strong> (x: {block.x}, y: {block.y}, z: {block.z})</p>
      <p><strong>Entities:</strong> {block.entities}</p>
      <p><strong>Created At:</strong> {new Date(block.createdAt).toLocaleString()}</p>
      <p><strong>Updated At:</strong> {new Date(block.updatedAt).toLocaleString()}</p>
      <p><strong>File ID:</strong> {block.fileId}</p>
    </div>
  );
}