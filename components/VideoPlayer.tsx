"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface VideoPlayerProps {
    anime: any;
    onClose: () => void;
}

export const VideoPlayer = ({ anime, onClose }: VideoPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [showControls, setShowControls] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const controlsTimeoutRef = useRef<NodeJS.Timeout>();

    // Demo YouTube video ID
    const videoId = "1iQnFZorcOw";
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0`;

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
            setShowControls(false);
        }, 3000);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => document.removeEventListener("keydown", handleKeyPress);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
            <div className="relative mx-auto flex h-full w-full max-w-7xl">
                {/* Video Section */}
                <div className="relative flex-1 bg-black" onMouseMove={handleMouseMove}>
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className={`absolute right-4 top-4 z-10 rounded-full bg-black bg-opacity-50 p-2 text-white transition-all duration-300 hover:bg-opacity-75 ${
                            showControls ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    {/* Video Player */}
                    <div className="flex h-full w-full items-center justify-center">
                        <iframe
                            src={embedUrl}
                            className="h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>

                    {/* Custom Controls Overlay (Crunchyroll-inspired) */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 transition-all duration-300 ${
                            showControls ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        {/* Progress Bar */}
                        <div className="mb-4">
                            <div className="h-1 w-full rounded-full bg-gray-600">
                                <div
                                    className="h-1 rounded-full bg-orange-500"
                                    style={{ width: "30%" }}
                                ></div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button className="text-white transition-colors hover:text-orange-500">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </button>
                                <button className="text-white transition-colors hover:text-orange-500">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M11 7H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h5l6 4V3l-6 4z" />
                                    </svg>
                                </button>
                                <span className="text-sm text-white">0:30 / 24:15</span>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button className="text-white transition-colors hover:text-orange-500">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                        <line x1="8" y1="21" x2="16" y2="21" />
                                        <line x1="12" y1="17" x2="12" y2="21" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Anime Title Overlay */}
                    <div
                        className={`absolute left-6 top-6 transition-all duration-300 ${
                            showControls ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <h1 className="mb-2 text-2xl font-bold text-white">{anime.name}</h1>
                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                            <span className="rounded bg-orange-500 px-2 py-1 text-xs font-bold text-white">
                                {anime.kind}
                            </span>
                            <span>Episode 1</span>
                            <span>•</span>
                            <span>24:15</span>
                        </div>
                    </div>
                </div>

                {/* Recommendations Sidebar */}
                <div className="w-80 overflow-y-auto border-l border-gray-800 bg-[#0B0E13]">
                    <div className="p-6">
                        <h3 className="mb-4 text-lg font-bold text-white">Up Next</h3>

                        {/* Next Episode */}
                        <div className="mb-6">
                            <div className="relative mb-3 h-32 w-full overflow-hidden rounded-lg">
                                <Image
                                    src={`https://shikimori.one${anime.image.original}`}
                                    alt="Next Episode"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                                <div className="absolute bottom-2 right-2 rounded bg-black bg-opacity-75 px-2 py-1 text-xs text-white">
                                    24:15
                                </div>
                            </div>
                            <h4 className="mb-1 text-sm font-semibold text-white">Episode 2</h4>
                            <p className="line-clamp-2 text-xs text-gray-400">{anime.name}</p>
                        </div>

                        <h3 className="mb-4 text-lg font-bold text-white">Recommended</h3>

                        {/* Recommended Items */}
                        {[1, 2, 3, 4].map(item => (
                            <div
                                key={item}
                                className="mb-4 flex cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-800"
                            >
                                <div className="relative mr-3 h-12 w-20 flex-shrink-0 overflow-hidden rounded">
                                    <Image
                                        src={`https://shikimori.one${anime.image.original}`}
                                        alt={`Recommendation ${item}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="mb-1 line-clamp-1 text-sm font-medium text-white">
                                        Similar Anime {item}
                                    </h4>
                                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                                        <span className="rounded bg-gray-700 px-2 py-0.5">
                                            {anime.kind}
                                        </span>
                                        <span>★ {anime.score}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
