"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { fetchAnime } from "app/action";

let page = 2;

export const LoadMore = () => {
    const { ref, inView } = useInView();
    const [data, setData] = useState<JSX.Element[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (inView) {
            setIsLoading(true);
            // Add a delay of 500 milliseconds
            const delay = 500;

            const timeoutId = setTimeout(async () => {
                const res = await fetchAnime(page);
                setData([...data, ...res]);
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
                {data}
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
