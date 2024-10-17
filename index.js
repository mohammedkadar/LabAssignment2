const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./productRoutes')


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DB_URL = 'mongodb://localhost:27017/Marketplace';

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error: ', error));

app.use('/api/products', productRoutes)

app.get('/', (req,res) => {
    res.send('Welcome to the DressStore application!');
} );


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});