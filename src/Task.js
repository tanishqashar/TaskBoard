import React, { useState } from "react";

function Task({ task, onEdit, onDelete }) {

    const [editing, setEditing] = useState(false);

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [dueDate, setDueDate] = useState(task.dueDate);
    const [assignee, setAssignee] = useState(task.assignee);
    const [column, setColumn] = useState(task.column);

    const handleUpdate = () => {

        const updatedTask = {
            title: title,
            description: description,
            priority: priority,
            dueDate: dueDate,
            assignee: assignee,
            column: column
        };

        onEdit(updatedTask);
        setEditing(false);
    };

    return (
        <div>

            {editing ? (

                <div>

                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <br />

                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <br />

                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>

                    <br />

                    <label>Due Date: </label>

                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />

                    <br />

                    <input
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                    />

                    <br />

                    <label>Category: </label>

                    <select
                        value={column}
                        onChange={(e) => setColumn(e.target.value)}
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>

                    <br />

                    <button onClick={handleUpdate}>
                        Update
                    </button>

                    <button onClick={() => setEditing(false)}>
                        Cancel
                    </button>

                </div>

            ) : (

                <div>

                    <h4>{task.title}</h4>

                    <p>{task.description}</p>

                    <p>Priority: {task.priority}</p>

                    <p>Due Date: {task.dueDate}</p>

                    <p>Assignee: {task.assignee}</p>

                    <button onClick={() => setEditing(true)}>
                        Edit
                    </button>

                    <button onClick={onDelete}>
                        Delete
                    </button>

                </div>
            )}

        </div>
    );
}

export default Task;