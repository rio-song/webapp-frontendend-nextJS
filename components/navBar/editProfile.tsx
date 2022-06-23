import { Button, Modal, Form } from 'react-bootstrap'
import { putUser } from '../../lib/api'
import { useState, useEffect, useRef } from 'react'
import navbar from '../../styles/navbar.module.css'
import utilStyles from '../../styles/utils.module.css'
import { fileListToBase64 } from '../../lib/util';
import { Img } from 'react-image';

export default function EditProfile(props) {
    const show = props.editProfilePopShow;
    const json = props.viewProfileResult.User;

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
    var emailRegexp = new RegExp(/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/);
    var pwRegexp = new RegExp(/^[0-9a-zA-Z].*$/);

    const [isFamilyNameValidationError, setFamilyNameIsValidationError] = useState<boolean>(false);

    const [isFirstNameValidationError, setIsFirstNameValidationError] = useState<boolean>(false);

    const [isNickNameValidationError, setIsNickNameValidationError] = useState<boolean>(false);

    const [isEmailValidationError, setIsEmailValidationError] = useState<boolean>(false);
    const [validationEmailErrorMessage, setValidationEmailErrorMessage] = useState<string>("");
    const [isPWValidationError, setIsPWValidationError] = useState<boolean>(false);
    const [validationPWErrorMessage, setValidationPWErrorMessage] = useState<string>("");

    const [showImg, setShow] = useState(false);
    const [preview, setPreview] = useState(json.imageUrl);
    const [imgDataUrl, setImgDataUrl] = useState();

    const hundlePutUserValidationCheck = () => {

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
            hundlePutUser()
        }
    }

    const handleChangeFile = (e) => {
        setShow(true);
        const { files } = e.target;
        const image = window.URL.createObjectURL(files[0])
        setPreview(image);
        async function fetchData() {
            const imgDataUrl = await fileListToBase64(files)
            setImgDataUrl(imgDataUrl[0])
        }
        fetchData()
    };

    const hundlePutUser = () => {
        async function fetchData() {
            const result = await putUser(familyNameRef.current.value, firstNameRef.current.value, nickNameRef.current.value, imgDataUrl,
                emailRef.current.value, profileTextRef.current.value, profileTextRef.current.value, setStatusCode);
            setResult(result);
        }
        fetchData();
    }

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

    const handleClose = () => {
        props.setEditProfilePopShow(false)
        setFamilyNameIsValidationError(false)
        setIsFirstNameValidationError(false)
        setIsNickNameValidationError(false)
        setIsEmailValidationError(false)
        setIsPWValidationError(false)
        setShow(false)
        setPreview('')
    };
    const handleCloseretuen = () => {
        props.setEditProfilePopShow(false)
        props.setViewProfileShow(true)
        setFamilyNameIsValidationError(false)
        setIsFirstNameValidationError(false)
        setIsNickNameValidationError(false)
        setIsEmailValidationError(false)
        setIsPWValidationError(false)
        setShow(false)
        setPreview('')
    };
    return (
        < Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>プロフィールの編集</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>お名前(姓)</Form.Label>
                        <Form.Control
                            placeholder={json.familyName}
                            autoFocus
                            ref={familyNameRef}
                        />
                        {isFamilyNameValidationError ? (<div className={utilStyles.text_error}>入力してください</div>) : (<></>)}
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>お名前(名)</Form.Label>
                        <Form.Control
                            placeholder={json.firstName}
                            autoFocus
                            ref={firstNameRef}
                        />
                        {isFirstNameValidationError ? (<div className={utilStyles.text_error}>入力してください</div>) : (<></>)}
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>ニックネーム</Form.Label>
                        <Form.Control
                            placeholder={json.nickName}
                            autoFocus
                            ref={nickNameRef}
                        />
                        {isNickNameValidationError ? (<div className={utilStyles.text_error}>入力してください</div>) : (<></>)}
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>プロフィール画像</Form.Label>
                        {showImg ? (<img src={preview} />
                        ) : (
                            <div><Img className={navbar.editProfileImageUrl} src={json.imageUrl} /><div>
                                <label className={navbar.file}>
                                    写真を選択する
                                    <input
                                        type="file"
                                        accept="image/*"
                                        required
                                        onChange={handleChangeFile} />
                                </label></div></div>)}
                    </Form.Group>
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
                            placeholder={json.email}
                            autoFocus
                            ref={emailRef}
                        />
                        {isEmailValidationError ? (<span className={utilStyles.text_error}>{validationEmailErrorMessage}</span>) : (<></>)}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            autoFocus
                            ref={passwordRef}
                        />
                        {isPWValidationError ? (<span className={utilStyles.text_error}>{validationPWErrorMessage}</span>) : (<></>)}
                    </Form.Group>
                </Form >
                {isError ? (<span className={utilStyles.text_error}>{errorContent}</span>) : (<></>)}
            </Modal.Body >
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseretuen()}>
                    戻る
                </Button>
                <Button variant="primary" onClick={() => hundlePutUserValidationCheck()}>
                    変更
                </Button>
            </Modal.Footer>
        </Modal >


    )
}