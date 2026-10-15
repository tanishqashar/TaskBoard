import React, { useState } from "react";

import Login from "./Login";
import Register from "./Register";
import BoardList from "./BoardList";

function App() {

    const [user, setUser] = useState(null);

    const [showRegister, setShowRegister] = useState(true);

    const [loggedIn, setLoggedIn] = useState(false);


    const handleRegister = (newUser) => {

        setUser(newUser);

        setShowRegister(false);
    };


    const handleLogin = () => {

        setLoggedIn(true);
    };


    if (loggedIn) {
        return <BoardList />;
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
            user={user}
            onLogin={handleLogin}
            onRegister={() => setShowRegister(true)}
        />
    );
}

export default App;