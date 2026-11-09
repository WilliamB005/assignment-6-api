import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

// --- 1. ESSENTIAL MIDDLEWARE (MUST BE AT THE TOP) ---
app.use(express.json()); // Parses incoming JSON bodies into req.body
app.use(cors());         // Enables Cross-Origin Resource Sharing

// --- 2. DATABASE CONNECTION ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('Database connection error:', err));

// --- 3. MONGOOSE SCHEMA & MODEL ---
const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'], 
    trim: true, 
    maxlength: [60, 'Title cannot exceed 60 characters'] 
  },
  completed: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

// --- 4. RESTful CRUD ROUTES ---

// GET /api/tasks - List all items
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching tasks' });
  }
});

// GET /api/tasks/:id - Get a single item by ID
app.get('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Invalid task ID format' });
  }
});

// POST /api/tasks - Create a new item
app.post('/api/tasks', async (req, res) => {
  try {
    const { title, completed } = req.body;
    
    // Validation check for required text
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = new Task({ title: title.trim(), completed });
    await newTask.save();
    
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/tasks/:id - Update an item partially
app.patch('/api/tasks/:id', async (req, res) => {
  try {
    const updates = req.body;
    
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,         // Return the updated document
      runValidators: true // Enforce schema rules during update
    });

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/tasks/:id - Delete an item
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    // 204 No Content means success with no response body
    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({ error: 'Invalid task ID format' });
  }
});

// --- 5. CATCH-ALL 404 MIDDLEWARE ---
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// --- 6. START SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});