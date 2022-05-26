import { Modal, Row, Col } from 'react-bootstrap'
import utilStyles from '../styles/utils.module.css'
import { FaRegComment } from "react-icons/fa";
import { postFavo, deleteFavo } from '../type/api';
import React, { Component } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdImageNotSupported } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { Img } from 'react-image';
import { IconContext } from "react-icons"
import { useState } from 'react';
import { DataChange } from '../type/util';

export default function PostDetail(props) {

    const closePostDetailShow = () => props.setPostDetailShow(false);

    let json = props.postDetailResult.PostDetail;

    const viewDate = DataChange(json.postedAt)

    const [commentStatus, setCommentStatus] = useState(false)
    if (json.comments.length > 1) {
        setCommentStatus(true)
    }

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


    return (
        <Modal show={props.postDetailShow} onHide={closePostDetailShow} size="lg" aria-labelledby="contained-modal-title-vcenter" className={utilStyles.modal}>

            <Row >
                <Col xs={12} md={8} className={utilStyles.detailContent}>
                    <IconContext.Provider value={{ size: '50px' }}>
                        <div className={utilStyles.postImageArea2}>
                            <Img src={json.imageUrl}
                                loader={<AiOutlineLoading3Quarters className={utilStyles.postImage} />}
                                unloader={<MdImageNotSupported className={utilStyles.postImage} />} />
                        </div>
                    </IconContext.Provider >
                </Col>
                <Col xs={6} md={4} className={utilStyles.detailContent}>
                    <div className={utilStyles.detailUserInfo} >
                        <span className={utilStyles.icon}>
                            <IconContext.Provider value={{ color: '#262626', size: '30px' }}>
                                <Img src={json.imageUrl}
                                    loader={<CgProfile />}
                                    unloader={<CgProfile />} />
                            </IconContext.Provider >
                        </span>
                        <span className={utilStyles.text3}>
                            {json.nickName}
                        </span>
                        <BsThreeDots className={utilStyles.iconDetailMenu} />
                    </div>
                    <div className={utilStyles.commentArera}>
                        <div className={utilStyles.comment}>
                            <span className={utilStyles.icon}>
                                <IconContext.Provider value={{ color: '#262626', size: '30px' }}>
                                    <Img src={json.userImageUrl}
                                        loader={<CgProfile />}
                                        unloader={<CgProfile />} />
                                </IconContext.Provider >
                            </span>
                            <span>
                                <span className={utilStyles.text3}>{json.nickName}</span> <span className={utilStyles.text}>{json.title} </span>
                                <div className={utilStyles.text}> {json.text}</div>
                                <div className={utilStyles.text2}>{viewDate}</div>
                            </span>
                        </div >
                        <ul className={utilStyles.list}>
                            <li>{commentStatus ? (<>
                                {json.comments.map(comment => (
                                    <div className={utilStyles.comment}>
                                        <span className={utilStyles.icon}>
                                            <IconContext.Provider value={{ color: '#262626', size: '30px' }}>
                                                <Img src={json.userImageUrl}
                                                    loader={<CgProfile />}
                                                    unloader={<CgProfile />} />
                                            </IconContext.Provider >
                                        </span>
                                        <span className={utilStyles.text3}> {comment.nickName}</span>
                                        <div className={utilStyles.text}> {comment.nickName}</div>
                                        <div className={utilStyles.text2}>{comment.commentededAt}</div>
                                    </div>))}
                            </>) : (<></>)}
                            </li>
                        </ul>
                    </div >
                    <div className={utilStyles.favoArea}>
                        <div>
                            {props.favos[props.tapFavosIndex] ? (
                                <span onClick={() => hundleNoFavo(json.id)}>
                                    <IconContext.Provider value={{ color: '#ed4956', size: '24px' }}><AiFillHeart className={utilStyles.icon} /></IconContext.Provider>
                                </span>) : (
                                <span onClick={() => hundlefavo(json.id)}>
                                    <IconContext.Provider value={{ color: '#262626', size: '24px' }}><AiOutlineHeart className={utilStyles.icon} /></IconContext.Provider>
                                </span>)}
                            <FaRegComment className={utilStyles.icon} />
                        </div>
                        <span className={utilStyles.text3}> いいね！{json.favosCount} 件</span>
                    </div >
                    <div className={utilStyles.addCommentArea}>
                        <textarea placeholder="コメントを追加" className={utilStyles.addComment}></textarea>
                        <span className={utilStyles.text4}>投稿する</span>
                    </div>
                </Col >
            </Row >
        </Modal >
    );
}
