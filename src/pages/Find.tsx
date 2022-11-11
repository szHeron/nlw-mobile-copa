import { useState } from 'react';
import { VStack, Heading, useToast } from 'native-base';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import Button from '../components/button';
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export default function Find(){
    const [ isLoading, setIsloading ] = useState(false);
    const [code, setCode] = useState('');
    const { navigate } = useNavigation();
    const toast = useToast();

    async function handlePoolJoin(){
        try{
            setIsloading(true);
            if(!code.trim()){
                return  toast.show({
                    title: "Insira um código valido.",
                    placement: "top",
                    bg: "red.500"
                })  
            }
            await api.post('/pools/join', { code })
            toast.show({
                title: "Você entrou no bolão com sucesso.",
                placement: "top",
                bg: "green.500"
            })  
            setIsloading(false)
            navigate('pools')
        }catch(error: any){
            console.log(error)
            setIsloading(false)
            if(error.response.data.message = 'Pool not found.'){
                return  toast.show({
                    title: "Bolão não encontrado.",
                    placement: "top",
                    bg: "red.500"
                })  
            }
            if(error.response.data.message = 'You already joined this pool.'){
                return  toast.show({
                    title: "Você já participa deste bolão.",
                    placement: "top",
                    bg: "red.500"
                })  
            }
        }
    }

    return(
        <VStack flex={1} bg="gray.900">
            <Header showBackButton title="Buscar por código"/>
            <VStack mx={5} alignItems="center">
                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Encontre um bolão através {'\n'} de seu código único
                </Heading>
                <Input
                    mb={2}
                    placeholder="Qual o código do bolão?"
                    autoCapitalize="characters"
                    onChangeText={setCode}
                    value={code}
                />
                <Button
                    title="BUSCAR BOLÃO"
                    isLoading={isLoading}
                    onPress={handlePoolJoin}
                />
            </VStack>
        </VStack>
    )
}