import { useState } from 'react';
import { VStack, Heading, Text, useToast } from 'native-base';
import { Header } from '../components/Header';
import Logo from '../assets/logo.svg';
import { Input } from '../components/Input';
import Button from '../components/button';
import { api } from '../services/api';

export default function New(){
    const [ title, setTitle ] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const toast = useToast();

    async function handlePoolCreate(){
        if(!title.trim()){
            return toast.show({
                title: "Informe um nome para o seu bolão",
                placement: "top",
                bg: "red.500"
            })
        }
        try{
            setIsloading(true)
            await api.post('/pools', { title })
            toast.show({
                title: "Bolão criado com sucesso!",
                placement: "top",
                bg: "green.500"
            })
            setTitle('')
        }catch(error){
            console.log(error)
            toast.show({
                title: "Não foi possivel criar um bolão",
                placement: "top",
                bg: "red.500"
            })        
        }finally{
            setIsloading(false)
        }
    }

    return(
        <VStack flex={1} bg="gray.900">
            <Header title="Criar novo bolão"/>
            <VStack mt={8} mx={5} alignItems="center">
                <Logo/>
                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Crie seu próprio bolão da copa e compartilhe com amigos!
                </Heading>
                <Input
                    mb={2}
                    placeholder="Qual o nome do seu bolão?"
                    onChangeText={setTitle}
                    value={title}
                />
                <Button
                    onPress={()=>handlePoolCreate()}
                    title="CRIAR MEU BOLÃO"
                    isLoading={isLoading}
                />
                <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
                    Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
                </Text>
            </VStack>
        </VStack>
    )
}