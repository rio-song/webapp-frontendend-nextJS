import { Button, Modal, Form } from 'react-bootstrap'
import { Login } from '../../lib/api';
import { useState, useEffect, useRef } from 'react'
import utilStyles from '../../styles/utils.module.css'

export default function LoginPage(props) {

    const [statusCode, setStatusCode] = useState();
    const [result, setResult] = useState();
    const [isError, setIsError] = useState(false);
    const [errorContent, setErrorContent] = useState("");

    const show = props.loginPopShow;
    const handleClose = () => {
        props.setLoginPopShow(false)
        setIsError(false)
        setErrorContent("")
    };
    const handleResisterUser = () => {
        props.setLoginPopShow(false);
        props.setResisterUserPopShow(true);
        setIsError(false)
        setErrorContent("")
    }
    const [isEmailValidationError, setIsEmailValidationError] = useState<boolean>(false);
    const [isPWValidationError, setIsPWValidationError] = useState<boolean>(false);

    const loginValidationCheck = () => {
        setIsError(false)
        setErrorContent("")
        setIsEmailValidationError(false)
        setIsPWValidationError(false)

        if (emailRef.current.value.length === 0) {
            setIsEmailValidationError(true)
        }
        if (passwordRef.current.value.length === 0) {
            setIsPWValidationError(true)
        }

        if (
            emailRef.current.value.length != 0 &&
            passwordRef.current.value.length != 0
        ) {
            login()
        }
    }

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const login = () => {
        async function fetchData() {
            const result = await Login(emailRef.current.value, passwordRef.current.value, setStatusCode);
            setResult(result);
        }
        fetchData()
    }

    useEffect(() => {
        if (statusCode === 200 || statusCode === 201) {
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
                        {isEmailValidationError ? (<span className={utilStyles.text_error}>入力してください</span>) : (<></>)}
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
                        {isPWValidationError ? (<span className={utilStyles.text_error}>入力してください</span>) : (<></>)}
                    </Form.Group>
                </Form>
                {isError ? (<span className={utilStyles.text_error}>{errorContent}</span>) : (<></>)}
                <br></br>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleResisterUser}>
                    <a>新規登録</a>
                </Button>
                <Button variant="primary" onClick={loginValidationCheck}>
                    ログイン
                </Button>
            </Modal.Footer>
        </Modal >
    );
}