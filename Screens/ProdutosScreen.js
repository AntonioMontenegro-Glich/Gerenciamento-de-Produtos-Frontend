import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Importa o seletor de imagens do Expo
import { createProduto, updateProduto } from '../services/api';

const ProdutosScreen = ({ route, navigation }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [foto, setFoto] = useState(null); // Para armazenar a URI da imagem

  useEffect(() => {
    if (route.params?.produto) {
      const { nome, descricao, quantidade, foto } = route.params.produto;
      setNome(nome);
      setDescricao(descricao);
      setQuantidade(quantidade.toString());
      setFoto(foto);
    }
  }, [route.params]);

  const pickImage = async () => {
    // Solicitar permissão para acessar a galeria
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permissão Negada', 'É necessário permitir o acesso à galeria para selecionar uma imagem.');
      return;
    }

    // Abrir a galeria para selecionar uma imagem
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Apenas imagens
      quality: 1, // Qualidade máxima
    });

    // Verifica se o usuário cancelou ou selecionou uma imagem
    if (!result.canceled) {
      setFoto(result.assets[0].uri); // Armazena a URI da imagem
    }
  };

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

      {/* Botão para selecionar uma foto */}
      <Button title="Selecionar Foto" onPress={pickImage} />
      
      {/* Pré-visualização da foto selecionada */}
      {foto && <Image source={{ uri: foto }} style={{ width: 200, height: 200, marginTop: 10 }} />}

      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
};

export default ProdutosScreen;


