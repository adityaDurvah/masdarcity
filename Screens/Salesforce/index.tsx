import React from 'react';
import { Button, Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';
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

const SalesforceLogin: React.FC = () => {
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

                Alert.alert('Login Success', 'You are now logged in with Salesforce!');
            } else {
                Alert.alert('Login Failed', 'Authentication was canceled or failed.');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login Error', 'An error occurred during the login process.');
        }
    };

    return (
        <Button title="Login with Salesforce" onPress={loginWithSalesforce} />
    );
};

export default SalesforceLogin;
