import style from './Results.module.css'
import Button from "react-bootstrap/Button";
import React from "react";

export interface IResults {
    speed: number,
    mistakes: number,
    onRefresh():void
}

const Results = (props: IResults) => {
    return (
        <div className={style.results}>
            <div className={style.speed}>
                <span className={style.value}>{props.speed}</span> символов в минуту
            </div>
            <div className={style.mistakes}>
                <span className={style.value}>{props.mistakes}%</span> ошибок
            </div>

            <Button variant="primary" size="lg" onClick={props.onRefresh}>Заново</Button>
        </div>
    )
}

export default Results
