import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import style from './Start.module.css'

export interface IStartProps {
    onStart():void
}

function Start(props: IStartProps) {
    const [secondsToStart, setSecondsToStart] = useState<number>(3);
    const [status, setStatus] = useState<'unready' | 'countdown' | 'ready'>('unready');

    const countDown = () => {
        setStatus('countdown');

        const timerId = setInterval(() => {
            setSecondsToStart(secondsToStart => secondsToStart - 1)
        }, 1000);

        setTimeout(() => {
            clearInterval(timerId);
            setStatus('ready');
            props.onStart()
        }, 1000 * secondsToStart);
    }

    return (
        <div>
            {status === 'unready' && (
                <Button variant="primary" size="lg" onClick={countDown}>Вперед</Button>
            )}

            {status === 'countdown' && (
                <h1 className={style.countDown}>{secondsToStart}</h1>
            )}
        </div>
    );
}

export default Start;
