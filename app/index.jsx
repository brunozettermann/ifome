import React, { createContext, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, FlatList } from 'react-native';
import Header from './components/header';
import { Link } from 'expo-router';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [lanches, setLanches] = useState([
        { id: 1, nome: 'Sashimi de salmão', local: 'Sashimi 6 peças', preco: 45.00, img: 'data:image/jpeg;base64,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' },
        { id: 2, nome: 'Hot ', local: 'Hot 8 peças', preco: 45.00, img: 'data:image/jpeg;base64,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' },
    ]);

    const [carrinho, setCarrinho] = useState([]);

    return (
        <AppContext.Provider value={{ lanches, carrinho, setCarrinho }}>
            {children}
        </AppContext.Provider>
    );
};

const Item = ({ nome, local, preco, img, id }) => {
    const { carrinho, setCarrinho } = useContext(AppContext);

    const adicionar = () => {
        setCarrinho([...carrinho, { id, nome, local, preco }]);
    };

    return (
        <View style={styles.itemContainer}>
            <Image source={{ uri: img }} style={styles.img} />
            <View style={styles.itemDetails}>
                <Text style={styles.nome}>{nome}</Text>
                <Text style={styles.local}>{local}</Text>
                <Text style={styles.preco}>R$ {preco}</Text>
                <Pressable style={styles.buy} onPress={adicionar}>
                    <Text style={styles.buyTxt}>Adicionar ao carrinho</Text>
                </Pressable>
            </View>
        </View>
    );
};

const App = () => {
    const { lanches, carrinho } = useContext(AppContext);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Header link='../' header='iFome' />
                <View style={styles.cartArea}>
                    <Image source={require('./assets/carrinho.png')} style={styles.cartImg} />
                    <Text style={styles.txtCart}>{carrinho.length} itens</Text>
                    {carrinho.length > 0 && (
                        <Link href='./cart' style={styles.link}>
                            <Text>Carrinho</Text>
                        </Link>
                    )}
                </View>
            </View>
            <View style={styles.carts}>
                <FlatList
                    data={lanches}
                    renderItem={({ item }) => (
                        <Item {...item} />
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </ScrollView>
    );
};

const Main = () => {
    return (
        <AppProvider>
            <App />
        </AppProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginBottom: 20,
    },
    cartArea: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    txtCart: {
        marginRight: 20,
    },
    carts: {
        padding: 10
    },
    link: {
        backgroundColor: 'blue',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: '#fff',
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        padding: 20,
    },
    img: {
        width: 150,
        height: 150,
        marginRight: 20,
    },
    itemDetails: {
        flex: 1,
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    local: {
        fontSize: 14,
        marginBottom: 5,
    },
    preco: {
        fontSize: 16,
        color: '#000',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    buy: {
        backgroundColor: 'cyan',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buyTxt: {
        color: 'black',
    },
    cartImg: {
        width: 30,
        height: 30,
        marginRight: 20,
    },
});

export default Main;