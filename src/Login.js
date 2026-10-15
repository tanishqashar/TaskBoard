import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

function Login({ user, onLogin, onRegister }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {

        if (email === "" || password === "") {
            alert("Please enter email and password");
            return;
        }

        if (
            email === user.email &&
            password === user.password
        ) {
            onLogin();
        } else {
            alert("Incorrect email or password");
        }
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
                    Login
                </Typography>

                <Typography
                    sx={{
                        textAlign: "center",
                        color: "#666",
                        marginBottom: "25px"
                    }}
                >
                    Login to your Task Management System
                </Typography>


                <Stack spacing={2}>

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
                        onClick={handleLogin}
                    >
                        Login
                    </Button>

                    <Button
                        variant="text"
                        onClick={onRegister}
                    >
                        Don't have an account? Register
                    </Button>

                </Stack>

            </Paper>

        </Box>
    );
}

export default Login;