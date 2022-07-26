import style from './Main.module.css'
import {useState} from "react";

export interface IMainProps {
    text: string,
    onFinish(res:any):void
}

const Main = (props: IMainProps) => {
    const [words] = useState<string[]>(
        props.text.split(' ').map((e, i, arr) => i !== arr.length-1 ? e + ' ' : e)
    )

    const [currWordIndex, setCurrWordIndex] = useState<number>(0)
    const [inWords, setInWords] = useState<string>(props.text)
    const [outWords, setOutWords] = useState<string>('')
    const [inText, setInText] = useState<string>(props.text)
    const [outText, setOutText] = useState  <string>('')

    const [inputVal, setInputVal] = useState<string>('')
    const [inputError, setInputError] = useState<boolean>(false)
    const [errorsCount, setErrorsCount] = useState<number>(0)

    const [startTime] = useState<Date>(new Date())

    const onFinishTyping = () => {
        props.onFinish({
            speed: getSpeed(),
            mistakes: getMistakes()
        });
    }

    // @ts-ignore
    const getSpeed = () => Math.floor(props.text.length * 1000 * 60 / (new Date() - startTime).valueOf())
    const getMistakes = () => Math.floor(errorsCount * 1000 / props.text.length) / 10

    const onInputChange = (e: any) => {
        e.preventDefault()

        const val = e.target.value
        const prev = inputVal
        setInputVal(val)

        if (words[currWordIndex].indexOf(val) === 0) {
            if (val === words[currWordIndex]) {
                setOutWords(s => s+words[currWordIndex])
                setInWords(s => s.substring(words[currWordIndex].length))

                setInputVal('')

                currWordIndex === words.length-1 && onFinishTyping()
                setCurrWordIndex(state => state + 1)
            }

            setOutText(outWords + val)
            setInText(inWords.substring(val.length))

            setInputError(false)
        }
        else {
            if (prev.length < val.length) setErrorsCount(s => s+1)
            setInputError(true)
        }
    }

    return (
        <main className={style.mainContainer}>
            <div className={style.text}>
                <span className={style.out}>{outText}</span>
                <span className={style.in}>{inText}</span>
            </div>
            <input
                className={style.input + ' ' + (inputError ? style.error : '')}
                onChange={onInputChange}
                value={inputVal}
                autoFocus
                type="text"
            />
        </main>
    )
}

export default Main
