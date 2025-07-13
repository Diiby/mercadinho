import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Box, FormControlLabel, Switch, Button, Modal } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import MenuLateral from '../components/MenuLateral';
import AddProductForm from '../components/AddProductForm'; // Assumindo que você criou este arquivo

// Estilo para o Modal (pop-up)
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [editMode, setEditMode] = useState(false);
  
  //Estado para controlar o modal
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:3001/products')
      .then(response => {
        setAllProducts(response.data);
        const uniqueCategories = ['Todos', ...new Set(response.data.map(p => p.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  };

  useEffect(() => {
    if (selectedCategory === 'Todos') {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, allProducts]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setDrawerOpen(false);
  };
  
  const handleProductUpdate = () => {
    fetchProducts();
  };

  return (
    <>
      <Navbar onMenuClick={() => setDrawerOpen(true)} />
      <MenuLateral
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        categories={categories}
        onSelectCategory={handleSelectCategory}
      />
      
      <Container sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            {selectedCategory} 
          </Typography>
          {/* Container para os botões de admin */}
          <Box>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => setOpenAddModal(true)}
              sx={{ mr: 2 }}
            >
              Novo Produto
            </Button>
            <FormControlLabel
              control={<Switch checked={editMode} onChange={(e) => setEditMode(e.target.checked)} />}
              label="Modo de Edição"
            />
          </Box>
        </Box>

        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
              <ProductCard 
                product={product} 
                editMode={editMode}
                onProductUpdate={handleProductUpdate}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/*Modal para adicionar produto */}
      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        aria-labelledby="modal-add-product"
      >
        <Box sx={style}>
          <AddProductForm 
            onProductAdd={() => {
              fetchProducts(); // Recarrega os produtos
              setOpenAddModal(false); // Fecha o modal
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Products;
