const express = require('express');
const router = express.Router();

const {
  getBlocks,
  getBlockById
} = require('../controllers/blockController');

/**
 * @swagger
 * /blocks:
 *   get:
 *     summary: Get all blocks (paginated)
 *     tags: [Blocks]
 *     responses:
 *       200:
 *         description: List of blocks
 */
router.get('/', getBlocks);

/**
 * @swagger
 * /blocks/{id}:
 *   get:
 *     summary: Get a single block by ID
 *     tags: [Blocks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the block
 *     responses:
 *       200:
 *         description: Block details
 *       404:
 *         description: Block not found
 */
router.get('/:id', getBlockById);

module.exports = router;
