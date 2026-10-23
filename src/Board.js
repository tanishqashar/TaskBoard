import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import Column from "./Column";

function Board({ board, onBack }) {

    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");
    const [assignee, setAssignee] = useState("");
    const [taskColumn, setTaskColumn] = useState("To Do");
    const [search, setSearch] = useState("");
    const [columns, setColumns] = useState([]);


    
    
    const fetchBoardData = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/api/boards/${board.id}`,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            ); 

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Could not load board");
            }

            setColumns(data.columns);
            setTasks(data.tasks);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchBoardData();
    }, [board.id]);

    
const handleAddTask = async () => {
    if (taskTitle.trim() === "") {
        alert("Please enter task title");
        return;
    }

    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:5000/api/boards/${board.id}/tasks`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify({
                    title: taskTitle.trim(),
                    description: taskDescription,
                    priority: priority,
                    due_date: dueDate || null,
                    assignee_id: assignee ? Number(assignee) : null,
                    column_id: columns.find(
                        (column) => column.name === taskColumn
                    )?.id
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Could not save task");
        }

        await fetchBoardData();

        setTaskTitle("");
        setTaskDescription("");
        setPriority("Medium");
        setDueDate("");
        setAssignee("");
        setTaskColumn("To Do");
    } catch (error) {
        alert(error.message);
    }
};

    
const handleEditTask = async (taskId, updatedTask) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:5000/api/boards/${board.id}/tasks/${taskId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify(updatedTask)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Could not update task");
        }

        await fetchBoardData();
    } catch (error) {
        alert(error.message);
    }
};

 
const handleDeleteTask = async (taskId) => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:5000/api/boards/${board.id}/tasks/${taskId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Could not delete task");
        }

        await fetchBoardData();
    } catch (error) {
        alert(error.message);
    }
};


    const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f5f7fa",
                padding: "30px"
            }}
        >

            <Box
                sx={{
                    maxWidth: "1200px",
                    margin: "0 auto"
                }}
            >

                {/* Back Button */}

                <Button
                    variant="outlined"
                    onClick={onBack}
                    sx={{ marginBottom: "20px" }}
                >
                    Back to Boards
                </Button>


                {/* Board Name */}

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        marginBottom: "20px"
                    }}
                >
                    {board.name}
                </Typography>


                {/* Search */}

                <Paper
                    sx={{
                        padding: "20px",
                        marginBottom: "25px"
                    }}
                >

                    <TextField
                        fullWidth
                        label="Search Tasks"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </Paper>


                {/* Add Task */}

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
                        Add New Task
                    </Typography>


                    <Stack spacing={2}>

                        {/* Task Title */}

                        <TextField
                            fullWidth
                            label="Task Title"
                            value={taskTitle}
                            onChange={(e) =>
                                setTaskTitle(e.target.value)
                            }
                        />


                        {/* Description */}

                        <TextField
                            fullWidth
                            label="Description"
                            multiline
                            rows={3}
                            value={taskDescription}
                            onChange={(e) =>
                                setTaskDescription(e.target.value)
                            }
                        />


                        {/* Priority + Due Date */}

                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={2}
                        >

                            <FormControl fullWidth>

                                <InputLabel>
                                    Priority
                                </InputLabel>

                                <Select
                                    value={priority}
                                    label="Priority"
                                    onChange={(e) =>
                                        setPriority(e.target.value)
                                    }
                                >

                                    <MenuItem value="Low">
                                        Low
                                    </MenuItem>

                                    <MenuItem value="Medium">
                                        Medium
                                    </MenuItem>

                                    <MenuItem value="High">
                                        High
                                    </MenuItem>

                                </Select>

                            </FormControl>


                            {/* Due Date */}

                            <Box sx={{ width: "100%" }}>

                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        marginBottom: "6px",
                                        color: "#555"
                                    }}
                                >
                                    Due Date
                                </Typography>

                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) =>
                                        setDueDate(e.target.value)
                                    }
                                    min="2020-01-01"
                                    max="9999-12-31"
                                    style={{
                                        width: "100%",
                                        height: "56px",
                                        boxSizing: "border-box",
                                        padding: "0 14px",
                                        fontSize: "16px",
                                        border: "1px solid #c4c4c4",
                                        borderRadius: "4px",
                                        backgroundColor: "white"
                                    }}
                                />

                            </Box>

                        </Stack>


                        {/* Assignee */}

                        <TextField
                            fullWidth
                            label="Assignee"
                            value={assignee}
                            onChange={(e) =>
                                setAssignee(e.target.value)
                            }
                        />


                        {/* Category */}

                        <FormControl fullWidth>

                            <InputLabel>
                                Category
                            </InputLabel>

                            <Select
                                value={taskColumn}
                                label="Category"
                                onChange={(e) =>
                                    setTaskColumn(e.target.value)
                                }
                            >

                                <MenuItem value="To Do">
                                    To Do
                                </MenuItem>

                                <MenuItem value="In Progress">
                                    In Progress
                                </MenuItem>

                                <MenuItem value="Done">
                                    Done
                                </MenuItem>

                            </Select>

                        </FormControl>


                        {/* Add Task */}

                        <Box>

                            <Button
                                variant="contained"
                                onClick={handleAddTask}
                                size="large"
                            >
                                Add Task
                            </Button>

                        </Box>

                    </Stack>

                </Paper>


                {/* Columns */}

                <Stack
                    direction={{
                        xs: "column",
                        md: "row"
                    }}
                    spacing={2}
                    alignItems="stretch"
                >

                    {columns.map((column) => (

                        <Paper
                            key={column.id}
                            sx={{
                                padding: "20px",
                                flex: 1,
                                minHeight: "300px"
                            }}
                        >

                            <Column
                                column={column.name}
                                columnId={column.id}
                                tasks={filteredTasks}
                                onEditTask={handleEditTask}
                                onDeleteTask={handleDeleteTask}
                            />

                        </Paper>

                    ))}

                </Stack>

            </Box>

        </Box>
    );
}

export default Board;