import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 
import { createProduto, updateProduto } from '../services/api';

const ProdutosScreen = ({ route, navigation }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [foto, setFoto] = useState(null); // Para armazenar a URI da imagem
  const [produtoId, setProdutoId] = useState(null);

  useEffect(() => {
    if (route.params?.produto) {
      const { _id,nome, descricao, quantidade, foto } = route.params.produto;
      setProdutoId(_id);
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      quality: 1, 
    });

    // Verifica se o usuário cancelou ou selecionou uma imagem
    if (!result.canceled) {
      setFoto(result.assets[0].uri); 
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('quantidade', parseInt(quantidade));

    if (foto && !foto.startsWith('http')) {

      const localUri = foto.replace('', '');
      const filename = localUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1].toLowerCase()}` : 'image/jpeg';


      formData.append('foto', {
        uri: localUri, 
        type,
        name: filename, 
      });
    }

    try {
      if (produtoId) {
        await updateProduto(produtoId, formData);
      } else {
        await createProduto(formData);
        console.log(nome,descricao,quantidade,foto);
      }
      navigation.goBack();
    } catch (error) {
      console.log(nome,descricao,quantidade,foto);
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
      {foto && <Image source={{ uri: foto.startsWith('http') ? foto:foto}} style={{ width: 200, height: 200, marginTop: 10 }} />}

      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
};

export default ProdutosScreen;


