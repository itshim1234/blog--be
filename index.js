const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const blogRoute =require("./routes/blog")
const {connect} =require("./db")

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
const cors = require('cors');
const allowedOrigins = [
  'http://localhost:5173',                      // local dev
  'https://astramaan-blog.netlify.app'          // deployed frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
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