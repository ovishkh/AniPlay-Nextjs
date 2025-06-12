"use server";

import { AnimeCard } from "components/AnimeCard";

const MAX_LIMIT = 8;

export async function fetchAnime(page: number) {
    const data = await (
        await fetch(
            `https://shikimori.one/api/animes?page=${page}&limit=${MAX_LIMIT}&order=popularity`
        )
    ).json();

    return data.map((anime: AnimeProp, index: number) => (
        <AnimeCard key={anime.id} anime={anime} index={index} />
    ));
}
