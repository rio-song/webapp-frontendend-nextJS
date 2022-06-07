import { useState, useEffect } from 'react';
import React from 'react';
import { Modal } from 'react-bootstrap'
import { deleteComment, getComment } from '../type/api';
import utilStylesforDetail from '../styles/postDetail.module.css'


export default function CommentMenu(props) {

    const [deletestatusCode, setDeleteStatusCode] = useState();
    const [getCommentStatusCode, setGetCommentStatusCode] = useState();
    const [deleteCommentResult, setDeletePostResult] = useState();
    const [getCommentResult, setGetCommentResult] = useState();
    const [isError, setIsError] = useState(false);
    const [errorContent, setErrorContent] = useState("");

    const handleClose = () => {
        props.setCommentMenuShow(false)
        props.setOverlay(false)
    }

    const handleCommentDelete = () => {
        async function fetchData() {
            const result = await deleteComment(props.commentId, setDeleteStatusCode)
            setDeletePostResult(result)
        }
        fetchData()
    }
    const hundleGetComment = () => {
        async function fetchData() {
            const result = await getComment(props.postId, setGetCommentStatusCode);
            setGetCommentResult(result);
            const commentArray = result.Comment
            props.setComments(commentArray)

        }
        fetchData()
    }
    useEffect(() => {
        if (deletestatusCode === 200 || deletestatusCode === 201) {
            props.setCommentMenuShow(false)
            let countComment = [...props.commentsCount]
            countComment[props.tapIndex] -= 1
            props.setCommentsCount(countComment)
            hundleGetComment()
        } else if (deletestatusCode === 400) {
            setIsError(true);
            setErrorContent(deleteCommentResult);
            localStorage.clear()
            props.setLoginStatus(false);
        } else {
            setIsError(true);
            setErrorContent(deleteCommentResult);
        }
    }, [deletestatusCode, deleteCommentResult])

    useEffect(() => {
        if (getCommentStatusCode === 200 || getCommentStatusCode === 201) {
        } else if (getCommentStatusCode === 400) {
            setIsError(true);
            setErrorContent(getCommentResult);
            localStorage.clear()
            props.setLoginStatus(false);
        } else {
            setIsError(true);
            setErrorContent(getCommentResult);
        }
    }, [getCommentStatusCode, getCommentResult])


    return (
        <Modal show={props.commentMenuShow} onHide={handleClose} animation={false} centered size="sm" >
            <Modal.Body className={utilStylesforDetail.detailMenus} >
                <div onClick={() => handleCommentDelete()} className={utilStylesforDetail.detailMenu1}>
                    コメント削除
                </div>
                <div onClick={handleClose} className={utilStylesforDetail.detailMenu2}>
                    閉じる
                </div>
            </Modal.Body >
        </Modal >
    )
}