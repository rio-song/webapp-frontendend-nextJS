import { Button, Modal, Form } from 'react-bootstrap'
import { useRef } from 'react';
import { Login } from '../type/api';
import { useState, useEffect } from 'react'

export default function LoginPage(props) {

    const [statusCode, setStatusCode] = useState();
    const [result, setResult] = useState();
    const [isError, setIsError] = useState(false);
    const [errorContent, setErrorContent] = useState("");

    const show = props.loginPopShow;
    const handleClose = () => {
        props.setLoginPopShow(false)
        setIsError(false)
    };
    const handleResisterUser = () => {
        props.setLoginPopShow(false);
        props.setResisterUserPopShow(true);
    }
    const passwordRef = useRef(null);
    const emailRef = useRef(null);

    const login = () => {

        async function fetchData() {
            const result = await Login(emailRef.current.value, passwordRef.current.value, setStatusCode);
            setResult(result);
            return result
        }
        fetchData()
    }

    useEffect(() => {
        if (result && (statusCode === 200 || statusCode === 201)) {
            props.setLoginPopShow(false);
            props.setLoginStatus(true);
        } else {
            setIsError(true);
            setErrorContent(result);
        }
    }, [statusCode, result])



    return (
        < Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>ログイン</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label >Email</Form.Label>
                        <Form.Control
                            ref={emailRef}
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label >Password</Form.Label>
                        <Form.Control
                            ref={passwordRef}
                            type="password"
                            placeholder=""
                            autoFocus
                        />
                    </Form.Group>
                </Form>
                {isError ? (errorContent) : (<></>)}
                <br></br>
                <Button onClick={handleResisterUser}>
                    <a>新規登録</a>
                </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={login}>
                    ログイン
                </Button>
            </Modal.Footer>
        </Modal >
    );
}