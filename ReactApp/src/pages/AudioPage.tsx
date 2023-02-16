import { useNavigate } from 'react-router-dom';
import AudioItem from '../components/audioComponents/audioItem/AudioItem';
import AudioPlayer from '../components/audioComponents/audioPlayer/AudioPlayer';
import AudioUpload from '../components/audioComponents/audioUpload/AudioUpload';
import Button from '../components/Buttons/button/Button';
import useAudioPage from '../hooks/useAudioPage';
import style from '../styles/AudioPage.module.scss';

export default function AudioPage () {
    const navigate = useNavigate();
    const {
        allAudio,
        newAudioLoad,
        data,
        fileName,
        inputFileHandler,
        mutate,
        player,
        playerHandler,
    } = useAudioPage();

    if (allAudio || newAudioLoad) {
        return (
            <div className='mover__position'>
                <div className="mover"></div>
            </div>
        );
    }

    if (!data) {
        navigate('/');
        return null;
    }

    return (
        <div className={ style.pageWrap }>
            <AudioUpload
                newAudioLoad={ newAudioLoad }
                mutate={ mutate }
                fileName={ fileName }
                inputFileHandler={ inputFileHandler }
            />
            <div className={ style.playerWrap }>
                {player
                    ? <>
                        <div className={ style.player }>
                            <AudioPlayer paths={ data.data }/>
                        </div>
                        <div className={ style.playList }>
                            {data.data.map((path, i) => <AudioItem key={ i } path={ path }/>)}
                        </div>
                    </>
                    : <Button
                        label='play all files'
                        type='button'
                        onClick={ playerHandler }/>
                }
            </div>
            {player
            && <Button
                label='return'
                type='button'
                onClick={ () => navigate('/') }
            />}
        </div>
    );
}
