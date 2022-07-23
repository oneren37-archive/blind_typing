import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import style from './Start.module.css'

function Start() {
    const [secondsToStart, setSecondsToStart] = useState<number>(3);
    const [status, setStatus] = useState<'unready' | 'countdown' | 'start'>('unready');

    const countDown = () => {
        setStatus('countdown');

        const timerId = setInterval(() => {
            setSecondsToStart(secondsToStart => secondsToStart - 1)
        }, 1000);

        setTimeout(() => {
            clearInterval(timerId);
            setStatus('start');
        }, 1000 * secondsToStart);
    }

    return (
        <div className={style.start}>
            {status === 'unready' && (
                <Button variant="primary" size="lg" onClick={countDown}>Вперед</Button>
            )}

            {status === 'countdown' && (
                <h1 className={style.countDown}>{secondsToStart}</h1>
            )}

            {status === 'start' && ( <span>Стартуем</span>)}
        </div>
    );
}

export default Start;
