import React, { Component } from 'react';
import {Text,View} from 'react-native';

//Como essa página não terá estado e outras funcionalidades,
//Podemos utilizar apenas uma variavel ao inves de uma classe
const Product = () => (
    <Text></Text>
);

Product.navigationOptions = ({ navigation }) => ({
    title: 'TETE'
});

export default Product;