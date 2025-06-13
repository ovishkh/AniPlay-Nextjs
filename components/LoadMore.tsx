"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { AnimeCard } from "./AnimeCard";

let page = 2;

interface LoadMoreProps {
    onAnimeClick: (anime: any) => void;
}

export const LoadMore = ({ onAnimeClick }: LoadMoreProps) => {
    const { ref, inView } = useInView();
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (inView) {
            setIsLoading(true);
            // Add a delay of 500 milliseconds
            const delay = 500;

            const timeoutId = setTimeout(async () => {
                const response = await fetch(
                    `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`
                );
                const newAnimes = await response.json();
                setData([...data, ...newAnimes]);
                page++;

                setIsLoading(false);
            }, delay);

            // Clear the timeout if the component is unmounted or inView becomes false
            return () => clearTimeout(timeoutId);
        }
    }, [inView, data, isLoading]);

    return (
        <>
            <section className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data.map((anime, index) => (
                    <AnimeCard
                        key={anime.id}
                        anime={anime}
                        index={index}
                        onAnimeClick={onAnimeClick}
                    />
                ))}
            </section>

            <section className="flex w-full items-center justify-center">
                <div ref={ref}>
                    {inView && isLoading && (
                        <Image
                            src="./spinner.svg"
                            alt="spinner"
                            width={56}
                            height={56}
                            className="object-contain"
                        />
                    )}
                </div>
            </section>
        </>
    );
};
