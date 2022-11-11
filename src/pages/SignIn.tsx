import { Center, Text, Icon } from "native-base";
import { Fontisto } from '@expo/vector-icons';
import Logo from '../assets/logo.svg'
import Button from '../components/button';
import useAuth from '../hooks/useAuth';

export default function SignIn(){
    const { signIn, isUserLoading } = useAuth();
    return(
        <Center flex={1} bgColor="gray.900" p={7}>
            <Logo width={212} height={40}/>
            <Button 
                leftIcon={<Icon as={Fontisto} name="google" color="white" size="md"/>}
                title="ENTRAR COM O GOOGLE"
                type="SECONDARY"
                mt={12}
                onPress={signIn}
                isLoading={!isUserLoading?false:true}
                _loading={{
                    _spinner:{
                        color: 'white'
                    }
                }}
            />
            <Text textAlign="center" mt={4} color="gray.200">
                Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.
            </Text>
        </Center>
    )
}