import { create } from "zustand";

const usePokemonStore = create((set) => ({
  principalPokemon: null,
  setPrincipalPokemon: (pokemonData) => {
    set({ principalPokemon: pokemonData });
  },
}));

export default usePokemonStore;

