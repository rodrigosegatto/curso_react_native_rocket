import React, { Component } from 'react';
import { View, Text } from 'react-native';
import api from '../services/api';

export default class Main extends Component {
    //React fica sempre ouvindo as alterações no estado.
    //Quando ocorrem mudanças ele renderiza a página automaticamente de novo.
    state = {
        docs: []
    };

    //Disparado automaticamente ao carregar a tela
    componentDidMount() {
        this.loadProducts();
    }

    //Function que consulta a API de produtos
    loadProducts = async () => {
        const response = await api.get('/products');
        const {docs} = response.data;

        //adiciona os produtos ao estado
        this.setState({docs});
    };
    
    render () { 
        return (
            <View>
                <Text>Página Main</Text>
                {this.state.docs.map(product => (
                    <Text key={product._id}>{product.title}</Text>
                ))}
            </View>
        );
    }
}