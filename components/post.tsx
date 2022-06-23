import { Card } from 'react-bootstrap'
import utilStyles from '../styles/utils.module.css'
import { AiFillHeart, AiOutlineHeart, AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdImageNotSupported } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { postFavo, deleteFavo, getPostDetail } from '../lib/api';
import React from 'react';
import { Img } from 'react-image';
import { IconContext } from "react-icons"
import { DataChange } from '../lib/util';

export default function Post(props) {

  const json = props.postResult.Post;
  const [statusCode, setStatusCode] = useState();
  const [isError, setIsError] = useState(false);
  const [errorContent, setErrorContent] = useState("");

  const hundleNoFavo = (id, indexNum) => {
    let favo = [...props.favos]
    favo[indexNum] = false
    props.setFavo(favo)
    let countFavo = [...props.favosCount]
    countFavo[indexNum] -= 1
    props.setFavosCount(countFavo)
    deleteFavo(id)
  }

  const hundlefavo = (id, indexNum) => {
    let favo = [...props.favos]
    favo[indexNum] = true
    props.setFavo(favo)
    let countFavo = [...props.favosCount]
    countFavo[indexNum] += 1
    props.setFavosCount(countFavo)
    postFavo(id)
  }

  // //詳細画面に遷移
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

  const handleLoginShow = () => props.setLoginPopShow(true)

  return (
    <li className={utilStyles.list}>
      {
        json.map(post => (
          <Card className={utilStyles.postList}>
            <span onClick={() => props.handlePagePostByUser(post.userId)} className={utilStyles.userArea}>
              <Img className={utilStyles.userImageUrl}
                src={post.userImageUrl}
                loader={<CgProfile />}
                unloader={<CgProfile />} />
              <span className={utilStyles.textUserName}>
                {post.nickName}
              </span>
            </span>
            <IconContext.Provider value={{ size: '50px' }}>
              <div className={utilStyles.postImageArea1}>
                <Img
                  src={post.imageUrl}
                  loader={<AiOutlineLoading3Quarters className={utilStyles.postImage} />}
                  unloader={<MdImageNotSupported className={utilStyles.postImage} />} />
              </div>
            </IconContext.Provider>
            <Card.Body>
              <Card.Text>
                {props.loginStatus ? (<>
                  {props.favos && props.favos[json.indexOf(post)] ? (
                    <span onClick={() => hundleNoFavo(post.id, json.indexOf(post))}>
                      <IconContext.Provider value={{ color: '#ed4956', size: '24px' }}><AiFillHeart className={utilStyles.icon} /></IconContext.Provider>
                    </span>) : (
                    <span onClick={() => hundlefavo(post.id, json.indexOf(post))}>
                      <IconContext.Provider value={{ color: '#262626', size: '24px' }}><AiOutlineHeart className={utilStyles.icon} /></IconContext.Provider>
                    </span>)}
                </>) : (
                  <span onClick={() => handleLoginShow()}>
                    <IconContext.Provider value={{ color: '#262626', size: '24px' }}><AiOutlineHeart className={utilStyles.icon} /></IconContext.Provider>
                  </span>)}
                <span onClick={() => handlePostDetailShow(post.id, json.indexOf(post))}><FaRegComment className={utilStyles.icon} /></span>
              </Card.Text>
              {props.favosCount ? (
                <div className={utilStyles.text} >
                  <span className={utilStyles.text3}>「{post.title}」</span>に<span className={utilStyles.text3}>{props.favosCount[json.indexOf(post)]}人</span>が「いいね！」しました
                </div>) : (<></>)}
              {props.commentsCount ? (
                <div onClick={() => handlePostDetailShow(post.id, json.indexOf(post))} className={utilStyles.text5}> コメント{props.commentsCount[json.indexOf(post)]} 件をすべて見る</div>
              ) : (<></>)}
              <div className={utilStyles.text6}>{DataChange(post.postedAt)}</div>
            </Card.Body>
          </Card>
        ))
      }
    </ li >
  )
}
