import style from './Button.module.scss';

type TButtonProps = {
    onClick?: () => void;
    label: string;
    type: 'submit' | 'button';
    disabled?: boolean;
}

export default function Button (props: TButtonProps) {
    const {
        label,
        onClick,
        type,
        disabled,
    } = props;

    return (
        <>
            <button
                className={style.button}
                onClick={onClick}
                type={type}
                disabled={disabled}
            >
                {label}
            </button>
        </>
    );
}
