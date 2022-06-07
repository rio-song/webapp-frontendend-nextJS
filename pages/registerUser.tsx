import { Button, Modal, Form } from 'react-bootstrap'
import { registerUserInfo } from '../type/api'
import { useState, useEffect, useRef } from 'react'
import utilStyles from '../styles/utils.module.css'

export default function ResisterUser(props) {

    const [statusCode, setStatusCode] = useState();
    const [result, setResult] = useState();
    const [isError, setIsError] = useState(false);
    const [errorContent, setErrorContent] = useState("");


    const [isFamilyNameValidationError, setFamilyNameIsValidationError] = useState<boolean>(false);

    const [isFirstNameValidationError, setIsFirstNameValidationError] = useState<boolean>(false);

    const [isNickNameValidationError, setIsNickNameValidationError] = useState<boolean>(false);

    const [isEmailValidationError, setIsEmailValidationError] = useState<boolean>(false);
    const [validationEmailErrorMessage, setValidationEmailErrorMessage] = useState<string>("");
    const [isPWValidationError, setIsPWValidationError] = useState<boolean>(false);
    const [validationPWErrorMessage, setValidationPWErrorMessage] = useState<string>("");


    const show = props.resisterUserPopShow;
    const handleClose = () => { props.setResisterUserPopShow(false) };

    //新規登録
    const familyNameRef = useRef(null);
    const firstNameRef = useRef(null);
    const nickNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    var emailRegexp = new RegExp(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/);
    var pwRegexp = new RegExp(/^[0-9a-zA-Z].*$/);

    const registerUserValidationCheck = () => {

        setFamilyNameIsValidationError(false)
        setIsFirstNameValidationError(false)
        setIsNickNameValidationError(false)
        setIsEmailValidationError(false)
        setIsPWValidationError(false)

        if (familyNameRef.current.value.length === 0) {
            setFamilyNameIsValidationError(true)
        }
        if (firstNameRef.current.value.length === 0) {
            setIsFirstNameValidationError(true)
        }
        if (nickNameRef.current.value.length === 0) {
            setIsNickNameValidationError(true)
        }
        if (emailRef.current.value.length === 0) {
            setIsEmailValidationError(true)
            setValidationEmailErrorMessage("入力してください")
        } else if (emailRegexp.test(emailRef.current.value) === false) {
            setIsEmailValidationError(true)
            setValidationEmailErrorMessage("正しいメールアドレスを入力してください")
        }
        if (passwordRef.current.value.length === 0) {
            setIsPWValidationError(true)
            setValidationPWErrorMessage("入力してください")
        } else if (pwRegexp.test(passwordRef.current.value) === false) {
            setIsPWValidationError(true)
            setValidationPWErrorMessage("英数字で入力してください")
        } else if (passwordRef.current.value.length < 6) {
            setIsPWValidationError(true)
            setValidationPWErrorMessage("6文字以上で入力してください")
        }

        if (familyNameRef.current.value.length != 0 &&
            firstNameRef.current.value.length != 0 &&
            nickNameRef.current.value.length != 0 &&
            emailRef.current.value.length != 0 &&
            passwordRef.current.value.length >= 6 &&
            pwRegexp.test(passwordRef.current.value) === true &&
            pwRegexp.test(passwordRef.current.value) === true
        ) {
            registerUser()
        }
    }


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
                        {isFamilyNameValidationError ? (<span className={utilStyles.text_error}>入力してください</span>) : (<></>)}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>お名前(名)</Form.Label>
                        <Form.Control
                            ref={firstNameRef}
                            autoFocus
                        />
                        {isFirstNameValidationError ? (<span className={utilStyles.text_error}>入力してください</span>) : (<></>)}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label >ニックネーム</Form.Label>
                        <Form.Control
                            ref={nickNameRef}
                            autoFocus
                        />
                        {isNickNameValidationError ? (<span className={utilStyles.text_error}>入力してください</span>) : (<></>)}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label >Email</Form.Label>
                        <Form.Control
                            ref={emailRef}
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                        />
                        {isEmailValidationError ? (<span className={utilStyles.text_error}>{validationEmailErrorMessage}</span>) : (<></>)}
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
                        {isPWValidationError ? (<span className={utilStyles.text_error}>{validationPWErrorMessage}</span>) : (<></>)}
                    </Form.Group>
                </Form>
                {isError ? (<span className={utilStyles.text_error}>{errorContent}</span>) : (<></>)}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={registerUserValidationCheck}>
                    登録
                </Button>
            </Modal.Footer>
        </Modal >
    );
}