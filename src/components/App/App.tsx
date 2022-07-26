import React, {useEffect, useState} from 'react';
import './App.css';
import Start from "../Start/Start";
import Main from "../Main/Main";
import Results from "../Results/Results";
import {Alert, Button, Spinner, Stack} from "react-bootstrap";

export interface IResponse {
    status: 'success'|'error',
    text: string,
    errorCode?: number
}

export type AppStatusType = 'loading'|'loadError'|'start'|'running'|'results'

function App() {
    const fetchText = () => {
        fetch('https://fish-text.ru/get?format=json&number=1')
            .then(res => {
                if (res.status !== 200) throw new Error('fetch failed')
                return res
            })
            .then(res => res.json())
            .then(res => {
                if (res.errorCode !== undefined) throw new Error('loading error')
                return res
            })
            .then((res: IResponse) => res.text
                .replace(/—/g, '-')
                .replace(/ё/gi, 'е')
            )
            .then((res: string) => {
                setText(res)
                setAppStatus('start')
            })
            .catch(() => setAppStatus("loadError"))
    }

    useEffect(() => fetchText(), [])

    const [appStatus, setAppStatus] = useState<AppStatusType>('loading');
    const [text, setText] = useState<string>('');
    const [result, setResult] = useState<any>(null)

    const onRefresh = () => {
        fetchText();
    }

  return (
    <div className="App">
        {appStatus === 'loading' && (
            <Stack direction="horizontal" gap={3}>
                <Spinner animation="border" variant="primary"/><br/>
                <Alert variant={'primary'}>Текст для печати загружается</Alert>
            </Stack>
        )}
        {appStatus === 'loadError' && (
            <Stack direction="horizontal" gap={3}>
                <Alert variant={'danger'}>Произошла ошибка загрузки текста</Alert>
                <Button variant="primary" size="lg" onClick={onRefresh}>Перезагрузить</Button>
            </Stack>
        )}
        {appStatus === 'start' && <Start onStart={() => setAppStatus('running')} />}
        {appStatus === 'running' && (
            <Main
                text={text}
                onFinish={(res: any) => {
                    setAppStatus('results');
                    setResult(res)
                }}
            />
        )}
        {appStatus === 'results' && <Results {...result} onRefresh={onRefresh} />}
    </div>
  );
}

export default App;
