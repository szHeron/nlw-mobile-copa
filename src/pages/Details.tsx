import { useEffect, useState } from 'react'
import { Share } from 'react-native';
import { HStack, VStack, useToast } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { api } from '../services/api';
import { Guesses } from '../components/Guesses';
import { Header } from '../components/Header';
import { PoolPros } from '../components/PoolCard';
import Loading from '../components/loading';
import { PoolHeader } from '../components/PoolHeader';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { Option } from '../components/Option';

interface RouteParams {
    id: string;
}

export default function Details(){
    const route = useRoute();
    const { id } = route.params as RouteParams;
    const [isLoading, setIsloading] = useState(true);
    const [ poolDetails, setPoolDetails] = useState<PoolPros>({} as PoolPros);
    const [ optionSelected, setOptionSelect ] = useState<number>(1)
    const toast = useToast();

    async function getPoolDetails(){
        try{
            setIsloading(true)
            const response = await api.get(`/pools/${id}`)
            setPoolDetails(response.data.pool);
        }catch(error){
            toast.show({
                title: "Erro ao carregar os detalhes do bolão.",
                placement: "top",
                bg: "red.500"
            })  
            console.log(error)
        }finally{
            setIsloading(false)
        }   
    }

    async function handlePoolShare(){
        Share.share({
            message: poolDetails.code
        })
    }

    useEffect(()=>{
        getPoolDetails()
    },[id])

    if(isLoading){
        return <Loading/>
    }

    return(
        <VStack flex={1} bg="gray.900">
            <Header title={poolDetails.title} showBackButton showShareButton onShare={handlePoolShare} />
            {
                poolDetails._count.participants > 0 ?
                    <VStack px={5} flex={1}>
                        <PoolHeader data={poolDetails}/>
                        <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}> 
                            <Option title="Seus palpites" isSelected={optionSelected == 0} onPress={()=>setOptionSelect(0)}/>
                            <Option title="Ranking do grupo" isSelected={optionSelected != 0} onPress={()=>setOptionSelect(1)}/>
                        </HStack>
                        <Guesses poolId={poolDetails.id}/>
                    </VStack>
                    :
                    <EmptyMyPoolList code={poolDetails.code}/>
            }
        </VStack>
    )
}