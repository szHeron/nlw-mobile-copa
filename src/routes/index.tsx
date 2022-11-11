import { NavigationContainer } from '@react-navigation/native';
import { Box } from 'native-base';
import { AppRoutes } from './app.routes';
import SignIn from '../pages/SignIn';
import useAuth from '../hooks/useAuth';

export default function Routes(){
    const { user } = useAuth();

    return(
        <Box flex={1} bg='gray.900'>
            <NavigationContainer>
                {
                    !user.name?<SignIn/>:<AppRoutes/>
                }
            </NavigationContainer>
        </Box>

    )
}