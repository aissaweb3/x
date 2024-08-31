"use client"
import { useRef, useState, useEffect } from 'react';

const BackgroundAudio = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

    // Effect to handle autoplay based on user's preference
    useEffect(() => {
        const storedPreference = localStorage.getItem('autoPlayEnabled') === 'true';
        setAutoPlayEnabled(storedPreference);

        if (storedPreference && audioRef.current) {
            (audioRef.current as any).play().then(() => {
                setIsPlaying(true);
            }).catch((error: any) => {
                console.log('Autoplay prevented:', error);
            });
        }
    }, []);

    // Toggle playback
    const toggleAudio = () => {
        if (audioRef.current) {
            if (isPlaying) {
                (audioRef.current as any).pause();
            } else {
                (audioRef.current as any).play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Toggle autoplay setting
    const toggleAutoPlay = () => {
        const newAutoPlayEnabled: any = !autoPlayEnabled;
        setAutoPlayEnabled(newAutoPlayEnabled);
        localStorage.setItem('autoPlayEnabled', newAutoPlayEnabled);
    };

    return (
        <div>
            <button onClick={toggleAudio}>
                {isPlaying ? 'Pause Audio' : 'Play Audio'}
            </button>
            <button onClick={toggleAutoPlay}>
                {autoPlayEnabled ? 'Disable Autoplay' : 'Enable Autoplay'}
            </button>
            <audio ref={audioRef} loop autoPlay={autoPlayEnabled}>
                <source src="/audio/ghost.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default BackgroundAudio;
