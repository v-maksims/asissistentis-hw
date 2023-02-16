import React from 'react';
import style from './InputRange.module.scss';

type TInputRangeProps ={
    min: number,
    max: number,
    value: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function InputRange (props: TInputRangeProps) {
    const {
        max,
        min,
        value,
        onChange,
    } = props;
    return (
        <>
            <input
                className={ style.range }
                type="range"
                value={ value }
                min={ min }
                max={ max }
                onChange={ onChange }
            />
        </>
    );
}
