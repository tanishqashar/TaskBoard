import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import Board from "./Board";

function BoardList() {

    const [boards, setBoards] = useState([]);

    const [value, setValue] = useState("");

    const [editIndex, setEditIndex] = useState(null);

    const [selectedBoard, setSelectedBoard] = useState("");

    const handleCreateBoard = () => {

        if (value === "") {
            alert("Please enter board name");
            return;
        }

        setBoards([...boards, value]);

        setValue("");
    };


    const handleDeleteBoard = (index) => {

        const newBoards = [...boards];

        newBoards.splice(index, 1);

        setBoards(newBoards);
    };


    const handleEditBoard = (index) => {

        setEditIndex(index);

        setValue(boards[index]);
    };


    const handleUpdateBoard = () => {

        const newBoards = [...boards];

        newBoards[editIndex] = value;

        setBoards(newBoards);

        setEditIndex(null);

        setValue("");
    };


    if (selectedBoard !== "") {

        return (
            <Board
                board={selectedBoard}
                onBack={() => setSelectedBoard("")}
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

            <Box
                sx={{
                    maxWidth: "900px",
                    margin: "0 auto"
                }}
            >

                {/* Page Heading */}

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


                {/* Create Board */}

                <Paper
                    sx={{
                        padding: "25px",
                        marginBottom: "30px"
                    }}
                >

                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "bold",
                            marginBottom: "20px"
                        }}
                    >
                        Create New Board
                    </Typography>


                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row"
                        }}
                        spacing={2}
                    >

                        <TextField
                            fullWidth
                            label="Board Name"
                            value={value}
                            onChange={(e) =>
                                setValue(e.target.value)
                            }
                        />


                        <Button
                            variant="contained"
                            onClick={
                                editIndex === null
                                    ? handleCreateBoard
                                    : handleUpdateBoard
                            }
                            sx={{
                                minWidth: "150px"
                            }}
                        >

                            {editIndex === null
                                ? "Create Board"
                                : "Update Board"}

                        </Button>

                    </Stack>

                </Paper>


                {/* Board List */}

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",
                        marginBottom: "15px"
                    }}
                >
                    Your Boards
                </Typography>


                {boards.length === 0 ? (

                    <Paper
                        sx={{
                            padding: "40px",
                            textAlign: "center"
                        }}
                    >

                        <Typography
                            sx={{
                                color: "#888"
                            }}
                        >
                            No boards created yet.
                        </Typography>

                    </Paper>

                ) : (

                    <Stack spacing={2}>

                        {boards.map((board, index) => (

                            <Paper
                                key={index}
                                sx={{
                                    padding: "20px"
                                }}
                            >

                                <Stack
                                    direction={{
                                        xs: "column",
                                        sm: "row"
                                    }}
                                    spacing={2}
                                    alignItems={{
                                        xs: "stretch",
                                        sm: "center"
                                    }}
                                    justifyContent="space-between"
                                >

                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {board}
                                    </Typography>


                                    <Stack
                                        direction="row"
                                        spacing={1}
                                    >

                                        <Button
                                            variant="contained"
                                            onClick={() =>
                                                setSelectedBoard(board)
                                            }
                                        >
                                            Open
                                        </Button>


                                        <Button
                                            variant="outlined"
                                            onClick={() =>
                                                handleEditBoard(index)
                                            }
                                        >
                                            Rename
                                        </Button>


                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() =>
                                                handleDeleteBoard(index)
                                            }
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