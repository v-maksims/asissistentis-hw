import { useEffect } from 'react';
import {
    MdNavigateNext,
    MdNavigateBefore,
    MdPlayArrow,
    MdPause,
    MdStop,
    MdVolumeOff,
    MdVolumeDown,
    MdVolumeUp,
} from 'react-icons/md';
import style from './AudioPlayer.module.scss';
import Button from '../../Buttons/button/Button';
import ButtonControl from '../../Buttons/buttonControls/ButtonControl';
import InputRange from '../../inputs/inputRange/InputRange';
import useAudioPlayer from '../../../hooks/useAudioPlayer';
import useCalculateTime from '../../../hooks/useCalculateTime';

type TAudioPlayerProps = {
    paths:string[]
}

export default function AudioPlayer (props: TAudioPlayerProps) {
    const baseURL = 'http://localhost:3004';

    const { paths } = props;

    const {
        audioRef,
        audioLoaded,
        current,
        previousHandler,
        nextHandler,
        onLoadedData,
        onTimeUpdate,
        currentTime,
        play,
        playHandler,
        stopHandler,
        duration,
        timeLineHandler,
        audioPlaySpeed,
        volume,
        volumeHandler,
    } = useAudioPlayer(paths);

    const { calculateTime } = useCalculateTime();

    useEffect(() => {
        function handleKeyDown (e: KeyboardEvent) {
            if (e.code === 'Space') {
                e.preventDefault();
                playHandler();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [play]);

    return (
        <div className={ style.audioPlayerWrap }>
            <div className={ style.audioTextAndNextPrevios }>
                <ButtonControl
                    ico={ <MdNavigateBefore size={ 45 }/> }
                    onClick={ previousHandler }
                    type='button'
                />
                <span className={ style.audio }>{audioLoaded && paths[current].replace('/static/audio/', '')}</span>
                <ButtonControl
                    ico={ <MdNavigateNext size={ 45 }/> }
                    onClick={ nextHandler }
                    type='button'
                />
            </div>
            <div>
                <audio
                    src={ `${baseURL}${paths[current]}` }
                    ref={ audioRef }
                    onLoadedData={ onLoadedData }
                    onTimeUpdate={ onTimeUpdate }
                    onEnded={ nextHandler }
                ></audio>
            </div>
            <div className={ style.controlsWrap }>
                <ButtonControl
                    type='button'
                    ico={ play ? <MdPause size={ 30 }/> : <MdPlayArrow size={ 30 }/> }
                    onClick={ playHandler }
                />
                <ButtonControl
                    type='button'
                    ico={ <MdStop size={ 30 }/> }
                    onClick={ stopHandler }
                />
                <span className={ style.time }>{calculateTime(currentTime)}</span>
                <InputRange
                    value={ currentTime }
                    min={ 0 }
                    max={ duration }
                    onChange={ timeLineHandler }
                />
                <span className={ style.time }>{calculateTime(duration)}</span>
                <div>
                    {volume === 0 && <MdVolumeOff/> }
                    {(volume > 0 && volume < 50) && <MdVolumeDown/> }
                    {(volume > 50) && <MdVolumeUp/> }
                </div>
                <InputRange
                    value={ volume }
                    min={ 0 }
                    max={ 100 }
                    onChange={ volumeHandler }
                />
            </div>
            <span>Speed:</span>
            <div className={ style.speedControls }>
                <Button label='0.25' type='button' onClick={ () => audioPlaySpeed(0.25) }/>
                <Button label='0.5' type='button' onClick={ () => audioPlaySpeed(0.5) }/>
                <Button label='normal' type='button' onClick={ () => audioPlaySpeed(1) }/>
                <Button label='1.25' type='button' onClick={ () => audioPlaySpeed(1.25) }/>
                <Button label='1.50' type='button' onClick={ () => audioPlaySpeed(1.5) }/>
                <Button label='1.75' type='button' onClick={ () => audioPlaySpeed(1.75) }/>
                <Button label='2' type='button' onClick={ () => audioPlaySpeed(2) }/>
            </div>
        </div>
    );
}
