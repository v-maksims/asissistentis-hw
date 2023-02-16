import { useState } from 'react';
import Avatar from '../components/Avatar';
import Button from '../components/Buttons/button/Button';
import style from '../styles/AvatarPage.module.scss';

export default function AvatarPage () {
    const [openAvatar, setOpenAvatar] = useState(false);

    return (
        <>
            <div className= { style.avatarWrap }>
                <div>
                    <Button
                        label={ openAvatar ? 'close avatar' : 'open avatar' }
                        type='button'
                        onClick={ () => { setOpenAvatar(!openAvatar); } }
                    />
                </div>
                {openAvatar
                    && <>
                        <span>Choice different parts:</span>
                        <Avatar/>
                    </>
                }
            </div>
        </>
    );
}
