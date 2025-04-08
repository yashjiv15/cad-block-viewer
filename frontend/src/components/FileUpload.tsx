// src/components/FileUpload.tsx
import { uploadFile } from '../services/api';

export default function FileUpload() {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      await uploadFile(formData);
      alert('File uploaded successfully!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Upload failed only DXF format Supported!');
    }
  };

  return (
    <div>
      <input type="file" accept=".dxf,.dwg" onChange={handleUpload} />
    </div>
  );
}
