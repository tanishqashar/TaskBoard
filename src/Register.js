import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

function Register({ onRegister, onLogin }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {

        if (name === "" || email === "" || password === "") {
            alert("Please fill all fields");
            return;
        }

        const user = {
            name: name,
            email: email,
            password: password
        };

        onRegister(user);
    };

    return (

        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor: "#f5f7fa",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px"
            }}
        >

            <Paper
                sx={{
                    padding: "35px",
                    width: "100%",
                    maxWidth: "450px"
                }}
            >

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: "10px"
                    }}
                >
                    Create Account
                </Typography>

                <Typography
                    sx={{
                        textAlign: "center",
                        color: "#666",
                        marginBottom: "25px"
                    }}
                >
                    Register to use the Task Management System
                </Typography>


                <Stack spacing={2}>

                    <TextField
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleRegister}
                    >
                        Register
                    </Button>

                    <Button
                        variant="text"
                        onClick={onLogin}
                    >
                        Already have an account? Login
                    </Button>

                </Stack>

            </Paper>

        </Box>
    );
}

export default Register;