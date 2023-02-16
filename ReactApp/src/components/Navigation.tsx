import { NavLink } from 'react-router-dom';

type TNavigationProps = {
    label: string,
    to: string,
}

export default function Navigation (props: TNavigationProps) {
    const { label, to } = props;

    return (
        <NavLink
            className='nav-link'
            to={ to }
        >
            <span>{label}</span>
        </NavLink>
    );
}
