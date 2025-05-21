"use client";

import { useEffect, useRef } from "react";
import usePokemonStore from "../store/pokemonStore";
import { getPokemonPrincipal } from "../actions/pokemonActions";

function StoreInitializer() {
  const initialized = useRef(false);
  const { setPrincipalPokemon } = usePokemonStore();

  useEffect(() => {
    if (!initialized.current) {
      const initialize = async () => {
        try {
          const principalData = await getPokemonPrincipal();
          setPrincipalPokemon(principalData);
        } catch (error) {
          console.error(
            "StoreInitializer: Erro ao buscar ou definir Pokémon principal:",
            error
          );
          setPrincipalPokemon(null);
        }
      };

      initialize();
      initialized.current = true;
    }
  }, [setPrincipalPokemon]);

  return null;
}

export default StoreInitializer;
