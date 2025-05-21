"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import {
  getPokemonByName,
  setPokemonPrincipal,
} from "../actions/pokemonActions";
import usePokemonStore from "@/store/pokemonStore";
const PokemonClient = () => {
  const { setPrincipalPokemon } = usePokemonStore();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [saving, setSaving] = useState(false);

  async function fetchPokemon() {
    setLoading(true);
    const id = Math.floor(Math.random() * 250) + 1;
    const serverData = await getPokemonByName(id);
    setPokemon(serverData);
    setLoading(false);
  }

  async function setAsPrincipal() {
    setSaving(true);
    await setPokemonPrincipal(pokemon.name);
    setPrincipalPokemon(pokemon);
    setSaving(false);
  }

  useEffect(() => {
    setImgError(false);
  }, [pokemon?.artworkUrl]);

  return (
    <div className={styles.card}>
      {loading || !pokemon ? (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <div className={styles.loadingText}>Carregando...</div>
        </div>
      ) : (
        <>
          <div className={styles.name}>{pokemon.name}</div>
          {pokemon.artworkUrl && !imgError ? (
            <Image
              src={pokemon.artworkUrl}
              alt={pokemon.name}
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
      <button
        onClick={fetchPokemon}
        disabled={loading}
        className={styles.button}
      >
        {loading ? "Carregando..." : "Trocar Pokémon"}
      </button>
      <button
        onClick={setAsPrincipal}
        className={`${styles.button} ${styles.buttonPrincipal}`}
        disabled={saving || !pokemon}
      >
        {saving ? "Salvando..." : "Novo principal"}
      </button>
    </div>
  );
};

export { PokemonClient };
