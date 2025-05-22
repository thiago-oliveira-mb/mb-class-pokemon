"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import { setPokemonPrincipal as setPokemonPrincipalAction } from "../actions/pokemonActions";
import usePokemonStore from "@/store/pokemonStore";

const PokemonClient = () => {
  const {
    currentViewPokemon,
    isLoadingInitialPokemon,
    isSwappingPokemonInStore,
    setPrincipalPokemon,
    fetchInitialPokemonIfNeeded,
    fetchNewRandomPokemon,
  } = usePokemonStore();

  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    fetchInitialPokemonIfNeeded();
  }, [fetchInitialPokemonIfNeeded]);

  const handleSwapPokemon = async () => {
    await fetchNewRandomPokemon();
  };

  async function setAsPrincipal() {
    if (!currentViewPokemon) return;
    await setPokemonPrincipalAction(currentViewPokemon.name);
    setPrincipalPokemon(currentViewPokemon);
  }

  useEffect(() => {
    setImgError(false);
  }, [currentViewPokemon?.artworkUrl]);

  const displayLoading = isLoadingInitialPokemon || isSwappingPokemonInStore;

  return (
    <div className={styles.card}>
      {displayLoading || !currentViewPokemon ? (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <div className={styles.loadingText}>Carregando...</div>
        </div>
      ) : (
        <>
          <div className={styles.name}>{currentViewPokemon.name}</div>
          {currentViewPokemon.artworkUrl && !imgError ? (
            <Image
              src={currentViewPokemon.artworkUrl}
              alt={currentViewPokemon.name}
              width={160}
              height={160}
              className={styles.img}
              priority
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={styles.error}>Imagem não disponível</div>
          )}
        </>
      )}
      <button onClick={handleSwapPokemon} className={styles.button}>
        Trocar Pokémon
      </button>
      <button
        onClick={setAsPrincipal}
        className={`${styles.button} ${styles.buttonPrincipal}`}
      >
        Novo principal
      </button>
    </div>
  );
};

export { PokemonClient };
