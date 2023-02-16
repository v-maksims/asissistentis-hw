import { useRef } from 'react';

import Button from '../../Buttons/button/Button';
import InputFile from '../../inputs/inputFile/InputFile';
import style from './AudioUpload.module.scss';
import useToasts from '../../../hooks/useToasts';

type TAudioUploadProps = {
    newAudioLoad: boolean,
    mutate: any,
    fileName: string,
    inputFileHandler: (name: string) => void,
}

export default function AudioUpload (props: TAudioUploadProps) {
    const {
        newAudioLoad,
        mutate,
        fileName,
        inputFileHandler,
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const { toastErrorHandler } = useToasts();

    const files = inputRef.current?.files;

    return (
        <>
            {!newAudioLoad && <div className={ style.uploadWrap }>
                <span className={ style.uploadText }>Upload audio files:</span>
                <form
                    className={ style.form }
                    onSubmit={ (e) => {
                        e.preventDefault();
                        const formData = new FormData();
                        for (const file of files!) {
                            formData.append('audio', file);
                        }
                        if (files!.length > 10 || files!.length === 0) {
                            toastErrorHandler('Min 1 and max 10 audio', 5000, 'top-right');
                        } else {
                            mutate(formData);
                        }
                    } }>
                    <div className={ style.inputWrap }>
                        <InputFile
                            inputRef = { inputRef }
                            accept = '.mp3,.aac,.wav'
                            onChange= { inputFileHandler }
                        />
                        <span className={ style.fileName }>{fileName ? `${fileName} files` : ''}</span>
                    </div>
                    <Button
                        label='add'
                        type='submit'
                    />
                </form>
            </div>}
        </>
    );
}
