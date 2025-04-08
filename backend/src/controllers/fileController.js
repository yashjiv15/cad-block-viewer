const { parseDXF } = require('../services/dxfService');
const File = require('../models/File');
const Block = require('../models/Block');

const uploadFile = async (req, res) => {
  try {
    const { filename, path: filePath, originalname } = req.file;

    // Save file metadata
    const file = await File.create({
      filename,
      originalName: originalname,
      path: filePath,
    });

    // Parse blocks from DXF
    const blocks = await parseDXF(filePath);

    // Store blocks in DB
    for (const block of blocks) {
      await Block.create({
        name: block.name,
        x: block.x,
        y: block.y,
        z: block.z,
        entities: block.entities,
        fileId: file.id,
      });
    }

    res.status(200).json({
      message: 'File uploaded and blocks saved!',
      filename,
      blocksCount: blocks.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Upload or block parsing failed', error: error.message });
  }
};

module.exports = { uploadFile };
