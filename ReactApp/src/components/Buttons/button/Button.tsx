import style from './Button.module.scss';

type TButtonProps = {
    onClick?: () => void,
    label: string,
    type: 'submit' | 'button'
}

export default function Button (props: TButtonProps) {
    const {
        label,
        onClick,
        type,
    } = props;
    return (
        <>
            <button
                className={ style.button }
                onClick={ onClick }
                type={ type }
            >
                {label}
            </button>
        </>
    );
}
