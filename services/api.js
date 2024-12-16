import axios from 'axios';

const api = axios.create({
  baseURL: "https://gerenciamento-de-produtos-backend.onrender.com/api/produtos", 
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
    const response = await api.post('/create', produto,{
    headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar produto', error);
    console.log('Body recebido:', req.body);
    console.log('Arquivo recebido:', req.file);
    console.log('Campos obrigatórios:', nome, descricao, quantidade);
    throw error;
  }
};

export const updateProduto = async (id, produto) => {
  try {
    const response = await api.put(`/${id}`, produto,{
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao editar produto', error.response?.data || error.message);
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
