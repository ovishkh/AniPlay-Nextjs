"use client";

import { useState } from "react";
import { LoadMore } from "components/LoadMore";
import { VideoPlayer } from "components/VideoPlayer";
import { AnimeCard } from "components/AnimeCard";

interface HomeProps {
    initialData: any[];
}

const HomeClient = ({ initialData }: HomeProps) => {
    const [selectedAnime, setSelectedAnime] = useState<any>(null);

    const handleAnimeClick = (anime: any) => {
        setSelectedAnime(anime);
    };

    const handleClosePlayer = () => {
        setSelectedAnime(null);
    };

    return (
        <>
            <main className="flex flex-col gap-10 px-8 py-16 sm:p-16">
                <h2 className="text-3xl font-bold text-white">Explore Anime</h2>

                <section className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {initialData.map((anime, index) => (
                        <AnimeCard
                            key={anime.id}
                            anime={anime}
                            index={index}
                            onAnimeClick={handleAnimeClick}
                        />
                    ))}
                </section>

                <LoadMore onAnimeClick={handleAnimeClick} />
            </main>

            {selectedAnime && <VideoPlayer anime={selectedAnime} onClose={handleClosePlayer} />}
        </>
    );
};

const Home = async () => {
    const response = await fetch(
        `https://shikimori.one/api/animes?page=1&limit=8&order=popularity`
    );
    const data = await response.json();

    return <HomeClient initialData={data} />;
};

export default Home;
