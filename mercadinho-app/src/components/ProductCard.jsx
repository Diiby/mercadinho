import React, { useContext, useState, useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

// Recebe do Products.jsx o product(dados do produto)
// editMode (modo de ediçao) e o onProductUpd. (salva ou exclui o produto)
const ProductCard = ({ product, editMode, onProductUpdate }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [editableName, setEditableName] = useState(product.name);
  const [editablePrice, setEditablePrice] = useState(product.price);
  const [editableImage, setEditableImage] = useState(product.image);

  // garante a ediçao dos produtos
  useEffect(() => {
    setEditableName(product.name);
    setEditablePrice(product.price);
    setEditableImage(product.image);
  }, [product]);

  // manda para o carrinho a quantidade
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  // salvar alterações na visao editor
  const handleSaveChanges = () => {
    const newPrice = parseFloat(editablePrice);
    if (!editableName.trim()) {
      alert('O nome do produto não pode ficar em branco.');
      return;
    }
    if (isNaN(newPrice) || newPrice < 0) {
      alert('Por favor, insira um preço válido.');
      return;
    } 

    const updatedProductData = {
      name: editableName,
      price: newPrice,
      image: editableImage,
    };

    axios.patch(`http://localhost:3001/products/${product.id}`, updatedProductData)
      .then(() => {
        alert('Produto atualizado com sucesso!');
        onProductUpdate();
      })
      .catch(() => {
        alert('Erro ao atualizar o produto.');
      });
  };

  // Excluir produto
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir o produto "${product.name}"? Esta ação não pode ser desfeita.`
    );

    if (confirmDelete) {
      axios.delete(`http://localhost:3001/products/${product.id}`)
        .then(() => {
          alert('Produto excluído com sucesso!');
          onProductUpdate();
        })
        .catch(() => {
          alert('Erro ao excluir o produto.');
        });
    }
  };

  // Visão de Edição 
  if (editMode) {
    return (
      <Card sx={{ width: '100%', border: '2px solid', borderColor: 'primary.main', backgroundColor: '#f0f7ff', display: 'flex', flexDirection: 'column' }}>
        <CardMedia component="img" height="140" image={editableImage} alt={editableName} />
        
        <CardContent sx={{ flexGrow: 1, overflowY: 'auto' }}>
          <Stack spacing={1.5}>
            <TextField
              label="Nome do Produto"
              variant="outlined"
              size="small"
              value={editableName}
              onChange={(e) => setEditableName(e.target.value)}
              fullWidth
            />
            <TextField
              label="URL da Imagem"
              variant="outlined"
              size="small"
              value={editableImage}
              onChange={(e) => setEditableImage(e.target.value)}
              fullWidth
            />
            <TextField
              label="Editar Preço"
              variant="outlined"
              size="small"
              type="number"
              value={editablePrice}
              onChange={(e) => setEditablePrice(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              }}
              fullWidth
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-around', py: 1.5, flexShrink: 0 }}>
          <Button 
            variant="contained" 
            startIcon={<SaveIcon />}
            onClick={handleSaveChanges}
          >
            Salvar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteForeverIcon />}
            onClick={handleDelete}
          >
            Excluir
          </Button>
        </CardActions>
      </Card>
    );
  }

  // Visão Cliente 
  return (
    <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: 320 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold' }}>
            {`R$ ${product.price.toFixed(2)}`}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 1 }}>
            <IconButton size="small" onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography sx={{ px: 1, fontWeight: 'bold' }}>{quantity}</Typography>
            <IconButton size="small" onClick={() => setQuantity((prev) => prev + 1)}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button size="medium" variant="contained" onClick={handleAddToCart}>
          Adicionar ao Carrinho
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;