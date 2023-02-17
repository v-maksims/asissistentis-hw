import { useRef } from 'react';
import Button from '../../Buttons/button/Button';
import InputFile from '../../inputs/inputFile/InputFile';
import style from './AudioUpload.module.scss';
import useToasts from '../../../hooks/useToasts';

type TAudioUploadProps = {
    newAudioLoad: boolean,
    mutate: (data:FormData) => void,
    fileCount: number,
    inputFileHandler: (name: number) => void,
}

export default function AudioUpload (props: TAudioUploadProps) {
    const {
        mutate,
        fileCount,
        inputFileHandler,
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const { toastErrorHandler } = useToasts();

    const files = inputRef.current?.files;

    return (
        <>
            <div className={style.uploadWrap}>
                <span className={style.uploadText}>Upload audio files:</span>
                <form
                    className={style.form}
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData();
                        for (const file of files!) {
                            formData.append('audio', file);
                        }

                        if (files!.length > 10) {
                            return toastErrorHandler('Max 10 audio files', 5000, 'top-right');
                        }
                        return mutate(formData);
                    }}>
                    <div className={style.inputWrap}>
                        <InputFile
                            inputRef = {inputRef}
                            accept = '.mp3,.aac,.wav'
                            onChange= {inputFileHandler}
                        />
                        <span className={style.fileName}>{fileCount ? `${fileCount} files` : ''}</span>
                    </div>
                    <Button
                        label='add'
                        type='submit'
                        disabled={!fileCount}
                    />
                </form>
            </div>
        </>
    );
}
