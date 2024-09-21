"use client"
import React, { useEffect, useRef } from 'react';

// Utility functions to get random values
const oneTwoS = () => {
    return Math.random() < 0.6 ? 1000 : 2000;
}

const getNum = (name: string) => {
  if (name !== "nothing") return name
  if (Math.random() < 0.33) return "ghost0";
  if (Math.random() < 0.66) return "ghost1";
  return "ghost2";
}

interface AudioPlayerProps {
    play: boolean; // Prop to control audio play/pause
}

const AudioPlayer = ({ play, name }: {play: boolean, name: string}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create and configure audio element
    const audio = document.createElement('audio');
    audio.autoplay = true;
    audio.loop = true;
    audio.volume = Math.random() * 0.1;
    audioRef.current = audio;

    const source = document.createElement('source');
    source.src = `/audio/${getNum(name)}.mp3`;
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
  }, [name]);

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
