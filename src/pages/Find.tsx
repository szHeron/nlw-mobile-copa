import { VStack, Heading } from 'native-base';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import Button from '../components/button';

export default function Find(){
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
                />
                <Button
                    title="BUSCAR BOLÃO"
                />
            </VStack>
        </VStack>
    )
}