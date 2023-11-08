const app = require('./app')
const connectDB = require('./config/db')
require('dotenv').config()
connectDB();

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});