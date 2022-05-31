import { useState, useEffect } from 'react';
import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import { deletePost } from '../type/api';

export default function PostDetailMenu(props) {

    const [statusCode, setStatusCode] = useState();
    const [result, setResult] = useState();
    const [isError, setIsError] = useState(false);
    const [errorContent, setErrorContent] = useState("");

    const handleClose = () => {
        props.setPostMenuShow(false)
    }

    const handlePostDelete = () => {
        async function fetchData() {
            const result = await deletePost(props.postId, setStatusCode)
            setResult(result)
        }
        fetchData()
    }
    useEffect(() => {
        if (statusCode === 200 || statusCode === 201) {
            props.setPostMenuShow(false)
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
        <Modal show={props.postMenuShow} onHide={handleClose} animation={false}>
            <Modal.Body>
                <Button variant="primary" onClick={() => handlePostDelete()}>
                    投稿削除
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    閉じる
                </Button>
            </Modal.Body>
        </Modal>
    )
}