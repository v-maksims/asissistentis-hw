import { ReactElement } from 'react';
import style from './ButtonControl.module.scss';

type TButtonControlProps = {
    ico:ReactElement,
    onClick: () => void,
    type: 'button'
}

export default function ButtonControl (props: TButtonControlProps) {
    const {
        ico, onClick, type,
    } = props;
    return (
        <>
            <button
                className={ style.control }
                onClick={ onClick }
                type={ type }
            >
                <>
                    {ico}
                </>
            </button>
        </>
    );
}
