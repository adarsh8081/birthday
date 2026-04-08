'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch((e) => console.log('Audio play failed:', e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <>
            <audio ref={audioRef} loop>
                {/* Add your background music file here */}
                {/* <source src="/music/background.mp3" type="audio/mpeg" /> */}
            </audio>

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 }}
                className="fixed bottom-6 right-6 z-50 flex flex-col gap-2"
            >
                <motion.button
                    onClick={togglePlay}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 bg-primary/80 hover:bg-primary text-white rounded-full backdrop-blur shadow-lg transition-all active:scale-90 touch-manipulation glow-border"
                    data-testid="music-player-toggle"
                >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
                </motion.button>

                {isPlaying && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        onClick={toggleMute}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-dark-card/80 hover:bg-dark-card text-white rounded-full backdrop-blur shadow-lg transition-all active:scale-90 touch-manipulation"
                        data-testid="music-mute-toggle"
                    >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </motion.button>
                )}
            </motion.div>
        </>
    );
}
