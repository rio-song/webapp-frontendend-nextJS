import { Button, Modal, Form } from 'react-bootstrap'
import { useRef } from 'react';

export default function LoginPage(props) {

    const show = props.loginPopShow;
    const handleClose = () => { props.setLoginPopShow(false) };
    const handleResisterUser = () => {
        props.setLoginPopShow(false);
        props.setResisterUserPopShow(true);
    }
    const passwordRef = useRef(null);
    const emailRef = useRef(null);

    const login = () => {

        async function fetchData() {
            const login = await Login(passwordRef.current.value, emailRef.current.value);
            localStorage.setItem('token', login.Login.token);
            localStorage.setItem('userId', login.Login.userId);
        }
        fetchData()
        props.setLoginPopShow(false);
        props.setLoginStatus(true);
    }


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
async function Login(email, password) {

    var SHA256 = require("crypto-js/sha256");
    const hash = SHA256(password).toString();

    const url = "http://localhost:8000/api/login?email=" + email + "&password=" + hash;

    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            //  'Access-Control-Allow-Origin': 'http://localhost:8000'
        },
    }

    const response = await fetch(url, request);
    const posts = await response.json()

    return posts
}