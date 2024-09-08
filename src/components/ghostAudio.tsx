"use client"
import React, { useEffect, useRef } from 'react';

// Utility functions to get random values
const oneTwoS = () => {
    return Math.random() < 0.6 ? 1000 : 2000;
}

const getNum = () => {
    if (Math.random() < 0.33) return "0";
    if (Math.random() < 0.66) return "1";
    return "2";
}

interface AudioPlayerProps {
    play: boolean; // Prop to control audio play/pause
}

const AudioPlayer = ({ play }: {play: boolean}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create and configure audio element
    const audio = document.createElement('audio');
    audio.autoplay = true;
    audio.loop = true;
    audioRef.current = audio;

    const source = document.createElement('source');
    source.src = `/audio/ghost${getNum()}.mp3`;
    source.type = 'audio/mpeg';
    audio.appendChild(source);
    document.body.appendChild(audio);

    // Cleanup function to remove audio element
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (play) {
        audioRef.current.play().catch(error => {
          console.error("Failed to play audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [play]);

  return null;
};

export default AudioPlayer;
