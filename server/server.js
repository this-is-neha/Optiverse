const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3001;
const cors = require("cors");

const allowedOrigins = [
  "https://optiverse.netlify.app", 
  "http://localhost:5173", 
];

app.use(cors({
  origin: function(origin, callback) {
   
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); 

let todos = [];


app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (todo) res.json(todo);
  else res.status(404).json({ message: "Todo not found" });
});


app.post("/todos", upload.single("image"), (req, res) => {
  const { title, description, status } = req.body;

  // 🔒 Validation
  if (!title || !description || !status || !req.file) {
    return res.status(400).json({
      message: "All fields (title, description, status, image) are required",
    });
  }

  const newTodo = {
    id: todos.length + 1,
    title: title.trim(),
    description: description.trim(),
    image: `/uploads/${req.file.filename}`,
    status,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", upload.single("image"), (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (todo) {
    const { title, description, status } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : todo.image;

    todo.title = title !== undefined ? title : todo.title;
    todo.description = description !== undefined ? description : todo.description;
    todo.status = status !== undefined ? status : todo.status;
    todo.image = image;

    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});


app.delete("/todos/:id", (req, res) => {
  todos = todos.filter((t) => t.id !== parseInt(req.params.id));
  res.json({ message: "Todo deleted" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
