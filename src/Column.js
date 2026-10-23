import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Task from "./Task";

function Column({
    column,
    columnId,
    tasks,
    onEditTask,
    onDeleteTask
}) {

    const columnTasks = tasks.filter(
        (task) => task.column_id === columnId
    );

    return (

        <Box>

            <Typography
                variant="h6"
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "20px"
                }}
            >
                {column}
            </Typography>


            <Box>

                {columnTasks.length === 0 ? (

                    <Typography
                        sx={{
                            textAlign: "center",
                            color: "#888",
                            marginTop: "30px"
                        }}
                    >
                        No tasks
                    </Typography>

                ) : (

                    columnTasks.map((task, index) => (

                        <Task
                            key={index}
                            task={task}
                            onEdit={(updatedTask) =>
                                onEditTask(task.id, updatedTask)
                            }
                            onDelete={() =>
                                onDeleteTask(task.id)
                            }
                        />

                    ))

                )}

            </Box>

        </Box>
    );
}

export default Column;