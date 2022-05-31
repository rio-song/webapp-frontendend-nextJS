import { Modal, Container, Row, Col } from 'react-bootstrap'
import utilStyles from '../styles/utils.module.css'
import utilStylesforDetail from '../styles/postDetail.module.css'
import { FaRegComment } from "react-icons/fa";
import { postFavo, deleteFavo, postComment } from '../type/api';
import React from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdImageNotSupported } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { Img } from 'react-image';
import { IconContext } from "react-icons"
import { DataChange } from '../type/util';
import { useRef, useEffect, useState } from 'react';
import CommentMenu from './commentMenu';
import PostDetailMenu from './postDetailMenu';

export default function PostDetail(props) {
    const [statusCode, setStatusCode] = useState();
    const [result, setResult] = useState();
    const [isError, setIsError] = useState(false);
    const [errorContent, setErrorContent] = useState("");

    const closePostDetailShow = () => props.setPostDetailShow(false);

    let json = props.postDetailResult.PostDetail;

    const userId = localStorage.getItem('userId')

    const hundleNoFavo = (id) => {
        let favo = [...props.favos]
        favo[props.tapFavosIndex] = false
        props.setFavo(favo)
        deleteFavo(id)
    }

    const hundlefavo = (id) => {
        let favo = [...props.favos]
        favo[props.tapFavosIndex] = true
        props.setFavo(favo)
        postFavo(id)
    }
    const [postMenuShow, setPostMenuShow] = useState(false);
    const [postId, setPostId] = useState({});
    const hundlePostMenu = (id) => {
        setPostMenuShow(true)
        setPostId(id)
    }

    const [commentMenuShow, setCommentMenuShow] = useState(false);
    const [commentId, setCommentId] = useState({});
    const hundleCommentMenu = (commentId) => {
        setCommentMenuShow(true)
        setCommentId(commentId)
    }

    const commentRef = useRef(null);
    const hundlePost = (postId) => {
        async function fetchData() {
            const result = await postComment(postId, commentRef.current.value, setStatusCode);
            setResult(result);
        }
        fetchData()
    }
    useEffect(() => {
        if (statusCode === 200 || statusCode === 201) {
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

    const handleLoginShow = () => props.setLoginPopShow(true)

    return (
        <>
            <Modal show={props.postDetailShow} onHide={closePostDetailShow} size="xl"
                aria-labelledby="contained-modal-title-vcenter">
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col xs={12} md={8} className={utilStylesforDetail.detailContent1}>
                                <div className={utilStylesforDetail.postImageArea2}>
                                    <IconContext.Provider value={{ size: '50px' }}>
                                        <Img src={json.imageUrl}
                                            loader={<AiOutlineLoading3Quarters className={utilStylesforDetail.postImage} />}
                                            unloader={<MdImageNotSupported className={utilStylesforDetail.postImage} />} />
                                    </IconContext.Provider >
                                </div>
                            </Col>
                            <Col xs={6} md={4} className={utilStylesforDetail.detailContent2}>
                                <div className={utilStylesforDetail.detailUserInfo} >
                                    <span className={utilStylesforDetail.icon}>
                                        <IconContext.Provider value={{ color: '#262626', size: '30px' }}>
                                            <Img src={json.imageUrl}
                                                loader={<CgProfile />}
                                                unloader={<CgProfile />} />
                                        </IconContext.Provider >
                                    </span>
                                    <span className={utilStyles.text3}>
                                        {json.nickName}
                                    </span>{json.userId === userId ? (
                                        <BsThreeDots className={utilStylesforDetail.iconDetailProfileMenu1} onClick={() => hundlePostMenu(json.id)} />
                                    ) : (<></>)}
                                </div>
                                <div className={utilStylesforDetail.commentArera}>
                                    <div className={utilStylesforDetail.comment}>
                                        <span className={utilStylesforDetail.icon}>
                                            <IconContext.Provider value={{ color: '#262626', size: '30px' }}>
                                                <Img src={json.userImageUrl}
                                                    loader={<CgProfile />}
                                                    unloader={<CgProfile />} />
                                            </IconContext.Provider >
                                        </span>
                                        <span>
                                            <span className={utilStyles.text3}>{json.nickName}</span>
                                            <span className={utilStylesforDetail.commentTittle}>{json.title} </span>
                                            <div className={utilStyles.text}> {json.text}</div>
                                            <div className={utilStyles.text2}>{DataChange(json.postedAt)}</div>
                                        </span>
                                    </div >
                                    <ul className={utilStyles.list}>
                                        <li>
                                            {json.comments.map(c => (
                                                <div className={utilStylesforDetail.comment}>
                                                    <span className={utilStylesforDetail.icon}>
                                                        <IconContext.Provider value={{ color: '#262626', size: '30px' }}>
                                                            <Img src={json.commentedUserImageUrl}
                                                                loader={<CgProfile />}
                                                                unloader={<CgProfile />} />
                                                        </IconContext.Provider >
                                                    </span>
                                                    <span>
                                                        <span className={utilStyles.text3}> {c.commentedUserNickName}</span>
                                                        <div className={utilStyles.text}> {c.comment}</div>
                                                        <span className={utilStyles.text2}>{DataChange(c.commentededAt)}</span>
                                                        {userId === c.commentedUserId ? (
                                                            <span className={utilStylesforDetail.iconDetailCommentMenu} onClick={() => hundleCommentMenu(c.id)} >削除</span>
                                                        ) : (<></>)}
                                                    </span>

                                                </div>))}
                                        </li>
                                    </ul>
                                </div >
                                <div className={utilStylesforDetail.favoArea}>
                                    <div className={utilStylesforDetail.icons}>
                                        {props.loginStatus ? (<>
                                            {props.favos[props.tapFavosIndex] ? (
                                                <span onClick={() => hundleNoFavo(json.id)}>
                                                    <IconContext.Provider value={{ color: '#ed4956', size: '26px' }}>
                                                        <AiFillHeart className={utilStyles.icon} /></IconContext.Provider>
                                                </span>) : (
                                                <span onClick={() => hundlefavo(json.id)}>
                                                    <IconContext.Provider value={{ color: '#262626', size: '26px' }}>
                                                        <AiOutlineHeart className={utilStyles.icon} /></IconContext.Provider>
                                                </span>)}
                                        </>) : (<span onClick={() => handleLoginShow()}>
                                            <IconContext.Provider value={{ color: '#262626', size: '26px' }}>
                                                <AiOutlineHeart className={utilStyles.icon} /></IconContext.Provider>
                                        </span>)}
                                        <IconContext.Provider value={{ color: '#262626', size: '22px' }}>
                                            <FaRegComment className={utilStyles.icon} /></IconContext.Provider>
                                    </div>
                                    <span className={utilStylesforDetail.favoCount}> いいね！{json.favosCount} 件</span>
                                </div >
                                <div className={utilStylesforDetail.addCommentArea}>
                                    <textarea ref={commentRef} className={utilStylesforDetail.addComment} placeholder="コメントを追加"></textarea>
                                    {props.loginStatus ? (
                                        <span className={utilStylesforDetail.addCommentButton} onClick={() => hundlePost(json.id)}>投稿する</span>
                                    ) : (
                                        <span className={utilStylesforDetail.addCommentButton} onClick={() => handleLoginShow()}>投稿する</span>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal >
            <CommentMenu
                commentMenuShow={commentMenuShow} setCommentMenuShow={setCommentMenuShow}
                commentId={commentId} loginStatus={props.loginStatus} />
            <PostDetailMenu postMenuShow={postMenuShow}
                setPostMenuShow={setPostMenuShow} postId={postId}
                loginStatus={props.loginStatus} />

        </>
    );
}
