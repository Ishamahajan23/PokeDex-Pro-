import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemon, nextPage, prevPage , setSort, setFilter} from '../features/pokemon/pokemonSlice';
import { Loader } from '../components/Loader';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { list, loading, error, page, offset, filter } = useSelector((state) => state.pokemon);

    useEffect(() => {
        dispatch(fetchPokemon({ offset }));
    }, [offset, dispatch]);

    const filteredList = filter === 'all' 
        ? list 
        : list.filter((pokemon) => pokemon.types.some((type) => type.type.name === filter));

    return (
        <div className='w-full flex flex-col items-center  min-h-screen'>
            <header className='bg-blue-500 text-white p-5 w-full fixed top-0 '>
                <nav>
                    <h1 className='text-2xl font-bold'>PokeDex Pro</h1>
                </nav>
            </header>
            <main className='w-full flex flex-col items-center justify-center mt-20'>
                <h1 className='text-3xl font-bold'>Pokemon List</h1>
                <div>
                    <select name="" id=" " className='mt-5 p-2 border border-gray-300 rounded' onChange={(e) => dispatch(setFilter(e.target.value))}>
                        <option value="all">All Types</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                    </select>
                    <select name="" id="" className='mt-5 p-2 border border-gray-300 rounded ml-2' onChange={(e) => dispatch(setSort(e.target.value))}>
                        <option value="all">All Types</option>
                        <option value="az">A-Z</option>
                        <option value="za">Z-A</option>
                    </select>
                </div>
                <table className='md:w-full mt-10 bg-white shadow-lg rounded-lg overflow-hidden '>
                    <thead className='bg-blue-500 text-white '>
                        <tr className='text-center md:text-lg'>
                            <td> Name</td>
                            <td>Base Experience</td>
                            <td>Weight</td>
                            <td>Types</td>
                            <td>Sprite Image</td>
                            <td>Details</td>
                        </tr>
                    </thead>
                    <tbody className='text-gray-700 text-sm md:text-base bg-gray-100'>
                        {loading && <Loader />}
                        {error && <p>Error: {error}</p>}
                        {filteredList.map((pokemon) => (
                            <tr key={pokemon.id} className='border-b border-gray-300 hover:bg-gray-200 transition-colors duration-200'>
                                <td className='text-center p-2'>{pokemon.name} ⚡️ </td>
                                <td className='text-center p-2'>{pokemon.base_experience}</td>
                                <td className='text-center p-2'>{pokemon.weight}</td>
                                <td className='text-center p-2'>
                                    {pokemon.types.map((type, index) => (
                                        <span key={index} className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                                            {type.type.name}
                                        </span>
                                    ))}
                                </td>
                                <td className='text-center p-2'>
                                    <img src={pokemon.sprites.front_default} alt={pokemon.name} className='w-16 h-16' />
                                </td>
                                <td className='text-center p-2'>
                                    <button onClick={() => navigate(`/details/${pokemon.id}`)} className='bg-blue-500 text-white px-4 py-2 rounded'>Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-center items-center gap-2 w-full mt-5 px-5'>
                    <button onClick={() => dispatch(prevPage())} className='bg-blue-500 text-white px-4 py-2 rounded'>Prev</button>
                    <button onClick={() => dispatch(nextPage())} className='bg-blue-500 text-white px-4 py-2 rounded'>Next</button>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
