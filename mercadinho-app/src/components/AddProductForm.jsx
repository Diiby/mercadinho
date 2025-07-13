import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import axios from 'axios';

// AddProductForm = Coleta os dados do novo produto e envia para a API.

const AddProductForm = ({ onProductAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !price || !category || !image) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    const newProduct = {
      name,
      price: parseFloat(price),
      category,
      image,
    };

    try {
      await axios.post('http://localhost:3001/products', newProduct);
      setSuccess('Produto adicionado com sucesso!');
      // Limpa o formulário
      setName('');
      setPrice('');
      setCategory('');
      setImage('');
      // Avisa o componente pai que um produto foi adicionado
      setTimeout(() => {
        onProductAdd();
      }, 1500); 
    } catch (err) {
      setError('Erro ao adicionar o produto.');
    }
  };

  return (
    <Box>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Adicionar Novo Produto
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Nome do Produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Preço (ex: 11.95)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="URL da Imagem"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Cadastrar Produto
        </Button>
      </Box>
    </Box>
  );
};

export default AddProductForm;