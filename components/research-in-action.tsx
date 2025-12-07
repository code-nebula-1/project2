"use client";

import { useState, useRef, useEffect } from "react";
import { RESEARCH_VIDEOS } from "@/lib/constants";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ResearchInAction() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    useEffect(() => {
        // Pause all videos first
        videoRefs.current.forEach((video, index) => {
            if (video && index !== activeIndex) {
                video.pause();
                video.currentTime = 0;
            }
        });

        // Play the active video if user wants it playing
        const currentVideo = videoRefs.current[activeIndex];
        if (currentVideo) {
            if (isPlaying) {
                const playPromise = currentVideo.play();
                if (playPromise !== undefined) {
                    playPromise.catch((err) => {
                        console.log("Playback prevented:", err);
                        // Don't set isPlaying to false on autoplay, just let it fail silently
                    });
                }
            } else {
                currentVideo.pause();
            }
        }
    }, [activeIndex, isPlaying]);

    const togglePlay = () => {
        if (!hasInteracted) {
            setHasInteracted(true);
        }
        setIsPlaying(!isPlaying);
    };

    const nextVideo = () => {
        if (!hasInteracted) {
            setHasInteracted(true);
        }
        setActiveIndex((prev) => (prev + 1) % RESEARCH_VIDEOS.length);
    };

    const prevVideo = () => {
        if (!hasInteracted) {
            setHasInteracted(true);
        }
        setActiveIndex(
            (prev) => (prev - 1 + RESEARCH_VIDEOS.length) % RESEARCH_VIDEOS.length
        );
    };

    const handleThumbnailClick = (index: number) => {
        if (!hasInteracted) {
            setHasInteracted(true);
        }
        setActiveIndex(index);
        setIsPlaying(true);
    };

    return (
        <section className="py-24 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Research in Action</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Witness our cutting-edge research breakthroughs in real-time. From
                        autonomous systems to human-robot collaboration, see innovation come
                        to life.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* Video Player */}
                    <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl">
                        <div className="aspect-video relative">
                            {RESEARCH_VIDEOS.map((video, index) => (
                                <div
                                    key={video.id}
                                    className={cn(
                                        "absolute inset-0 transition-opacity duration-700",
                                        index === activeIndex
                                            ? "opacity-100 z-10"
                                            : "opacity-0 z-0"
                                    )}
                                >
                                    <video
                                        ref={(el) => {
                                            videoRefs.current[index] = el;
                                        }}
                                        src={video.url}
                                        poster={video.fallback}
                                        loop
                                        muted
                                        playsInline
                                        preload="metadata"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}

                            {/* Video Controls Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20 flex flex-col justify-end p-8">
                                <div className="mb-4">
                                    <h3 className="text-white text-2xl font-bold mb-2">
                                        {RESEARCH_VIDEOS[activeIndex].title}
                                    </h3>
                                    <p className="text-white/90 text-sm max-w-2xl">
                                        {RESEARCH_VIDEOS[activeIndex].description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Button
                                            onClick={togglePlay}
                                            size="admin-icon"
                                            variant="secondary"
                                            className="rounded-full h-12 w-12 bg-white/90 hover:bg-white"
                                        >
                                            {isPlaying ? (
                                                <Pause className="h-5 w-5" />
                                            ) : (
                                                <Play className="h-5 w-5 ml-0.5" />
                                            )}
                                        </Button>

                                        <div className="flex gap-2">
                                            {RESEARCH_VIDEOS.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setActiveIndex(index)}
                                                    className={cn(
                                                        "h-1.5 rounded-full transition-all duration-300",
                                                        index === activeIndex
                                                            ? "w-12 bg-white"
                                                            : "w-8 bg-white/40 hover:bg-white/60"
                                                    )}
                                                    aria-label={`Go to video ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            onClick={prevVideo}
                                            size="admin-icon"
                                            variant="ghost"
                                            className="rounded-full h-10 w-10 text-white hover:bg-white/20"
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </Button>
                                        <Button
                                            onClick={nextVideo}
                                            size="admin-icon"
                                            variant="ghost"
                                            className="rounded-full h-10 w-10 text-white hover:bg-white/20"
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Thumbnails */}
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        {RESEARCH_VIDEOS.map((video, index) => (
                            <div
                                key={video.id}
                                onClick={() => handleThumbnailClick(index)}
                                className={cn(
                                    "group relative rounded-lg overflow-hidden transition-all duration-300 border-0",
                                    index === activeIndex
                                        ? "scale-105"
                                        : "hover:scale-102 opacity-60 hover:opacity-100"
                                )}
                            >
                                <div className="aspect-video relative">
                                    <img
                                        src={video.fallback}
                                        alt={video.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                        <p className="text-white text-sm font-medium">
                                            {video.title}
                                        </p>
                                    </div>
                                    {index !== activeIndex && (
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <Play className="h-8 w-8 text-white" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </section>
    );
}

