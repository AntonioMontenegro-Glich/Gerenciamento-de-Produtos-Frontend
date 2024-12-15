import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, Image, StyleSheet } from 'react-native';
import { getProdutos, deleteProduto } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const baseUrl = "https://gerenciamento-de-produtos-backend.onrender.com/api/produtos"

const HomeScreen = () => {
  const [produtos, setProdutos] = useState([]);
  const[image, setImage] = useState('')
  const navigation = useNavigation();

  useEffect(() => {
    fetchProdutos();
  });

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
      {/* Adicionando o título em duas linhas */}
      <View style={styles.header}>
        <Text style={styles.title}>Estoque de Produtos</Text>
        <Text style={styles.subtitle}>Supermercado</Text>
      </View>
      <Button title="Adicionar Produto" onPress={() => navigation.navigate('ProdutosScreen')} />
      <FlatList
        data={produtos}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
           <View style={styles.card}>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Nome:</Text>
              <Text style={styles.value}>{item.nome}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Descrição:</Text>
              <Text style={styles.value}>{item.descricao}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Quantidade:</Text>
              <Text style={styles.value}>{item.quantidade}</Text>
            </View>
            {item.foto && (
              <Image
                source={{ uri: `https://gerenciamento-de-produtos-backend.onrender.com${item.foto}` }}
                style={{ width: 200, height: 200 }}
                resizeMode="contain"
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

const styles = StyleSheet.create({
  header: {
    alignItems: 'center', 
    marginVertical: 15, 
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
  },
  subtitle: {
    fontSize: 20, 
    fontWeight: 'bold', 
  },
    card: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
   infoBox: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  spacer: {
    width: 10,
  },
});
export default HomeScreen;

