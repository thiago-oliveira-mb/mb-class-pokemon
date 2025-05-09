import { PokemonServer } from "../components/PokemonServer";
import { PokemonClient } from "../components/PokemonClient";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Pokédex</h1>
      <div className={styles.cardsContainer}>
        <div>
          <div className={styles.sectionTitle}>Server Component</div>

          <PokemonServer />
        </div>
        <div>
          <div className={styles.sectionTitle}>Client Component</div>
          <PokemonClient />
        </div>
      </div>
    </div>
  );
}
