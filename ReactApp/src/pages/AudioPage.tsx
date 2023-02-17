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
        allAudioLoading,
        newAudioLoad,
        data,
        fileName,
        inputFileHandler,
        mutate,
    } = useAudioPage();

    if (allAudioLoading || newAudioLoad) {
        return (
            <div className='loader__position'>
                <div className="loader"></div>
            </div>
        );
    }

    if (!data) {
        navigate('/');
        return null;
    }

    return (
        <div className={ style.pageWrap }>
            <div className={ style.playerWrap }>
                <div className={ style.player }>
                    <AudioPlayer paths={ data.data }/>
                </div>
                <div className={ style.playList }>
                    {data.data.map((path, i) => <AudioItem key={ i } path={ path }/>)}
                </div>
            </div>
            <Button
                label='return home'
                type='button'
                onClick={ () => navigate('/') }
            />
            <AudioUpload
                newAudioLoad={ newAudioLoad }
                mutate={ mutate }
                fileName={ fileName }
                inputFileHandler={ inputFileHandler }
            />
        </div>
    );
}
