import { useCallback, useState } from 'react'
import { VStack, Icon, FlatList } from 'native-base';
import { Octicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Button from '../components/button';
import { Header } from '../components/Header';
import { api } from '../services/api';
import { PoolCard, PoolPros } from '../components/PoolCard';
import Loading from '../components/loading';
import { EmptyPoolList } from '../components/EmptyPoolList';

export default function Pools(){
    const navigation = useNavigation();
    const [isLoading, setIsloading] = useState(true);
    const [pools, setPools] = useState<PoolPros[]>([]);

    async function getPools(){
        try{
            setIsloading(true);
            const response = await api.get('/pools');
            setPools(response.data.pools)
        }catch(error){
            console.log(error);
        }finally{
            setIsloading(false)
        }
    }

    useFocusEffect(useCallback(()=>{
        getPools()
    },[]))

    return (
        <VStack flex={1} bg="gray.900">
            <Header title="Meus bolões"/>
            <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
                <Button 
                    title="BUSCAR BOLÃO POR CÓDIGO"
                    leftIcon={<Icon as={Octicons} name="search" color="black" size="md"/>}
                    onPress={()=>navigation.navigate("find")}
                />
            </VStack>
            {
                isLoading?
                    <Loading/>
                :
                    <FlatList
                        data={pools}
                        keyExtractor={item=>item.id}
                        renderItem={({item})=><PoolCard data={item} onPress={()=>navigation.navigate('details', {id: item.id})}/>}
                        px={5}
                        showsVerticalScrollIndicator={false}
                        _contentContainerStyle={{
                            pb: 10
                        }}
                        ListEmptyComponent={()=><EmptyPoolList/>}
                    />
            }
        </VStack>
    )
}