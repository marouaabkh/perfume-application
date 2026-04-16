// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

const db = mysql.createConnection({
  host: "localhost",
  user: "root",      
  password: "maroua2030", 
  database: "perfume_catalog"      
});

db.connect(err => {
  if (err) {
    console.error("MySQL connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// GET all perfumes
app.get("/products", (req, res) => {
  db.query("SELECT * FROM perfumes", (err, results) => {
    if (err) {
      console.error("Error fetching perfumes:", err);
      return res.status(500).send("Database error");
    }
    res.json(results);
  });
});

// POST add a new perfume
app.post("/products", upload.single('perfumeimage'), (req, res) => {
  const { perfumename, description, perfumeprice } = req.body;
  const perfumeimage = req.file ? req.file.filename : null

  if(!perfumename || !description || !perfumeprice || !perfumeimage)
    return res.status(400).send("All fields are required")

  db.query(
    "INSERT INTO perfumes (perfumename, description, perfumeprice, perfumeimage) VALUES (?, ?, ?, ?)",
    [perfumename, description, perfumeprice, perfumeimage],
    (err, result) => {
      if (err) {
        console.error("Error adding perfume:", err);
        return res.status(500).send("Database error");
      }
      res.json({ message: "Perfume added!", id: result.insertId })
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});