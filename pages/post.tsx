import { Card } from 'react-bootstrap'
import utilStyles from '../styles/utils.module.css'
import { AiFillHeart, AiOutlineHeart, AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdImageNotSupported } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { postFavo, deleteFavo, getPostDetail } from '../type/api';
import React from 'react';
import { Img } from 'react-image';
import { IconContext } from "react-icons"
import { DataChange } from '../type/util';

export default function Post(props) {
  const json = props.result.Post;

  const [statusCode, setStatusCode] = useState();
  const [isError, setIsError] = useState(false);
  const [errorContent, setErrorContent] = useState("");

  const hundleNoFavo = (id, indexNum) => {
    let favo = [...props.favos]
    favo[indexNum] = false
    props.setFavo(favo)
    deleteFavo(id)
  }


  const hundlefavo = (id, indexNum) => {
    let favo = [...props.favos]
    favo[indexNum] = true
    props.setFavo(favo)
    postFavo(id)
  }

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
    <li >
      {
        json.map(post => (
          <Card style={{ width: '40rem' }} className={utilStyles.postList}>
            <span onClick={() => props.handlePagePostByUser(post.userId)}>
              <span className={utilStyles.icon}>
                <Img src={post.userImageUrl}
                  loader={<CgProfile />}
                  unloader={<CgProfile />} />
              </span>
              <span className={utilStyles.text3}>
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
                  <span>
                    <IconContext.Provider value={{ color: '#262626', size: '24px' }}><AiOutlineHeart className={utilStyles.icon} /></IconContext.Provider>
                  </span>)}
                <span onClick={() => handlePostDetailShow(post.id, json.indexOf(post))}><FaRegComment className={utilStyles.icon} /></span>
              </Card.Text>
              <div className={utilStyles.text} >
                <span className={utilStyles.text3}>「{post.title}」</span>に<span className={utilStyles.text3}>{post.favosCount}人</span>が「いいね！」しました
              </div>
              <div onClick={() => handlePostDetailShow(post.id, json.indexOf(post))} className={utilStyles.text5}> コメント{post.commentsCount} 件をすべて見る</div>
              <div className={utilStyles.text6}>{DataChange(post.postedAt)}</div>
            </Card.Body>
          </Card>
        ))
      }
    </ li >
  )
}
