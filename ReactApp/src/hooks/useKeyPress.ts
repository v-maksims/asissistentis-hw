import React, { useEffect, useState } from 'react';

export default function useKeyPress (keyTarget:React.KeyboardEvent) {
    const [keyPressed, setKeyPressed] = useState(false);

    const downHandler = ({ key }) => {
        console.log('yes');
        if (key === keyTarget) {
            setKeyPressed(true);
        }
    };
    const upHandler = ({ key }) => {
        if (key === keyTarget) {
            setKeyPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
        };
    }, []);
}
