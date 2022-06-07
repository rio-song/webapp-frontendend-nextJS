import { useState, useEffect } from 'react';
import React from 'react';
import { Modal } from 'react-bootstrap'
import { deletePost } from '../type/api';
import utilStylesforDetail from '../styles/postDetail.module.css'

export default function PostDetailMenu(props) {

    const [statusCode, setStatusCode] = useState();
    const [result, setResult] = useState();
    const [isError, setIsError] = useState(false);
    const [errorContent, setErrorContent] = useState("");

    const handleClose = () => {
        props.setOverlay(false)
        props.setPostMenuShow(false)
    }

    const handlePostDelete = () => {
        async function fetchData() {
            const res = await deletePost(props.postId, setStatusCode)
            setResult(res)
        }
        fetchData()
    }
    useEffect(() => {
        if (statusCode === 200 || statusCode === 201) {
            props.setPostMenuShow(false)
            props.setPostDetailShow(false);
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
        <Modal show={props.postMenuShow} onHide={handleClose} animation={false} centered size="sm">
            <Modal.Body className={utilStylesforDetail.detailMenus}>
                <div onClick={() => handlePostDelete()} className={utilStylesforDetail.detailMenu1} >
                    コメント削除
                </div>
                <div onClick={handleClose} className={utilStylesforDetail.detailMenu2}>
                    閉じる
                </div>
            </Modal.Body>
        </Modal>
    )
}
