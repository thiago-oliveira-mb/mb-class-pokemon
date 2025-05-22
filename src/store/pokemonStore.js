import { create } from "zustand";
import { getPokemonByName } from "../actions/pokemonActions";

const _fetchPokemonDataAndUpdateStore = async (set) => {
  try {
    const id = Math.floor(Math.random() * 250) + 1;
    const serverData = await getPokemonByName(id);
    set({ currentViewPokemon: serverData });
    return serverData;
  } catch (error) {
    console.error("Failed to fetch pokemon data from store helper:", error);
    throw error;
  }
};

const usePokemonStore = create((set, get) => ({
  principalPokemon: null,
  currentViewPokemon: null,
  isLoadingInitialPokemon: false,
  isSwappingPokemonInStore: false,
  setPrincipalPokemon: (pokemon) => set({ principalPokemon: pokemon }),
  setCurrentViewPokemon: (pokemon) => set({ currentViewPokemon: pokemon }),
  fetchInitialPokemonIfNeeded: async () => {
    if (get().currentViewPokemon === null && !get().isLoadingInitialPokemon) {
      set({ isLoadingInitialPokemon: true });
      try {
        await _fetchPokemonDataAndUpdateStore(set);
      } catch (error) {
      } finally {
        set({ isLoadingInitialPokemon: false });
      }
    }
  },
  fetchNewRandomPokemon: async () => {
    set({ isSwappingPokemonInStore: true });
    try {
      await _fetchPokemonDataAndUpdateStore(set);
    } catch (error) {
    } finally {
      set({ isSwappingPokemonInStore: false });
    }
  },
}));

export default usePokemonStore;
