# Curso React Native - RocketSeat
Curso para desenvolvimento de App mobile com ReactNative ministrado por Diego Fernandes da Rocketseat.

Utilizar o link abaixo, disponibilizado pela Rocketseat, para instalar as dependências e configurar o React-native na máquina.

	[https://docs.rocketseat.dev/ambiente-react-native/introducao]

Referente ao emulador, os passos do manual não funcionaram para mim, então baixei o Android Studio completo e segui este vídeo do Youtube:
	
	[https://www.youtube.com/watch?v=eSjFDWYkdxM&t=170s]

Após configurado, sim, poderemos iniciar o projeto.
## Criando o projeto
Comando abaixo
	
	react-native init nome_projeto

## Rodar projeto no emulador
Comando abaixo para rodar no emulador do android que está aberto

    npx react-native run-android

Este comando irá criar todo o aplicativo no emulador. Após isto, caso venhamos a trabalhar em nosso projeto mais tarde, não precisaremos rodar novamente este código, apenas "react-native start".
Caso instalarmos alguma nova dependência no projeto, aí sim, devemos rodar tudo novamente para atualizar o aplicativo no emulador também .

## Iniciando código e entendendo Componentes 

##### Ajustar arquivo App.js
Este é o arquivo principal da aplicação chamado atarvés da index.js
Iremos remover **comentarios** e deixar o código limpo como segue abaixo para iniciarmos a programação.
Por vezes, após editar o código, tem que ir no menu do emulador e habilitar o autoreload para atualizar o código automaticamente ao editar.

```js
    import React, {Component} from 'react';
    import {Plataform,StyleSheet,View,Text} from 'react-native';

    export default class App extends Component {
    render(){
        return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
            Bem vindo
            </Text>
        </View>
        )
    }
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
    });

```

## COnfigurar Navegação

##### Instalar react navigation
Comando abaixo

    yarn add @react-navigation/native

    yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
    
    yarn add @react-navigation/stack

Ou pesquisar no site novas versões do ReactNavigation para utilizar.

##### Pasta de sources
Criar uma pasta **src**.

##### Pasta de pages
Criar uma pasta **pages** dentro de './src'.

##### Arquivo de rotas
Criar arquivo **routes.js** dentro de ./src'.

Conteúdo: 

```js
    import React, {Component} from 'react';
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';

    import Main from './pages/main';

    const Stack = createStackNavigator();
    
    function App() {
        return (
            <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name="Início" 
                component={Main} 
                options={{ title: 'API Produtos' }}
                />
            </Stack.Navigator>
            </NavigationContainer>
        );
    }
    
    export default App;
```

##### Arquivo index
Criar arquivo **index.js** dentro de ./src'.

Conteúdo: 

```js
    import React from 'react';
    import Routes from './routes';

    const App = () => <Routes />;

    export default App;

```

##### Deletar App.js
deletar arquivo **App.js**. Sim, vai dar ERRO. Mas tranquilo, iremos recria-la logo mais.

##### Arquivo de pagina
Criar arquivo **main.js** dentro de ./src/pages'. Como se fosse a página inicial

Conteúdo: 

```js
    import React, { Component } from 'react';
    import { View, Text } from 'react-native';

    export default class Main extends Component {
        render () { 
            return (
                <View>
                    <Text>Página Main</Text>
                </View>
            );
        }
    }
```
##### Ajustar arquivo index
NO arquivo **index.js** na pagina inicial './' alterar

    './App'

por 

    './src'

Para que agora passemos a utilizar o App de nossos SRCs.
Nâo preciso passar /index, pois por padrão, quando importamos ele já pega o index. Neste caso é a mesma coisa que './src/index'

## Estilizando o Header e StatusBar

##### Header
No arquivo de rotas, modificar as propriedades da rota adicionando uma options, onde deixaremos o fundo laranjado e a cor branca para o texto:

```js
    options={
        { 
            title: 'API Produtos', 
            headerStyle: {
            backgroundColor: '#DA552F',
            },
            headerTintColor: "#FFF"
        }
    }
```
##### Statusbar
Configurar o status bar para que o Android por exemplo, utilize a mesma cor do Header na barra de status.

Criar uma pasta **config** dentro de './src', e dentro desta pasta, criar um arquivo chamado **StatusBarConfig.js**.

Conteúdo:

```js
    import {StatusBar} from 'react-native';

    //Estilizando Android
    StatusBar.setBackgroundColor('#DA552F');
    //Estilizando IOs
    StatusBar.setBarStyle('light-content');
```
##### Importar na index config statusbar
Dentro de './src/pages/index.js' inserir o seguinte import na página superior

```js
    import './config/StatusBarConfig';
```
## BUscando produtos da API

##### Instalar o Axios
Axios é uma extensão para que possamos consumir APIs facilmente.

##### Serviçes
Criar uma pasta **services** em './src'

##### Api
Criar um arquivo chamado **api.js** em './src/services'
Separar assim a aplicação para consumir e receber dados.

Conteído:

```js
    import axios from 'axios';

    const api = axios.create({
        baseURL: 'https://rocketseat-node.herokuapp.com/api'
        //ou minha API feita local http://endereco:3000/api
    });

    export default api;
```

##### Importar na Main
Dentro de **main.js** em './src/pages/' importar a API.
Ajustar também o arquivo par que consiga consultar e mostrar os produtos. 
Até est aparte o conteúdo ficará assim:

```js  
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
```

## Listando e Estilizando Produtos
Iremos utilizar um componente de lista do React chamado FlatList.
Sempre que tivermos uma lista, sabemos que deveremos utilizar este componente ao invés do map() como estávamos fazendo.

Utilizar o componente TouchableOpacity que possibilita uma opacidade ao clicar sobre um link por exemplo. Existen outras diversas opções de Touchable oara utilização. COnsultar API.

Neste caso o arquivo da **main.js** ate agora ficará assim, como abaixo. Comparar com algum site online para ver as diferenças da versão anterior, pois fica dificil explicar as partes que foram alteradas:

```js
    import React, { Component } from 'react';
    import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
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

        //Chamado pela Flatlist do render() que 
        //passara para 'item' o exato item percorrido
        renderItem = ({item}) => (
            <View style={styles.productContainer}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                
                <TouchableOpacity style={styles.productButton} onPress={() => {}}>
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
```

## Listagem pronta. Fazer Scroll Infinito
Para carregar mais itens ao chegar no final da lista automaticamente

Arquivo **main.js** agora ficará assim:

```js
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
                
                <TouchableOpacity style={styles.productButton} onPress={() => {}}>
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
```

## Detalhe com WebView
