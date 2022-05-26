import utilStyles from '../styles/utils.module.css'
import { AiFillHeart, AiOutlineHeart, AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdImageNotSupported } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { postFavo, deleteFavo, getPostDetail } from '../type/api';
import React, { Component } from 'react';
import { Img } from 'react-image';
import { IconContext } from "react-icons"

export default function PostByUser(props) {
    const json = props.result.Post;
    console.log("kokきているか")
    const [statusCode, setStatusCode] = useState();
    const [isError, setIsError] = useState(false);
    const [errorContent, setErrorContent] = useState("");

    // const hundleNoFavo = (id, indexNum) => {
    //     let favo = [...props.favos]
    //     favo[indexNum] = false
    //     props.setFavo(favo)
    //     deleteFavo(id)
    // }


    // const hundlefavo = (id, indexNum) => {
    //     let favo = [...props.favos]
    //     favo[indexNum] = true
    //     props.setFavo(favo)
    //     postFavo(id)
    // }

    // //詳細画面に遷移
    const handlePostDetailShow = (id, indexNum) => {
        props.setPostDetailShow(true);
        props.setTapFavosIndex(indexNum)
        async function fetchData() {
            const postDetailResult = await getPostDetail(id, setStatusCode);
            props.setPostDetailResult(postDetailResult);
        }
        fetchData();
    }
    useEffect(() => {
        if (statusCode === 200 || statusCode === 201) {
            setIsError(false)
        } else if (statusCode === 400) {
            setIsError(true);
            setErrorContent(props.postDetailResult);
            localStorage.clear()
            props.setLoginStatus(false);
        } else {
            setIsError(true);
            setErrorContent(props.postDetailResult);
        }
    }, [statusCode, props.postDetailResult])

    return (
        <li className={utilStyles.listItem}>
            {json.map(post => (
                <IconContext.Provider value={{ size: '50px' }}>
                    <span className={utilStyles.postImageArea1} onClick={() => handlePostDetailShow(post.id, json.indexOf(post))} >
                        <Img src={post.imageUrl}
                            loader={<AiOutlineLoading3Quarters className={utilStyles.postImage} />}
                            unloader={<MdImageNotSupported className={utilStyles.postImage} />} />
                    </span >
                </IconContext.Provider>
            ))}
        </ li >
    )
}
