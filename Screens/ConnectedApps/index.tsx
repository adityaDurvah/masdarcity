import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Text } from '../../Components/Text';
import * as AuthSession from 'expo-auth-session';
import SFLogo from '../../assets/Salesforce-logo.jpg'
import * as SecureStore from 'expo-secure-store';
const useProxy = true;
const redirectUri = 'com.durvah.masdarcity://oauthredirect'
const discovery = {
    // authorizationEndpoint: 'https://masdarcity--preprod.sandbox.lightning.force.com/services/oauth2/authorize',
    // tokenEndpoint: 'https://masdarcity--preprod.sandbox.lightning.force.com/services/oauth2/token',
    authorizationEndpoint: 'https://masdarcity--sit.sandbox.my.salesforce.com/services/oauth2/authorize',
    tokenEndpoint: 'https://masdarcity--sit.sandbox.my.salesforce.com/services/oauth2/token',
};

const config = {
    //preprod
    // clientId: '3MVG99H7o8BRmFkXCFuOYgbOKAIa7ePWrekr00VRoS45H0BYgw047eUPsc4uhFtR8ISV8X0pR8ueMNdGaXL3t',
    //sit
    clientId: '3MVG9ni3C0bUFjkoxZgo9PAfbYkDFaA74YD2s59njbnSxoNuijk5_YhdkejQpK8xcDjd6t865uq4F4KSblHwF',
    redirectUri,
    scopes: ['full'],
    usePKCE: true,
};
const AppItem = ({ source, name, onPress }: any) => {
    return (
        <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
            <Image
                source={source} // Salesforce logo
                style={styles.appIcon}
            />
            <Text style={styles.appText}>{name}</Text>
        </TouchableOpacity>
    );
}
const apps = [
    {
        name: 'Salesforce',
       source:SFLogo,
    }
]
const ConnectedApps = ({navigation}: {navigation: any}) => {
    const loginWithSalesforce = async () => {
        try {
            const authRequest = new AuthSession.AuthRequest(config);
            const authResponse = await authRequest.promptAsync(discovery);

            if (authResponse.type === 'success') {
                const tokenResponse = await fetch(discovery.tokenEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `grant_type=authorization_code&code=${authResponse.params.code}&client_id=${config.clientId}&redirect_uri=${redirectUri}&code_verifier=${authRequest.codeVerifier}`,
                });
                const tokens = await tokenResponse.json();

                console.log('Access Token:', tokens.access_token);
                console.log('Refresh Token:', tokens.refresh_token);

                // Save tokens securely
                // await SecureStore.setItemAsync('accessToken', tokens.access_token);
                // await SecureStore.setItemAsync('refreshToken', tokens.refresh_token);

                navigation.navigate('ServiceListScreen');
            } else {
                Alert.alert('Login Failed', 'Authentication was canceled or failed.');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login Error', 'An error occurred during the login process.');
        }
    };
    return (
        <View style={styles.container}>
            <FlatList data={apps} renderItem={({ item }) => <AppItem name={item.name} source={item.source} onPress={loginWithSalesforce} />} />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#f1f1f1',
    },
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
    },
    appIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginRight: 16,
    },
    appText: {
        fontSize: 18,
        fontWeight: '500',
    },
});

export default ConnectedApps;
