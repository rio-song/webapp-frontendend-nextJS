import { Button, Modal, Form } from 'react-bootstrap'
import { putUser } from '../type/api'
import { useState, useEffect, useRef } from 'react'


export default function EditProfile(props) {
    const show = props.editProfilePopShow;
    const json = props.viewProfileResult.User;
    const handleClose = () => { props.setEditProfilePopShow(false) };
    const handleCloseretuen = () => {
        props.setEditProfilePopShow(false)
        props.setViewProfileShow(true)
    };

    const [result, setResult] = useState();
    const [statusCode, setStatusCode] = useState();
    const [isError, setIsError] = useState(false);
    const [errorContent, setErrorContent] = useState("");

    const familyNameRef = useRef(null);
    const firstNameRef = useRef(null);
    const nickNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const profileTextRef = useRef(null);


    useEffect(() => {
        async function fetchData() {
            const result = await putUser(familyNameRef, firstNameRef, nickNameRef,
                emailRef, profileTextRef, profileTextRef, setStatusCode);
            setResult(result);
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (statusCode === 200 || statusCode === 201) {
            setIsError(false)
            props.setEditProfilePopShow(false)
        } else if (statusCode === 400) {
            setIsError(true);
            setErrorContent(result);
            localStorage.clear()
            props.setLoginStatus(false);
        } else {
            setIsError(true);
            setErrorContent(result);
        }
    }, [statusCode, result])


    return (
        < Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>プロフィールの編集</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>お名前(姓)</Form.Label>
                    <Form.Control
                        placeholder={json.familyName}
                        autoFocus
                        ref={familyNameRef}
                    />
                    <Form.Label>お名前(名)</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder={json.firstName}
                        autoFocus
                        ref={firstNameRef}
                    />

                    <Form.Label>ニックネーム</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder={json.nickName}
                        autoFocus
                        ref={nickNameRef}
                    />
                    <Form.Label>プロフィール画像</Form.Label>
                    {json.imageUrl}

                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>自己紹介文</Form.Label>
                        <Form.Control as="textarea" rows={3}
                            ref={profileTextRef} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder={json.firstName}
                            autoFocus
                            ref={emailRef}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            autoFocus
                            ref={passwordRef}
                        />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseretuen()}>
                    戻る
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal >


    )
}