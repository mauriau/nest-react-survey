import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/auth/useLogin.ts";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    setError("");
    try {
      const { data } = await useLogin(username, password);
      const decodedToken = JSON.parse(atob(data.access_token.split(".")[1]));
      const roles = decodedToken.roles;
      let route = "/surveys";
      if (roles === "admin") {
        route = "/admin/survey";
      }
      navigate(route);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleLogin}
          >
            Se connecter
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
