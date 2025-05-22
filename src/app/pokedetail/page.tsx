"use client";
import Image from "next/image";
import styles from "../../components/style.module.scss";
import usePokemonStore from "@/store/pokemonStore";
import { useRouter } from "next/navigation";
import { useFlags } from "launchdarkly-react-client-sdk";

const PokeDetail = () => {
  const { principalPokemon } = usePokemonStore();
  const router = useRouter();
  const { showMore, cardConfig } = useFlags();

  return (
    <>
      <button onClick={() => router.back()} className={styles.pageBackButton}>
        Voltar
      </button>
      <div
        className={styles.card}
        style={{
          backgroundColor: cardConfig?.background,
        }}
      >
        <div className={styles.name} style={{ color: cardConfig?.color }}>
          {principalPokemon?.name}
        </div>
        <Image
          src={
            showMore
              ? "https://img.pokemondb.net/artwork/ditto.jpg"
              : principalPokemon?.artworkUrl
          }
          alt={principalPokemon?.name}
          width={160}
          height={160}
          className={styles.img}
          priority
        />
        <div className={styles.mainTitle}>Pokémon principal</div>
        {showMore && (
          <div className={styles.showMore}>
            <p>
              Seu Pokémon principal não é um{" "}
              <strong>{principalPokemon?.name}</strong>.
            </p>
            <p>
              Na verdade ele é um <strong>Ditto</strong> disfarçado! sinto muito
              🎭​
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PokeDetail;
