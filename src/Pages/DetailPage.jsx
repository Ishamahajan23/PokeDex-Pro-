import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader } from '../components/Loader';

const DetailPage = () => {
    const {id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res=>{
        setPokemon(res.data);
    })
       
    },[id]);

    if (!pokemon) return <Loader/>;
  return (
    <div className='w-full flex flex-col items-center  min-h-screen'>
         <header className='bg-blue-500 text-white p-5 w-full fixed top-0  '>
            <nav className='flex justify-between items-center'>
                 <h1 className='text-2xl font-bold'>PokeDex Pro</h1>
                 <button onClick={()=>navigate("/")} className='bg-white text-black p-2' >Back to Dashboard</button>
            </nav>
        </header>
        <main className='w-full flex flex-col items-center justify-center mt-20'>

            <div className='bg-white shadow-lg rounded-lg p-5 w-full flex flex-col gap-3 '>
               
               <div className=' grid grid-cols-1 md:grid-cols-2 gap-4 border-1 border-gray-300 p-2 rounded-lg'>
               <h1 className='text-3xl flex justify-center items-center border-gray-300 p-2 rounded-lg'>{pokemon.name}</h1>
               <img src={pokemon.sprites.front_default} alt={pokemon.name} className='w-50 h-50 border-gray-300 p-2 rounded-lg' />
               
                </div>
               </div>
               <div className='bg-white shadow-lg rounded-lg p-5 w-full flex flex-col gap-3 mt-5'>
               <p className='text-xl '>Height : {pokemon.height}</p>
                <p className='text-xl '>Weight : {pokemon.weight}</p>
                <p className='text-xl '>Base Experience : {pokemon.base_experience}</p>
                <p className='text-xl '> Abilities : {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
                <div className='flex flex-wrap gap-2 text-center justify-center items-center'>
                    {pokemon.types.map((type, index) => (
                        <span key={index} className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                            {type.type.name}
                        </span>
                    ))}
               </div>
              

                <p className='text-xl '> Moves : <span className=' flex gap-1'>{pokemon.moves.map((move) => move.move.name).join(', ')}</span></p>
                
            </div>

        </main>



    </div>
  )
}
export default DetailPage;
