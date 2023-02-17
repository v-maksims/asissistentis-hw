import { useState, useRef } from 'react';
import useCalculateTime from '../../../hooks/useCalculateTime';

type TAudioItemProps ={
    path: string
}

export default function AudioItem (props: TAudioItemProps) {
    const { path } = props;

    const audioRef = useRef<HTMLAudioElement>(null);

    const [duration, setDuration] = useState(0);
    const { calculateTime } = useCalculateTime();

    const replace = path.replace('/static/audio/', '');
    const result = `${replace} - (${calculateTime(duration)})`;

    return (
        <>
            <div>
                {result}
            </div>
            <div>
                <audio
                    ref={audioRef}
                    src={`http://localhost:3004${path}`}
                    onLoadedData ={() => setDuration(audioRef.current!.duration)}
                >
                </audio>
            </div>
        </>
    );
}
