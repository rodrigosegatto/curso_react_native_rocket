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
    import { createStackNavigator } from 'react-navigation';

    import Main from './pages/main';
    
    //Chamar a página main
    export default createStackNavigator({
        Main
    });
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
            )
        }
    }
```
##### Ajustar arquivo index
NO arquivo **index.js** na pagina inicial './' alterar

    './App'

por 

    './src'

Para que agora passemos a utilizar o App de nossos sources.
Nâo preciso passar /index, pois por padrão, quando importamos ele já pega o index. Neste caso é a mesma coisa que './src/index'



