import React, { Component } from 'react';
import { View, WebView } from 'react-native';

const source = require('./EccWrapper.html');

let _getRd = () => Date.now() + Math.ceil(Math.random() * 10000);

let _callbackManager = {};

let _this;

export default class Ecc extends Component {

    constructor() {
        super();
        _this = this;
    }

    static randomKey() {
        return _this.postMessage('randomKey');
    }

    static seedPrivate(seed){
        return _this.postMessage('seedPrivate', seed);
    }

    static privateToPublic(privKey){
        return _this.postMessage('privateToPublic', privKey);
    }

    static isValidPublic(pubKey){
        return _this.postMessage('isValidPublic', pubKey);
    }

    static isValidPrivate(privKey){
        return _this.postMessage('isValidPrivate', privKey);
    }

    static sign(data, privKey, encoding = 'utf8'){
        return _this.postMessage('sign', data, privKey, encoding);
    }

    static signHash(dataSha256, privKey, encoding = 'hex'){
        return _this.postMessage('signHash', dataSha256, privKey, encoding);
    }

    static verify(signature, data, pubKey, encoding = 'utf8', hashData = true){
        return _this.postMessage('verify', signature, data, pubKey, encoding, hashData);
    }

    static recover(signature, data, encoding = 'utf8'){
        return _this.postMessage('recover', signature, data, encoding);
    }

    static recoverHash(signature, dataSha256, encoding){
        return _this.postMessage('recoverHash', signature, dataSha256, encoding);
    }

    static sha256(data, resultEncoding = 'hex', encoding = 'hex'){
        return _this.postMessage('sha256', data, resultEncoding, encoding);
    }

    postMessage(method, ...params) {
        return new Promise((resolve, reject) => {
            let rd = _getRd();
            _callbackManager[method + rd] = resolve;
            _this.refs.ecc.postMessage(JSON.stringify({
                method,
                rd,
                params
            }));
        });
    }

    handleMessage(e) {
        try {
            let { method, rd, res, code } = JSON.parse(e.nativeEvent.data);
            if (method && rd) {
                if (_callbackManager[method + rd] && code == 0) {
                    _callbackManager[method + rd](res);
                }
                delete _callbackManager[method + rd];
            }
        } catch (err) {}
    }

    render() {
        return (
            <View style={{ height: 0, width: 0, position: 'absolute', zIndex: -999999 }}>
                <WebView
                    ref="ecc"
                    style={{ height: 0, width: 0, backgroundColor: 'transparent' }}
                    source={source}
                    onMessage={this.handleMessage.bind(this)}
                    javaScriptEnabled={true}
                    mixedContentMode="always" />
            </View>
        )
    }
}