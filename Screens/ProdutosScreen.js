import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { createProduto, updateProduto } from '../services/api';

const ProdutosScreen = ({ route, navigation }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [foto, setFoto] = useState('');

  useEffect(() => {
    if (route.params?.produto) {
      const { nome, descricao, quantidade, foto } = route.params.produto;
      setNome(nome);
      setDescricao(descricao);
      setQuantidade(quantidade.toString());
      setFoto(foto);
    }
  }, [route.params]);

  const handleSubmit = async () => {
    const produto = { nome, descricao, quantidade, foto };

    try {
      if (route.params?.produto) {
        await updateProduto(route.params.produto._id, produto);
      } else {
        await createProduto(produto);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o produto');
    }
  };

  return (
    <View>
      <Text>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} />
      <Text>Descrição</Text>
      <TextInput value={descricao} onChangeText={setDescricao} />
      <Text>Quantidade</Text>
      <TextInput value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" />
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
};

export default ProdutosScreen;
