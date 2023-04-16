import React, { FC, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import { Box, Button, Container, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { ROUTES_PATH } from "@constants/config";
import axios from "axios";

const PokemonList: FC = () => {
    const { t } = useTranslation();
    const route = useRouter();

    return (
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
                        className="text-orange-500 mr-4 ml-4 hover:bg-gray-200 p-1 px-2 rounded-md"
                    >
                        Home
                    </button>
                    <button

                        onClick={() =>
                            route.push(
                                ROUTES_PATH.pokemon_type,
                            )
                        }
                        className="text-orange-500 mr-4 hover:bg-gray-200 p-1 px-2 rounded-md border-b-2 border-orange-500"
                    >
                        Pokemon Type
                    </button>
                </div>
            </Box>
        </Container>
    );
};

export default PokemonList;
