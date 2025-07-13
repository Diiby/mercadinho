import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

import { 
    Button, 
    TextField, 
    Typography, 
    Box, 
    Alert, 
    Grid, 
    Link,
    Paper, 
    CssBaseline 
} from '@mui/material';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.get(`http://localhost:3001/users?email=${email}`);
      if (response.data.length > 0 && response.data[0].password === password) {
        localStorage.setItem('auth-token', 'fake-jwt-token');
        navigate('/products');
      } else {
        setError('Email ou senha inválidos.');
      }
    } catch {
      setError('Ocorreu um erro ao tentar fazer login.');
    }
  };

  return (
    // Container Principal que ocupa a tela inteira e tem a imagem de fundo
    <Box
      sx={{
        minHeight: '100vh',      
        backgroundImage: 'url(https://images.pexels.com/photos/20720082/pexels-photo-20720082.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CssBaseline />
      
      
      <Paper 
        elevation={12}
        sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '400px',
            // Efeito de "vidro fosco"
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(4px)',
            borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h4" textAlign="center">
          Login no Mercadinho TemDiTudo
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
          
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Não tem uma conta?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;