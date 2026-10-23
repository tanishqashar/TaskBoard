
import React, { useState } from "react";

import Login from "./Login";
import Register from "./Register";
import BoardList from "./BoardList";

function App() {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loggedIn, setLoggedIn] = useState(() => {
        return Boolean(localStorage.getItem("token"));
    });

    const [showRegister, setShowRegister] = useState(false);

    const handleRegister = (newUser) => {
        setUser(newUser);
        setShowRegister(false);
    };

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
        setLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setLoggedIn(false);
        setShowRegister(false);
    };

    if (loggedIn) {
        return (
            <BoardList
                user={user}
                onLogout={handleLogout}
            />
        );
    }

    if (showRegister) {
        return (
            <Register
                onRegister={handleRegister}
                onLogin={() => setShowRegister(false)}
            />
        );
    }

    return (
        <Login
            onLogin={handleLogin}
            onRegister={() => setShowRegister(true)}
        />
    );
}

export default App;
