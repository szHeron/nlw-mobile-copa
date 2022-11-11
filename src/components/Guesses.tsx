import { useEffect, useState } from 'react';
import { Box, useToast, FlatList } from 'native-base';
import { api } from '../services/api';
import { Game, GameProps } from './Game';
import Loading from './loading';

interface Props {
  poolId: string;
}

export function Guesses({ poolId }: Props) {
  const [isLoading, setIsloading] = useState(true);
  const [firstTeamPoints, setFirstTeamPoints] = useState('0');
  const [secondTeamPoints, setSecondTeamPoints] = useState('0');
  const [games, setGames] = useState<GameProps[]>([]);
  const toast = useToast();

  async function getGuesses(){
    try{
      setIsloading(true)
      const response = await api.get(`/pools/${poolId}/games`)
      setGames(response.data.games)
      console.log(response.data)
    }catch(error){
      toast.show({
        title: "Erro ao carregar os jogos.",
        placement: "top",
        bg: "red.500"
      })  
      console.log(error)
    }finally{
      setIsloading(false)
    }   
  }

  async function handleGuessConfirm(gameId: string){
    try{
      if(!firstTeamPoints.trim() || !secondTeamPoints.trim()){
        return toast.show({
          title: "Insira o placar de cada time.",
          placement: "top",
          bg: "red.500"
        })  
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`,{
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })

      toast.show({
        title: "Palpite realizado com sucesso.",
        placement: "top",
        bg: "green.500"
      }) 

      getGuesses();
    }catch(error: any){
      toast.show({
        title: "Erro ao carregar os jogos.",
        placement: "top",
        bg: "red.500"
      })  
      console.log(error.response)
    }finally{
      setIsloading(false)
    }   
  }

  useEffect(()=>{
    getGuesses();
  },[poolId])

  if(isLoading){
    return(
      <Loading/>
    )
  }

  return (
    <FlatList
      data={games}
      keyExtractor={item=>item.id}
      renderItem={({item}) => 
        <Game 
          setFirstTeamPoints={setFirstTeamPoints} 
          setSecondTeamPoints={setSecondTeamPoints} 
          onGuessConfirm={()=>handleGuessConfirm(item.id)}
          data={item}
        />
      }
    />
  );
}
