"use client";
import Image from "next/image";
import styles from "../../components/style.module.scss";
import usePokemonStore from "@/store/pokemonStore";
import { useRouter } from "next/navigation";

const PokeDetail = () => {
  const { principalPokemon } = usePokemonStore();
  const router = useRouter();
  return (
    <>
      <button onClick={() => router.back()} className={styles.pageBackButton}>
        Voltar
      </button>
      <div className={styles.card}>
        <div className={styles.name}>{principalPokemon.name}</div>
        <Image
          src={principalPokemon.artworkUrl}
          alt={principalPokemon.name}
          width={160}
          height={160}
          className={styles.img}
          priority
        />
        <div className={styles.mainTitle}>Pokémon principal</div>
      </div>
    </>
  );
};

export default PokeDetail;
