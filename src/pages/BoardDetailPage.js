// src/pages/BoardDetailPage.js
import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import API from "../api/axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const BoardDetailPage = () => {
  const { boardId } = useParams();
  const { auth } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/board/${boardId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [boardId]);

  const handleCreateTask = async () => {
    try {
      const res = await API.post(
        "/tasks",
        { ...newTask, board: boardId },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      setTasks([...tasks, res.data]);
      setNewTask({ title: "", description: "" });
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const handleToggle = async (taskId, done) => {
    try {
      await API.put(
        `/tasks/${taskId}`,
        { done: !done },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      fetchTasks(); // Refresh
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      fetchTasks(); // Refresh
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        🧩 Board: {boardId}
      </Typography>

      {/* New Task Form */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          label="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <TextField
          label="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <Button variant="contained" onClick={handleCreateTask}>
          Add Task
        </Button>
      </Box>

      {/* Task List */}
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task._id}
            secondaryAction={
              <IconButton onClick={() => handleDelete(task._id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <Checkbox
              checked={task.done}
              onChange={() => handleToggle(task._id, task.done)}
            />
            <ListItemText
              primary={task.title}
              secondary={task.description}
              sx={{
                textDecoration: task.done ? "line-through" : "none",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default BoardDetailPage;
