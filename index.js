const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const blogRoute =require("./routes/blog")
const {connect} =require("./db")

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // or '*' for all origins
  credentials: true, // if you're using cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

connect();
app.get('/', (req, res) => {
 res.send("I am the index page of the BlogPostApi");
})


app.use('/api/v1',blogRoute)
app.listen(PORT, (err) => {
    if (err) {
        return console.error('Error starting server:', err);
    }
 console.log(`Server is running on port ${PORT}`);
});