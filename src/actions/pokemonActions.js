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
  console.log("pokemon", pokemon.name);
  return {
    name: pokemon.name,
    artworkUrl: `https://img.pokemondb.net/artwork/${pokemon.name.toLowerCase()}.jpg`,
  };
}

function getBaseUrl() {
  return typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    : "";
}

export async function getPokemonPrincipalApi() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/principal`, {
    next: { tags: ["pokemon-principal"] },
  });
  if (!res.ok) throw new Error("Pokémon principal não encontrado");
  const data = await res.json();
  return {
    name: data.name,
    artworkUrl: `https://img.pokemondb.net/artwork/${data?.name?.toLowerCase()}.jpg`,
  };
}

export async function setPokemonPrincipalApi(name) {
  const baseUrl = getBaseUrl();
  await fetch(`${baseUrl}/api/principal`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  revalidateTag("pokemon-principal");
}
