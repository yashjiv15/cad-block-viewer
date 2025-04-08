const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const fileController = require('../controllers/fileController');

/**
 * @swagger
 * /files/upload:
 *   post:
 *     summary: Upload a DXF file
 *     tags: [Files]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: Bad request or missing file
 */
router.post('/upload', upload.single('file'), fileController.uploadFile);

module.exports = router;
