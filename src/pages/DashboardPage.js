// src/pages/DashboardPage.js
import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { auth, logout } = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  const [newBoard, setNewBoard] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const fetchBoards = async () => {
    try {
      const res = await API.get("/boards", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setBoards(res.data);
    } catch (err) {
      console.error("Error fetching boards:", err);
    }
  };

  useEffect(() => {
    if (!auth.token) return navigate("/login");
    fetchBoards();
  }, [auth, navigate]);

  const handleCreateBoard = async () => {
    try {
      const res = await API.post("/boards", newBoard, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setBoards([...boards, res.data]);
      setNewBoard({ title: "", description: "" });
    } catch (err) {
      console.error("Error creating board:", err);
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">📋 Your Boards</Typography>
        <Button onClick={logout} color="error">
          Logout
        </Button>
      </Box>

      {/* Create Board Form */}
      <Box mt={3} mb={5}>
        <TextField
          label="Title"
          name="title"
          value={newBoard.title}
          onChange={(e) => setNewBoard({ ...newBoard, title: e.target.value })}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Description"
          name="description"
          value={newBoard.description}
          onChange={(e) =>
            setNewBoard({ ...newBoard, description: e.target.value })
          }
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleCreateBoard}>
          Create
        </Button>
      </Box>

      {/* Boards List */}
      <Grid container spacing={2}>
        {boards.map((board) => (
          <Grid item xs={12} sm={6} md={4} key={board._id}>
            <Card>
              <CardContent>
                <Button onClick={() => navigate(`/board/${board._id}`)}>
                  View Tasks
                </Button>
                <Typography variant="h6">{board.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {board.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DashboardPage;
