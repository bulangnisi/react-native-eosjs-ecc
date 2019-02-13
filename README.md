# react-native-eosjs-ecc

Use eosjs-ecc on react native

# install

```

npm install https://github.com/bulangnisi/react-native-eosjs-ecc.git --save

```

# use

App.js

```js

import React, { Component } from 'react';
import { Platform, StyleSheet, View, Button } from 'react-native';
import Ecc from 'react-native-eosjs-ecc';

export default class App extends Component{

    handleEcc(){
        Ecc.randomKey().then(key => {
            console.log('randomKey ', key);
        })
    }

    render(){
        <View style={styles.container}>
            <Button title="中文" onPress={this.handleEcc.bind(this)}></Button>
            <Ecc />
        </View>
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

```