import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Paper, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");
        try {
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error("Identifiants incorrects");
            }

            const data = await response.json();
            localStorage.setItem("token", data.access_token	);

            const decodedToken = JSON.parse(atob(data.access_token	.split(".")[1]));
            const roles = decodedToken.roles;
            console.log(roles === "admin")

            if (roles === "admin") {
                navigate("/admin/survey");
            } else {
                navigate("/surveys");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <Paper elevation={6} sx={{ p: 5, width: "100%", maxWidth: 400, textAlign: "center", borderRadius: 2 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Connexion
                </Typography>
                <Typography variant="body1" color="textSecondary" mb={3}>
                    Entrez vos identifiants pour accéder à votre compte
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <Box component="form" display="flex" flexDirection="column" gap={3}>
                    <TextField
                        label="username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Mot de passe"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" fullWidth size="large" onClick={handleLogin}>
                        Se connecter
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
