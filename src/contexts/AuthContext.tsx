import React, { createContext, ReactNode, useState, useEffect } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { api } from '../services/api';
import { CLIENT_ID } from '@env'

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
    name: String;
    avatarUrl?: String;
}

export interface AuthContextDataProps {
    user: UserProps;
    isUserLoading: Boolean;
    signIn: () => Promise<void>
}

export interface AuthContextProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps) 

export function AuthContextProvider({children}: AuthContextProps){
    const [ isUserLoading, setIsUserLoading ] = useState(false);
    const [ user, setUser ] = useState<UserProps>({} as UserProps);

    const [ request, response, promptAsync ] = Google.useAuthRequest({
        clientId: CLIENT_ID,
        redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
        scopes: ['profile', 'email']
    });

    useEffect(()=>{
        if(response?.type === 'success' && response.authentication?.accessToken){
            console.log(response.authentication.accessToken)
            signInWithGoogle(response.authentication.accessToken)
        }
    }, [response]);

    async function signIn() {
        try{
            setIsUserLoading(true);
            await promptAsync();
        }catch(error){
            console.log(error);
            throw error
        }finally{
            setIsUserLoading(false);
        }
    }

    async function signInWithGoogle(access_token: string) {
        try{
            setIsUserLoading(true);
            const response = await api.post('/users', {access_token});
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
            const userInfo = await api.get('/me')
            setUser(userInfo.data.user)
        }catch(error){
            console.log(error)
        }finally{
            setIsUserLoading(true);
        }
    }

    return (
        <AuthContext.Provider value={{user, signIn, isUserLoading}}>
            {children}
        </AuthContext.Provider>
    )
}