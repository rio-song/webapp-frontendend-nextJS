import { Button, Modal, Form } from 'react-bootstrap'
import { useRef } from 'react';
import { registerUserInfo } from '../type/api'
import { useState, useEffect } from 'react'


export default function ResisterUser(props) {

    const [statusCode, setStatusCode] = useState();
    const [result, setResult] = useState();
    const [isError, setIsError] = useState(false);
    const [errorContent, setErrorContent] = useState("");

    const show = props.resisterUserPopShow;
    const handleClose = () => { props.setResisterUserPopShow(false) };

    //新規登録
    const familyNameRef = useRef(null);
    const firstNameRef = useRef(null);
    const nickNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const registerUser = () => {
        async function fetchData() {
            const result = await registerUserInfo(familyNameRef.current.value,
                firstNameRef.current.value, nickNameRef.current.value,
                emailRef.current.value, passwordRef.current.value, setStatusCode);
            setResult(result);
        }
        fetchData()
    }

    useEffect(() => {
        if (statusCode === 200 || statusCode === 201) {
            props.setResisterUserPopShow(false);
        } else {
            setIsError(true);
            setErrorContent(result);
        }
    }, [statusCode, result])

    return (
        < Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>新規登録</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label >お名前(姓)</Form.Label>
                        <Form.Control
                            ref={familyNameRef}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>お名前(名)</Form.Label>
                        <Form.Control
                            ref={firstNameRef}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label >ニックネーム</Form.Label>
                        <Form.Control
                            ref={nickNameRef}
                            autoFocus
                        />
                    </Form.Group>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={registerUser}>
                    登録
                </Button>
            </Modal.Footer>
        </Modal >
    );
}