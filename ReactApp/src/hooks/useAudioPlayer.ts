import React, { useRef, useState } from 'react';

export default function useAudioPlayer (paths:string[]) {
    const audioRef = useRef<HTMLAudioElement>(null);

    const [current, setCurrent] = useState(0);
    const [play, setPlay] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(100);
    const [audioLoaded, setAudioLoaded] = useState(false);

    const playing = () => {
        setTimeout(() => audioRef.current?.play(), 100);
        setPlay(true);
    };

    const stoping = () => {
        audioRef.current?.pause();
        setPlay(false);
    };

    const nextHandler = () => {
        if (current === paths.length - 1) {
            setCurrent(0);
        } else {
            setCurrent(current + 1);
        }
        playing();
    };

    const previousHandler = () => {
        playing();
        if (current === 0) {
            setCurrent(paths.length - 1);
        } else {
            setCurrent(current - 1);
        }
    };

    const playHandler = () => {
        if (play) {
            stoping();
        } else {
            playing();
        }
    };

    const stopHandler = () => {
        stoping();
        audioRef.current!.currentTime = 0;
        setCurrentTime(0);
        setPlay(false);
    };

    const audioPlaySpeed = (speed: number) => {
        audioRef.current!.playbackRate = speed;
    };

    const timeLineHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        audioRef.current!.currentTime = Math.floor(+e.currentTarget.value);
    };

    const volumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(+e.currentTarget.value);
        audioRef.current!.volume = +e.currentTarget.value / 100;
    };

    const onLoadedData = () => {
        setDuration(audioRef.current!.duration);
        setAudioLoaded(true);
    };

    const onTimeUpdate = () => {
        setCurrentTime(audioRef.current!.currentTime);
    };

    return {
        audioRef,
        previousHandler,
        audioLoaded,
        current,
        nextHandler,
        onLoadedData,
        onTimeUpdate,
        play,
        playHandler,
        stopHandler,
        currentTime,
        duration,
        timeLineHandler,
        volume,
        volumeHandler,
        audioPlaySpeed,
    };
}
