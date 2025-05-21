"use server";
import { revalidateTag } from "next/cache";

export async function getPokemonPrincipal() {
  const res = await fetch("http://localhost:3001/principal", {
    next: { tags: ["pokemon-principal"] },
  });
  if (!res.ok) throw new Error("Pokémon principal não encontrado");
  const data = await res.json();
  return {
    name: data.name,
    artworkUrl: `https://img.pokemondb.net/artwork/${data?.name?.toLowerCase()}.jpg`,
  };
}

export async function setPokemonPrincipal(name) {
  await fetch("http://localhost:3001/principal", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  revalidateTag("pokemon-principal");
}

export async function getPokemonByName(nameOrId) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
  if (!res.ok) throw new Error("Pokémon não encontrado");
  const pokemon = await res.json();
  return {
    name: pokemon.name,
    artworkUrl: `https://img.pokemondb.net/artwork/${pokemon.name.toLowerCase()}.jpg`,
  };
}
