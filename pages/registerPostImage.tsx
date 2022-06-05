import { Button, Modal, Row, Col, Form } from 'react-bootstrap'
import { useState, useRef, useEffect } from 'react';
import { PostImage } from '../type/api';
import navbar from '../styles/navbar.module.css'

export default function RegisterPostImage(props) {

    const [statusCode, setStatusCode] = useState();
    const [result, setResult] = useState();
    const [isError, setIsError] = useState(false);
    const [errorContent, setErrorContent] = useState("");
    const [successContent, setSuccessContent] = useState("");
    //Imgの選択
    const [showImg, setShow] = useState(false);
    const [preview, setPreview] = useState('');

    const show = props.registerImageShow;
    const handleClose = () => {
        setShow(false);
        props.setRegisterImageShow(false)
        setIsError(false)
        setPreview('')
        setErrorContent('')
        setSuccessContent('')
    };

    const handleChangeFile = (e) => {
        setShow(true);
        const { files } = e.target;
        setPreview(window.URL.createObjectURL(files[0]));
    };
    const handleChangeFileAgain = () => {
        setShow(false);
        setPreview('');
        setErrorContent('')
        setSuccessContent('')
    };
    //Imgの投稿
    const titleRef = useRef(null);
    const commentRef = useRef(null);

    const getPostInfo = () => {
        async function fetchData() {
            const result = await PostImage(preview, titleRef.current.value, commentRef.current.value, setStatusCode);
            setResult(result)
        }
        fetchData()
    }
    useEffect(() => {
        if (statusCode === 200 || statusCode === 201) {
            setSuccessContent(result)
            props.setRegisterImageShow(false)
            const newPostResult = props.topRefresh ? false : true
            props.setTopRefresh(newPostResult)
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
        <Modal show={show} onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    新規投稿
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showImg ? (
                    <Row>
                        <Col xs={12} md={8} >
                            <img src={preview} />
                        </Col>
                        <Col xs={6} md={4} className={navbar.newPostArea}>
                            <Form >
                                <Form.Group className={navbar.inputArea} >
                                    <input className={navbar.input} placeholder='タイトルを入力' ref={titleRef} type="text" />
                                </Form.Group>

                                <Form.Group className={navbar.inputArea} >
                                    <textarea className={navbar.input} placeholder="コメントを入力" ref={commentRef} ></textarea>

                                </Form.Group>
                                <span onClick={handleChangeFileAgain} className={navbar.return} >画像を変更する</span>
                                <span onClick={getPostInfo} className={navbar.post}  >
                                    投稿
                                </span>
                            </Form>
                            {/* <p> {isError ? (errorContent) : (<></>)}
                                {successContent}</p> */}
                        </Col>
                    </Row>
                ) : (
                    <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleChangeFile}
                    />)}
            </Modal.Body>
        </Modal >
    );
}
