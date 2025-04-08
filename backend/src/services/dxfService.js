const fs = require('fs');
const path = require('path');
const DxfParser = require('dxf-parser');

/**
 * Parses a DXF file and extracts block information.
 * @param {string} filePath - The path to the DXF file.
 * @returns {Promise<Array>} - A promise that resolves to an array of blocks with their details.
 */
const parseDXF = (filePath) => {
    return new Promise((resolve, reject) => {
        const parser = new DxfParser();
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading DXF file:', err);
                return reject(err);
            }
            try {
                const dxf = parser.parseSync(data);
                const blocks = [];

                if (dxf.blocks) {
                    for (const blockName in dxf.blocks) {
                        const block = dxf.blocks[blockName];
                        let x = 0, y = 0, z = 0;

                        // Log the block and its entities
                        console.log('Block:', block);
                        console.log('Entities:', block.entities);

                        // Check if there are entities and extract coordinates
                        if (block.entities && block.entities.length > 0) {
                            block.entities.forEach(entity => {
                                // Log each entity to understand its structure
                                console.log('Entity:', entity);

                                // Example: Check for LINE, POINT, or CIRCLE types
                                if (entity.type === 'LINE') {
                                    if (entity.start && entity.end) {
                                        x += (entity.start.x + entity.end.x) / 2; // Average of start and end
                                        y += (entity.start.y + entity.end.y) / 2;
                                        z += (entity.start.z || 0 + entity.end.z || 0) / 2;
                                    }
                                } else if (entity.type === 'POINT') {
                                    if (entity.vertices && entity.vertices.length > 0) {
                                        x += entity.vertices[0].x;
                                        y += entity.vertices[0].y;
                                        z += entity.vertices[0].z || 0;
                                    }
                                } else if (entity.type === 'CIRCLE') {
                                    if (entity.center) {
                                        x += entity.center.x;
                                        y += entity.center.y;
                                        z += entity.center.z || 0;
                                    }
                                }
                            });
                        } else {
                            console.warn(`No entities found for block: ${block.name}`);
                        }

                        // Calculate average or sum based on your needs
                        blocks.push({
                            name: block.name,
                            x: x / (block.entities ? block.entities.length : 1), // Avoid division by zero
                            y: y / (block.entities ? block.entities.length : 1),
                            z: z / (block.entities ? block.entities.length : 1),
                            entities: block.entities ? block.entities.length : 0,
                        });
                    }
                } else {
                    console.warn('No blocks found in the DXF file.');
                }

                resolve(blocks);
            } catch (parseError) {
                console.error('Error parsing DXF file:', parseError);
                reject(parseError);
            }
        });
    });
};

/**
 * Example function to handle DXF file upload and parsing.
 * @param {string} filePath - The path to the DXF file.
 */
const handleDxfUpload = async (filePath) => {
    try {
        const blocks = await parseDXF(filePath);
        console.log('Parsed blocks:', blocks);
        // Here you can save the blocks to your database or perform other actions
    } catch (error) {
        console.error('Failed to process DXF file:', error);
    }
};

module.exports = { parseDXF, handleDxfUpload };