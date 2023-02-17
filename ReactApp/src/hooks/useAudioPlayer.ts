import React, { useRef, useState } from 'react';

type TPlayerState = {
    current:number;
    play: boolean;
    duration: number;
    currentTime: number;
    volume: number;
    audioLoaded: boolean;
}

export default function useAudioPlayer (paths:string[]) {
    const audioRef = useRef<HTMLAudioElement>(null);

    const [player, setPlayer] = useState<TPlayerState>({
        current: 0,
        play: false,
        duration: 0,
        currentTime: 0,
        volume: 100,
        audioLoaded: false,
    });

    const {
        audioLoaded,
        current,
        currentTime,
        duration,
        play,
        volume,
    } = player;

    const playing = () => {
        setTimeout(() => audioRef.current?.play(), 100);
        setPlayer({ ...player, play: true });
    };

    const stoping = () => {
        audioRef.current?.pause();
        setPlayer({ ...player, play: false });
    };

    const nextHandler = () => {
        playing();
        if (current === paths.length - 1) {
            return setPlayer({ ...player, current: 0, play: true });
        }
        return setPlayer({ ...player, current: current + 1, play: true });
    };

    const previousHandler = () => {
        playing();
        if (current === 0) {
            return setPlayer({ ...player, current: paths.length - 1, play: true });
        }
        return setPlayer({ ...player, current: current - 1, play: true });
    };

    const playHandler = () => {
        if (play) {
            return stoping();
        }
        return playing();
    };

    const stopHandler = () => {
        stoping();
        audioRef.current!.currentTime = 0;
        setPlayer({ ...player, play: false, currentTime: 0 });
    };

    const audioPlaySpeed = (speed: number) => {
        audioRef.current!.playbackRate = speed;
    };

    const timeLineHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        audioRef.current!.currentTime = Math.floor(+e.currentTarget.value);
    };

    const volumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlayer({ ...player, volume: +e.currentTarget.value });
        audioRef.current!.volume = +e.currentTarget.value / 100;
    };

    const onLoadedData = () => {
        setPlayer({ ...player, duration: audioRef.current!.duration, audioLoaded: true });
    };

    const onTimeUpdate = () => {
        setPlayer({ ...player, currentTime: audioRef.current!.currentTime });
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
