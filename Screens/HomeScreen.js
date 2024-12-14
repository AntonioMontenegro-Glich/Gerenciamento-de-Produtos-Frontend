import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import { getProdutos, deleteProduto } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [produtos, setProdutos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProdutos();
  });

  const fetchProdutos = async () => {
    try {
      const data = await getProdutos();
      setProdutos(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os produtos');
    }
  };

const handleDelete = (id) => {
  Alert.alert(
    'Confirmar exclusão',
    'Você tem certeza que deseja deletar este produto?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Deletar',
        onPress: async () => {
          try {
            await deleteProduto(id);
            fetchProdutos();
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível deletar o produto');
          }
        },
      },
    ]
  );
};


  return (
    <View>
      <Button title="Adicionar Produto" onPress={() => navigation.navigate('ProdutosScreen')} />
      <FlatList
        data={produtos}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nome}</Text>
            <Text>{item.descricao}</Text>
            <Text>{item.quantidade}</Text>
            <Button title="Editar" onPress={() => navigation.navigate('ProdutosScreen', { produto: item })} />
            <Button title="Deletar" onPress={() => handleDelete(item._id)} />
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
