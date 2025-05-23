"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import usePokemonStore from "../store/pokemonStore";
import Link from "next/link";
import { useLDClient } from "launchdarkly-react-client-sdk";

const PokemonServer = () => {
  const { principalPokemon } = usePokemonStore();

  const ldClient = useLDClient();

  const handleMetric = () => {
    ldClient.track("cardClicked", {
      pokemon: principalPokemon,
    });
  };

  if (!principalPokemon) {
    return (
      <div className={styles.card}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <div className={styles.loadingText}>Carregando Principal...</div>
        </div>
      </div>
    );
  }

  return (
    <Link onClick={handleMetric} href="/pokedetail" className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.name}>{principalPokemon.name}</div>
        {principalPokemon.artworkUrl ? (
          <Image
            src={principalPokemon.artworkUrl}
            alt={principalPokemon.name}
            width={160}
            height={160}
            className={styles.img}
            priority
          />
        ) : (
          <div className={styles.error}>Imagem não disponível</div>
        )}
        <div className={styles.mainTitle}>Pokémon Principal</div>
      </div>
    </Link>
  );
};

export { PokemonServer };
