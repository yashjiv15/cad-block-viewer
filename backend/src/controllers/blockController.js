const { Op } = require('sequelize');
const Block = require('../models/Block');

const getBlocks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { search = '', fileId } = req.query;

    const whereClause = {};

    if (search) {
      whereClause.name = { [Op.iLike]: `%${search}%` };
    }

    if (fileId) {
      whereClause.fileId = fileId;
    }

    console.log('Filters applied:', whereClause); // 🔍 Debug log

    const { count, rows } = await Block.findAndCountAll({
      where: whereClause,
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      blocks: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalBlocks: count,
    });
  } catch (error) {
    console.error('Error fetching blocks:', error);
    res.status(500).json({ message: 'Failed to fetch blocks' });
  }
};


const getBlockById = async (req, res) => {
  try {
    const blockId = req.params.id;
    const block = await Block.findByPk(blockId);

    if (!block) {
      return res.status(404).json({ message: 'Block not found' });
    }

    res.status(200).json(block);
  } catch (error) {
    console.error('Error fetching block:', error);
    res.status(500).json({ message: 'Error retrieving block', error: error.message });
  }
};

module.exports = {
  getBlocks,
  getBlockById
};
