import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu'; // 1. Importe o ícone de Menu
import { CartContext } from '../context/CartContext';

//  Recebe a propriedade onMenuClick - Comunicação Products(pai) para aqui
const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  // o useContext Conecta o CartContext a esse
  const { cartItems } = useContext(CartContext); 
  // Dirá o n° de itens no carrinho
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // o handleLogout é onde desloga o usuario
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/'); // manda pro inicio
  };

  return (
    <AppBar position="static">
      <Toolbar>
        
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onMenuClick} // Chama a função recebida por props
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component={Link} to="/products" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          Mercadinho TemDiTudo
        </Typography>
        <IconButton component={Link} to="/cart" color="inherit">
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Button color="inherit" onClick={handleLogout}>
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;