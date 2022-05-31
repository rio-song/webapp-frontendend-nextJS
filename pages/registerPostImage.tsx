import { Button, Modal, Row, Col, Form } from 'react-bootstrap'
import { useState, useRef, useEffect } from 'react';
import { PostImage } from '../type/api';
import utilStyles from '../styles/utils.module.css'

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
                        <Col xs={12} md={8}>
                            <img src={preview} />
                        </Col>
                        <Col xs={6} md={4}>
                            <Form >
                                <Form.Group className="mb-3" >
                                    <Form.Label className={utilStyles.text} >タイトル</Form.Label>
                                    <input className={utilStyles.input} ref={titleRef} type="text" />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label className={utilStyles.text}>コメント</Form.Label>
                                    <Form.Control className={utilStyles.input} as="textarea" ref={commentRef} rows={3} />
                                </Form.Group>
                                <Button variant="outline-primary" onClick={handleChangeFileAgain}>戻る</Button>
                                <Button variant="primary" onClick={getPostInfo}>
                                    投稿
                                </Button>
                            </Form>
                            <p> {isError ? (errorContent) : (<></>)}
                                {successContent}</p>
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
