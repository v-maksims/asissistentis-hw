import Avatar from '../components/Avatar';
import style from '../styles/AvatarPage.module.scss';

const AvatarPage = () => (
    <div className= { style.avatarWrap }>
        <span>Choice elements:</span>
        <Avatar/>
    </div>
);

export default AvatarPage;
