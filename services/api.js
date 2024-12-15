import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gerenciamento-de-produtos-backend.onrender.com/api/produtos', 
});

export const getProdutos = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos', error);
    throw error;
  }
};

export const createProduto = async (produto) => {
  try {
    const response = await api.post('/create', produto);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar produto', error);
    throw error;
  }
};

export const updateProduto = async (id, produto) => {
  try {
    const response = await api.put(`/${id}`, produto);
    return response.data;
  } catch (error) {
    console.error('Erro ao editar produto', error);
    throw error;
  }
};

export const deleteProduto = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar produto', error);
    throw error;
  }
};
