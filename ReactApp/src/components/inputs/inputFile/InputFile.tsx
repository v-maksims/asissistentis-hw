import React from 'react';
import style from './InputFile.module.scss';

type TInputFileProps = {
    inputRef: React.RefObject<HTMLInputElement>,
    accept: string,
    onChange: (count: number) => void
}

export default function InputFile (props:TInputFileProps) {
    const { inputRef, accept, onChange } = props;
    return (
        <>
            <input
                ref={inputRef}
                className={style.input}
                type="file"
                accept={accept}
                name='file'
                id='file'
                onChange={() => onChange(inputRef.current!.files!.length)}
                multiple
            />
            <label
                className={style.inputFake}
                htmlFor="file"
            >
                   +
            </label>
        </>
    );
}
