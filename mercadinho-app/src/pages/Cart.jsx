import React, { useContext } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Box, Divider, IconButton, ListItemSecondaryAction } from '@mui/material';
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, addToCart, decreaseQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    clearCart(); // Limpa o carrinho
    navigate('/checkout'); // Navega para a nova página de confirmação
  };

  return (
    <>
      <Navbar />
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Carrinho de Compras
        </Typography>
        {cartItems.length === 0 ? (
          <Typography>Seu carrinho está vazio.</Typography>
        ) : (
          <>
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.id} divider>
                  <ListItemText
                    primary={`${item.name} (x${item.quantity})`}
                    secondary={`Total: R$ ${(item.price * item.quantity).toFixed(2)}`}
                  />
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton size="small" onClick={() => decreaseQuantity(item.id)}>
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ px: 1.5, fontWeight: 'bold' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton size="small" onClick={() => addToCart(item, 1)}>
                        <AddIcon fontSize="small" />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" sx={{ ml: 2 }} onClick={() => removeFromCart(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }}/>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Typography variant="h5">
                Total: R$ {totalPrice.toFixed(2)}
              </Typography>
              <Button variant="contained" color="primary" size="large" onClick={handleCheckout}>
                Finalizar Compra
              </Button>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default Cart;