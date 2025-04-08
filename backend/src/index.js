const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB & Models
const sequelize = require('./config/db');
const File = require('./models/File');
const Block = require('./models/Block');

// Routes
const fileRoutes = require('./routes/fileRoutes');
const blockRoutes = require('./routes/blockRoutes');

app.use('/api/files', fileRoutes);
app.use('/api/blocks', blockRoutes);
// Serve Swagger UI at /api-docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Test route
app.get('/', (req, res) => {
  res.send('CAD Block Viewer API running 🚀');
});

// Sync DB and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully 🧠');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
