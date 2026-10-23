
import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import Board from "./Board";

function BoardList({ user, onLogout }) {
    const [boards, setBoards] = useState([]);
    const [value, setValue] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const fetchBoards = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/boards",
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Could not load boards");
            }

            setBoards(data);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, []);

    const handleCreateBoard = async () => {
        if (!value.trim()) {
            alert("Please enter board name");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/api/boards",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    },
                    body: JSON.stringify({
                        name: value.trim()
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Could not create board");
            }

            setValue("");
            await fetchBoards();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteBoard = async (board) => {
        if (!window.confirm(`Delete "${board.name}"?`)) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/boards/${board.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Could not delete board");
            }

            await fetchBoards();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleEditBoard = (index) => {
        setEditIndex(index);
        setValue(boards[index].name);
    };

    const handleUpdateBoard = async () => {
        if (!value.trim()) {
            alert("Please enter board name");
            return;
        }

        const board = boards[editIndex];

        try {
            const response = await fetch(
                `http://localhost:5000/api/boards/${board.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    },
                    body: JSON.stringify({
                        name: value.trim()
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Could not rename board");
            }

            setEditIndex(null);
            setValue("");
            await fetchBoards();
        } catch (error) {
            alert(error.message);
        }
    };

    if (selectedBoard !== null) {
        return (
            <Board
                board={selectedBoard}
                onBack={() => setSelectedBoard(null)}
            />
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f5f7fa",
                padding: "40px 20px"
            }}
        >
            <Box sx={{ maxWidth: "900px", margin: "0 auto" }}>
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={2}
                    sx={{ marginBottom: "20px" }}
                >
                    <Typography sx={{ color: "#666" }}>
                        {user?.name || user?.email || ""}
                    </Typography>

                    <Button variant="outlined" onClick={onLogout}>
                        Logout
                    </Button>
                </Stack>

                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: "10px"
                    }}
                >
                    My Boards
                </Typography>

                <Typography
                    sx={{
                        textAlign: "center",
                        color: "#666",
                        marginBottom: "35px"
                    }}
                >
                    Create and manage your task boards
                </Typography>

                <Paper sx={{ padding: "25px", marginBottom: "30px" }}>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: "bold", marginBottom: "20px" }}
                    >
                        {editIndex === null ? "Create New Board" : "Rename Board"}
                    </Typography>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                    >
                        <TextField
                            fullWidth
                            label="Board Name"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />

                        <Button
                            variant="contained"
                            onClick={
                                editIndex === null
                                    ? handleCreateBoard
                                    : handleUpdateBoard
                            }
                            sx={{ minWidth: "150px" }}
                        >
                            {editIndex === null ? "Create Board" : "Update Board"}
                        </Button>

                        {editIndex !== null && (
                            <Button
                                variant="text"
                                onClick={() => {
                                    setEditIndex(null);
                                    setValue("");
                                }}
                            >
                                Cancel
                            </Button>
                        )}
                    </Stack>
                </Paper>

                <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", marginBottom: "15px" }}
                >
                    Your Boards
                </Typography>

                {loading ? (
                    <Paper sx={{ padding: "40px", textAlign: "center" }}>
                        <Typography>Loading boards...</Typography>
                    </Paper>
                ) : boards.length === 0 ? (
                    <Paper sx={{ padding: "40px", textAlign: "center" }}>
                        <Typography sx={{ color: "#888" }}>
                            No boards created yet.
                        </Typography>
                    </Paper>
                ) : (
                    <Stack spacing={2}>
                        {boards.map((board, index) => (
                            <Paper key={board.id} sx={{ padding: "20px" }}>
                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    spacing={2}
                                    alignItems={{ xs: "stretch", sm: "center" }}
                                    justifyContent="space-between"
                                >
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: "bold" }}
                                        >
                                            {board.name}
                                        </Typography>

                                        {board.description && (
                                            <Typography
                                                sx={{ color: "#777", marginTop: "4px" }}
                                            >
                                                {board.description}
                                            </Typography>
                                        )}
                                    </Box>

                                    <Stack direction="row" spacing={1}>
                                        <Button
                                            variant="contained"
                                            onClick={() => setSelectedBoard(board)}
                                        >
                                            Open
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                console.log("Rename clicked:", board);
                                                handleEditBoard(index);
                                            }}
                                        >
                                            Rename
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDeleteBoard(board)}
                                        >
                                            Delete
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Paper>
                        ))}
                    </Stack>
                )}
            </Box>
        </Box>
    );
}

export default BoardList;
