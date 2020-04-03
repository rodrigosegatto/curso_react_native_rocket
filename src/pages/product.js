import React, { Component } from 'react';
import {WebView} from 'react-native-webview';

export default class Product extends Component {
    render(){
        //console.log(this.props.route.params.product.title);

        //Retorna o acesso a uma WebView (endereço da internet) que está carregado dentro do APP
        return (
            <WebView source={{uri : this.props.route.params.product.url}} />
        )

    }
}