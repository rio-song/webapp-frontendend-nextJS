import { useState, useEffect } from 'react';
import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import { deleteComment } from '../type/api';

export default function CommentMenu(props) {

    const [statusCode, setStatusCode] = useState();
    const [result, setResult] = useState();
    const [isError, setIsError] = useState(false);
    const [errorContent, setErrorContent] = useState("");

    const handleClose = () => {
        props.setCommentMenuShow(false)
    }

    const handleCommentDelete = () => {
        async function fetchData() {
            const result = await deleteComment(props.commentId, setStatusCode)
            setResult(result)
        }
        fetchData()
    }
    useEffect(() => {
        if (statusCode === 200 || statusCode === 201) {
            props.setCommentMenuShow(false)
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
        <Modal show={props.commentMenuShow} onHide={handleClose} animation={false}>
            <Modal.Body>
                <Button variant="primary" onClick={() => handleCommentDelete()}>
                    コメント削除
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    閉じる
                </Button>
            </Modal.Body>
        </Modal>
    )
}