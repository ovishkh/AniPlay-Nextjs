"use client";

import Image from "next/image";
import { MotionDiv } from "./MotionDiv";

const stagger = 0.25;

const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

interface AnimeCardProps {
    anime: any;
    index: number;
    onAnimeClick: (anime: any) => void;
}

export const AnimeCard = ({ anime, index, onAnimeClick }: AnimeCardProps) => (
    <MotionDiv
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{
            delay: index * stagger,
            ease: "easeInOut",
            duration: 0.5
        }}
        viewport={{ amount: 0 }}
        className="relative w-full max-w-sm cursor-pointer rounded transition-transform duration-300 hover:scale-105"
        onClick={() => onAnimeClick(anime)}
    >
        <div className="relative h-[37vh] w-full">
            <Image
                src={`https://shikimori.one${anime.image.original}`}
                alt={anime.name}
                fill
                className="rounded-xl object-cover"
            />
            {/* Play button overlay */}
            <div className="group absolute inset-0 flex items-center justify-center rounded-xl bg-black bg-opacity-0 transition-all duration-300 hover:bg-opacity-40">
                <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="rounded-full bg-orange-500 p-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-3 py-4">
            <div className="flex items-center justify-between gap-1">
                <h2 className="line-clamp-1 w-full text-xl font-bold text-white">{anime.name}</h2>
                <div className="rounded-sm bg-[#161921] px-2 py-1">
                    <p className="text-sm font-bold capitalize text-white">{anime.kind}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex flex-row items-center gap-2">
                    <Image
                        src="./episodes.svg"
                        alt="episodes"
                        width={20}
                        height={20}
                        className="object-contain"
                    />
                    <p className="text-base font-bold text-white">
                        {anime.episodes || anime.episodes_aired}
                    </p>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <Image
                        src="./star.svg"
                        alt="star"
                        width={18}
                        height={18}
                        className="object-contain"
                    />
                    <p className="text-base font-bold text-[#FFAD49]">{anime.score}</p>
                </div>
            </div>
        </div>
    </MotionDiv>
);
