import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Container, Typography, Box, Alert, Link } from '@mui/material';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    //Validação formato email
    const emailRegex = /\S+@\S+\.\S+/; // Expressão simples para validar email
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um formato de e-mail válido.');
      return;
    }
    // FIM DA VALIDAÇÃO 

    try {
      //  Verificar se o e-mail já existe
      const existingUser = await axios.get(`http://localhost:3001/users?email=${email}`);
      if (existingUser.data.length > 0) {
        setError('Este endereço de e-mail já está em uso.');
        return;
      }

      // Se não existir, cria o novo usuário (faz o POST)
      const newUser = { name, email, password };
      await axios.post('http://localhost:3001/users', newUser);

      // Exibe mensagem de sucesso e redireciona para o login após um tempo
      setSuccess('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      setTimeout(() => {
        navigate('/');
      }, 3000); // Redireciona após 3 segundos

    } catch (err) {
      setError('Ocorreu um erro ao tentar cadastrar. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Criar Conta
        </Typography>
        <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome Completo"
            name="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de Email"
            name="email"
            autoComplete="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!!success}
          >
            Cadastrar
          </Button>
          <Box textAlign='center'>
            
            <Link component={RouterLink} to="/" variant="body2">
              {"Já tem uma conta? Faça Login"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;