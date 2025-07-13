import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Checkout = () => {
  // Gerando um número de pedido 
  const orderNumber = Math.floor(Math.random() * 900000) + 100000;

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Obrigado pela sua compra!
          </Typography>
          <Typography variant="h6" color="text.secondary" align="center">
            Seu pedido foi finalizado com sucesso.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Número do Pedido: <strong>#{orderNumber}</strong>
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              component={RouterLink}
              to="/products"
              variant="contained"
              size="large"
            >
              Continuar Comprando
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Checkout;