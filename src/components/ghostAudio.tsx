"use client"
import React, { useEffect } from 'react';

const oneTwoS = () => {
    if (Math.random() < 0.6) return 1000
    return 2000
}

const getNum = () => {
    if (Math.random() < 0.33) return "0"
    if (Math.random() < 0.66) return "1"
    return "2"
}

const AudioPlayer = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const audio = document.createElement('audio');
      audio.autoplay = true;
      audio.loop = true;
      
      const source = document.createElement('source');
      const num = getNum()
      source.src = `/audio/ghost${num}.mp3`;
      source.type = 'audio/mpeg';
      
      audio.appendChild(source);
      document.body.appendChild(audio);
    }, Math.random() * oneTwoS());

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default AudioPlayer;
