import React from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
} from '@mui/material';

import CategoryIcon from '@mui/icons-material/Category';
import AppleIcon from '@mui/icons-material/Apple';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import IcecreamIcon from '@mui/icons-material/Icecream';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SoapIcon from '@mui/icons-material/Soap';


const MenuLateral = ({ open, onClose, categories, onSelectCategory }) => {

  const categoryIcons = {
    'Todos': <CategoryIcon />,
    'Hortifruti': <AppleIcon/>,
    'Padaria': <BakeryDiningIcon />,
    'Laticínios': <IcecreamIcon />,
    'Frios': <AcUnitIcon />,
    'Açougue': <KebabDiningIcon />,
    'Mercearia': <ShoppingBasketIcon />,
    'Bebidas': <LocalBarIcon />,
    'Limpeza': <CleaningServicesIcon />,
    'Higiene': <SoapIcon />,
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={onClose}
        onKeyDown={onClose}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" component="div">
            Categorias
          </Typography>
        </Box>
        <Divider />
        <List>
          {categories.map((category) => (
            <ListItem key={category} disablePadding>

              {/* Torna clicável. Pega o onSelectCat. que veio do pai e passa para category. 
                  Essa dinâmica  faz o MenuLateral avisar a pagina no Products.jsx */}
              <ListItemButton onClick={() => onSelectCategory(category)}>
                <ListItemIcon>
                  {/* Renderiza o ícone. Se não encontrar, usa um ícone padrão. */}
                  {categoryIcons[category] || <ShoppingBasketIcon />}
                </ListItemIcon>
                <ListItemText primary={category} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default MenuLateral;