import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';

export default class Main extends Component {
    //React fica sempre ouvindo as alterações no estado.
    //Quando ocorrem mudanças ele renderiza a página automaticamente de novo.
    state = {
        productInfo: {},
        docs: [],
        page: 1
    };

    //Disparado automaticamente ao carregar a tela
    componentDidMount() {
        this.loadProducts();
    }

    //Function que consulta a API de produtos
    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const {docs, ...productInfo} = response.data;

        //adiciona os produtos ao estado
        //o 'docs' diferenciado é por que estams unindo dois arrays
        this.setState({
            docs: [...this.state.docs, ...docs], 
            productInfo,
            page
        });
    };

    loadMore = () => {
        const {page, productInfo} = this.state;
        
        //Se a pagina igual ao total de paginas nao faz nada
        if (page === productInfo.pages) return;

        //DO contrário soma uma pagina e carrega mais
        const pageNumber = page +1;

        this.loadProducts(pageNumber);
    };

    //Chamado pela Flatlist do render() que 
    //passara para 'item' o exato item percorrido
    renderItem = ({item}) => (
        <View style={styles.productContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            
            <TouchableOpacity 
                style={styles.productButton} 
                onPress={() => {
                    this.props.navigation.navigate('Product', {product: item});
                }} >
                <Text style={styles.productButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    );
    
    render () { 
        return (
            <View style={styles.container}>
                <FlatList 
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={item => item._id}
                    renderItem={this.renderItem}
                    onEndReached={this.loadMore} //Disparada ao chegar no fim da lista
                    onEndReachedThreshold={0.3} //Dispara quando chegar a 30% do final da lista
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FAFAFA",
        flex: 1
    },
    list: {
        padding: 20
    },
    productContainer: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 5,
        padding: 20,
        marginBottom: 20
    },
    productTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333"
    },
    productDescription: {
        fontSize: 16,
        color: "#999",
        marginTop: 5,
        lineHeight: 24
    },
    productButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#DA552F",
        backgroundColor: 'transparent',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    productButtonText: {
        fontSize: 16,
        color: "#DA552F",
        fontWeight: 'bold'
    }
});