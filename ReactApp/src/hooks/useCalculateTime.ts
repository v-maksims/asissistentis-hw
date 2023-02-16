export default function useCalculateTime () {
    const calculateTime = (sec: number) => {
        const minutes = Math.floor(sec / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const seconds = Math.floor(sec % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${returnedMinutes}:${returnedSeconds}`;
    };

    return {
        calculateTime,
    };
}
