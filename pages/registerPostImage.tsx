import { Button, Modal, Container, Row, Col, Form } from 'react-bootstrap'
import { useState, useRef } from 'react';


export default function RegisterPostImage(props) {
    const show = props.registerImageShow;
    const handleClose = () => { props.setRegisterImageShow(false) };

    //Imgの選択
    const [showImg, setShow] = useState(false);
    const [preview, setPreview] = useState('');
    const handleChangeFile = (e) => {
        setShow(true);
        const { files } = e.target;
        setPreview(window.URL.createObjectURL(files[0]));
    };
    const handleChangeFileAgain = () => {
        setShow(false);
        setPreview('');
    };
    //Imgの投稿
    const titleRef = useRef();
    const commentRef = useRef();
    //結果の表示
    const [result, setResult] = useState("");

    const getPostInfo = event => {
        event.preventDefault();
        const result = PostImage(preview, titleRef, commentRef);
        if (result) {
            //200と201以外を救うという書き方に変えたい
            setResult("投稿しました")
        }
    }


    return (
        <Modal show={show} onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    新規投稿を作成
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showImg ? (
                    <Row>
                        <Col xs={12} md={8}>
                            <img src={preview} />
                        </Col>
                        <Col xs={6} md={4}>
                            <Form  >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label id='title'>タイトル</Form.Label>
                                    <Form.Control ref={titleRef} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label id='comment'>コメント</Form.Label>
                                    <Form.Control as="textarea" rows={3} ref={commentRef} />
                                </Form.Group>
                                <Button variant="outline-primary" onClick={handleChangeFileAgain}>戻る</Button>
                                <Button variant="primary" onClick={getPostInfo}>
                                    投稿
                                </Button>
                            </Form>
                            <p>{result}</p>
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

async function PostImage(_imgUrl, _title, _comment) {

    const params = new URLSearchParams()
    params.append('imageUrl', _imgUrl)
    params.append('title', _title)
    params.append('text', _comment)

    const url = "http://localhost:8000/api/post/userId/1234567";

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Access-Control-Allow-Origin': 'http://localhost:8000'
        },
        body: params
    }

    const response = await fetch(url, request);
    const posts = await response.status

    return posts
}