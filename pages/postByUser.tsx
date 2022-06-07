import utilStyles from '../styles/utils.module.css'
import userPost from '../styles/userPost.module.css'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdImageNotSupported } from "react-icons/md";
import { useState, useEffect } from 'react';
import { getPostDetail } from '../type/api';
import React from 'react';
import { Img } from 'react-image';
import { IconContext } from "react-icons"
import { Card } from 'react-bootstrap'

export default function PostByUser(props) {
    const json = props.result.Post;

    const [statusCode, setStatusCode] = useState();
    const [isError, setIsError] = useState(false);
    const [errorContent, setErrorContent] = useState("");

    const handlePostDetailShow = (id, indexNum) => {
        props.setPostDetailShow(true);
        props.setTapIndex(indexNum)
        async function fetchData() {
            const postDetailResult = await getPostDetail(id, setStatusCode);
            props.setPostDetailResult(postDetailResult);
            if (postDetailResult != null && postDetailResult.PostDetail != null) {
                const commentArray = postDetailResult.PostDetail.comments
                props.setComments(commentArray)
            }
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
        <li className={userPost.listItem}>
            {json.map(post => (
                <Card className={userPost.postImageAreabyUser}>
                    <Card.Body onClick={() => handlePostDetailShow(post.id, json.indexOf(post))}
                        className={utilStyles.navIcons}>
                        <IconContext.Provider value={{ size: '50px' }}>
                            <Img src={post.imageUrl}
                                loader={<AiOutlineLoading3Quarters />}
                                unloader={<MdImageNotSupported />} />
                        </IconContext.Provider>

                    </Card.Body>
                </Card>
            ))}
        </ li >
    )
}
