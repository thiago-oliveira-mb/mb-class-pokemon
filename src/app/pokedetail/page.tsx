import {
  // getPokemonPrincipal,
  getPokemonPrincipalApi,
} from "@/actions/pokemonActions";
import Image from "next/image";
import styles from "../../components/style.module.scss";

const PokeDetail = async () => {
  // const pokemon = await getPokemonPrincipal();
  const pokemon = await getPokemonPrincipalApi();
  return (
    <div className={styles.card}>
      <div className={styles.name}>{pokemon.name}</div>
      <Image
        src={pokemon.artworkUrl}
        alt={pokemon.name}
        width={160}
        height={160}
        className={styles.img}
        priority
      />
      <div className={styles.mainTitle}>Pokémon principal</div>
    </div>
  );
};

export default PokeDetail;
