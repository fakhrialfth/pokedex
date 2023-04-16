import React, { FC, useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Container, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { ROUTES_PATH } from "@constants/config";
import axios from "axios";
import CardPokemon from "@components/CardPokemon";

interface PokemonProps {
    id: string;
    name: string;
}

const PokemonList: FC = () => {
    const { t } = useTranslation();
    const route = useRouter();
    const NUMBER_POKEMONS = 100;
    const [pokemons, setPokemons] = useState<PokemonProps[]>([]);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${NUMBER_POKEMONS}/`)
            .then(function (response) {
                // console.log(response);
                setPokemons(response?.data?.results)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {

            });
    }, [NUMBER_POKEMONS])

    return (
        <>
            <Container>
                <Box m={10}>
                    <div className="flex items-center">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
                            alt="pokemoLogo"
                            width={150}
                        />
                        <button

                            onClick={() =>
                                route.push(
                                    ROUTES_PATH.pokemon_list,
                                )
                            }
                            className="text-orange-500 mr-4 ml-4 hover:bg-gray-200 p-1 px-2 rounded-md border-b-2 border-orange-500"
                        >
                            Home
                        </button>
                        <button

                            onClick={() =>
                                route.push(
                                    ROUTES_PATH.pokemon_type,
                                )
                            }
                            className="text-orange-500 mr-4 hover:bg-gray-200 p-1 px-2 rounded-md"
                        >
                            Pokemon Type
                        </button>
                    </div>
                </Box>
                <Box m={8}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} className="flex items-center">
                            <Grid item xs={6}>
                                <h1 className="text-5xl text-zinc-600 font-bold pr-11 leading-snug">All the pokemon data you'll ever need in one place!</h1>
                                <p className="mt-4 text-zinc-700 font-medium">Thousand of data compiled into one place</p>
                                <a href="#pokedex" className="scroll-smooth hover:scroll-auto">
                                    <button className="mt-5 p-2 px-5 text-white rounded-lg transition ease-in-out delay-150 bg-amber-500 hover:-translate-y-1 hover:scale-110 hover:bg-amber-600 duration-300">Check Pokedex</button>
                                </a>
                            </Grid>
                            <Grid item xs={6}>
                                <img className="ml-8" src="https://pbs.twimg.com/media/FtwtI8aaYAIFu8y?format=png&name=small" alt="pokemon" />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container >

            <div className="bg-amber-400">
                <div className="grid justify-items-center">
                    <p id="pokedex" className="text-4xl text-zinc-700 font-bold mt-11 mb-4">PokeDex</p>
                    <p className="text-lg font-semibold text-zinc-600">All Generation totaling</p>
                    <p className="text-lg font-semibold text-zinc-600">{pokemons.length} Pokemon</p>
                </div>

                <Box m={5} className="grid grid-cols-3 gap-y-16 gap-x-24">
                    {pokemons?.map(pokemon => (
                        <CardPokemon key={pokemon.name} name={pokemon.name} />
                    ))}
                </Box>
            </div>
        </>

    );
};

export default PokemonList;
