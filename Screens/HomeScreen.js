import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, Image } from 'react-native';
import { getProdutos, deleteProduto } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const baseUrl = "https://gerenciamento-de-produtos-backend.onrender.com/api/produtos"

const HomeScreen = () => {
  const [produtos, setProdutos] = useState([]);
  const[image, setImage] = useState('')
  const navigation = useNavigation();

  useEffect(() => {
    fetchProdutos();
  },[]);

  const fetchProdutos = async () => {
    try {
      const data = await getProdutos();
      const imageUrl = `${baseUrl}${data.foto}`;
      setImage(imageUrl);
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

  const confirmEdit = (produto) => {
    Alert.alert(
      'Confirmar edição',
      'Você tem certeza que deseja editar este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Editar',
          onPress: () => navigation.navigate('ProdutosScreen', { produto }),
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
            {item.foto && (
              <Image
                source={{ uri: `${baseUrl}/uploads/${item.foto}` }}
                style={{ width: 100, height: 100 }}
              />
            )}
            <Button title="Editar" onPress={() => confirmEdit(item)} /> 
            <Button title="Deletar" onPress={() => handleDelete(item._id)} />
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;

