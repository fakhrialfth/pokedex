import React, { FC, useEffect, useState, SVGProps } from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Card, CardContent, Modal, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import axios from "axios";
import { useTheme } from 'styled-components'

interface PokemonTypesProps {
    name: string;
    color: string;
    icon: SVGProps<SVGSVGElement>;
}

interface PokemonProps {
    id: string;
    image: string;
    type: PokemonTypesProps[];
    backgroundColor: string;
}

const CardPokemon: React.FC<{ name: string }> = ({ name }) => {
    const { t } = useTranslation();
    const route = useRouter();
    const colors = useTheme();
    const pokemonImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

    const [pokemon, setPokemon] = useState({} as PokemonProps);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    console.log("pro", pokemon);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(function (response) {
                // console.log("a", response.data);
                setPokemon(response?.data)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {

            });
    }, [name])

    return (
        <>
            <Card onClick={handleOpen} className="inline-block rounded-2xl shadow-md bg-gray-500 max-w-sm hover:shadow-2xl transition ease-in-out delay-300 hover:scale-40 hover:-translate-x-1 hover:-translate-y-1">
                <CardContent>
                    <div className="bg-slate-300 h-1/4 p-2 mt-8">
                        <img className="" src={`${pokemonImage}${pokemon.id}.png`}></img>
                    </div>
                    <p className="mt-2 font-bold">
                        # {pokemon.id}
                    </p>
                    <p className="mt-2 font-bold text-4xl mb-4">
                        {pokemon?.name?.charAt(0)?.toUpperCase() + pokemon?.name?.slice(1)}
                    </p>
                    {pokemon?.types?.map((pokemonType: any) => {
                        const typeName = pokemonType?.type?.name
                        return <>
                            <p className="mt-1 p-1 px-5 w-28 font-bold text-white rounded-full text-lg bg-gray-300">{typeName.charAt(0)?.toUpperCase() + typeName?.slice(1)}</p>
                        </>
                    })}
                </CardContent>
            </Card >

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="flex items-center">
                        <div className="bg-slate-300 w-80">
                            <img className="transition ease-in-out delay-100 hover:scale-40 hover:-translate-y-2" src={`${pokemonImage}${pokemon.id}.png`}></img>
                        </div>
                        <div className="">
                            <p className="font-bold text-4xl text-black ml-6">
                                {pokemon?.name?.charAt(0)?.toUpperCase() + pokemon?.name?.slice(1)}
                            </p>
                            <div className="flex mt-8">
                                <p className="font-bold text-sm text-black ml-4 mt-2">
                                    Weight:
                                </p>
                                <p className="font-bold text-sm text-black ml-6 mt-2 mr-10">
                                    {pokemon.weight}
                                </p>
                                <p className="font-bold text-sm text-black ml-10 mt-2">
                                    Height: {pokemon.height}
                                </p>
                            </div>
                            <div className="flex mt-4">
                                <div className="">
                                    <a className="font-bold text-sm text-black ml-4 mt-2">
                                        Abilities:
                                    </a>
                                </div>
                                <div>
                                    {pokemon?.abilities?.map((pokemonAbilities: any) => {
                                        const ability = pokemonAbilities.ability.name
                                        const hidden = pokemonAbilities.is_hidden
                                        return (

                                            <p className="font-bold text-sm text-black ml-6">
                                                {ability} {hidden == true ? "(Hidden)" : ""}
                                            </p>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="flex items-center mt-5 mb-5">
                                <p className="font-bold text-sm text-black ml-6 mr-2">
                                    Types:
                                </p>
                                {pokemon?.types?.map((pokemonType: any) => {
                                    const typeName = pokemonType?.type?.name
                                    return <>
                                        <p className="mt-1 px-5 font-bold text-white rounded-full text-sm bg-gray-300">{typeName.charAt(0)?.toUpperCase() + typeName?.slice(1)}</p>
                                    </>
                                })}
                            </div>
                            <button className="ml-5 mt-5 p-2 px-5 text-white rounded-lg transition ease-in-out delay-150 bg-amber-500 hover:bg-amber-600">More Detail</button>

                        </div>
                    </div>
                </Box>
            </Modal>
        </>

    );
};

export default CardPokemon;
