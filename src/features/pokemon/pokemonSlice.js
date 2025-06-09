import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchPokemon = createAsyncThunk(
    "pokemon/fetchPokemon",
    async ({offset=0, limit=10})=>{
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        const detaileddata = await Promise.all(res.data.results.map(p => axios.get(p.url).then(r => r.data)));
        return detaileddata
    }
)

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState:{
        list :[],
        offset: 0,
        filter: "all",
        sort: "az",
        loading: false,
        error: null    

    },
    reducers:{
        setFilter(state, action){
            state.filter = action.payload;
            if (action.payload === "all") {
                state.list = state.list;
            }
            if (action.payload === "fire") {
                state.list = state.list.filter(pokemon => pokemon.types.some(type => type.type.name === "fire"));
            }
            else if (action.payload === "water") {
                state.list = state.list.filter(pokemon => pokemon.types.some(type => type.type.name === "water"));
            } 
        },
        setSort(state, action){ 
            if (action.payload === "az") {
                state.list.sort((a, b) => a.name.localeCompare(b.name));
            } else if (action.payload === "za") {
                state.list.sort((a, b) => b.name.localeCompare(a.name));
            }else if (action.payload === "all") {
                state.list = state.list;

            }
        },
        nextPage(state){
            state.offset +=10;

        },
        prevPage(state){
            state.offset = Math.max(0, state.offset-10);
        }

    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchPokemon.pending, (state, action)=>{
            state.loading = true;
            state.error= null;
        })
        .addCase(fetchPokemon.fulfilled, (state, action)=>{
            state.loading =false;
            state.list = action .payload;

        })
        .addCase(fetchPokemon.rejected, (state, action)=>{
            state.loading =false;
            state.error = action.error.message;
        })
    }

});

export const {setFilter, setSort, nextPage, prevPage} = pokemonSlice.actions;
export default pokemonSlice.reducer;