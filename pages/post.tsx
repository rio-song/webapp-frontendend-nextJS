import { Button, Card } from 'react-bootstrap'
import Link from 'next/link'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { postFavo, deleteFavo, getPostDetail } from '../type/api';

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
    <li>
      {json.map(post => (
        <Card style={{ width: '40rem' }}>
          <Link href="./userPosts">
            rio
          </Link>
          <Card.Img variant="top" src={post.imageUrl} />
          <Card.Body>
            <Card.Text>
              {props.loginStatus ? (<>
                {props.favos && props.favos[json.indexOf(post)] ? (
                  <Button onClick={() => hundleNoFavo(post.id, json.indexOf(post))}><AiFillHeart /></Button>) : (
                  <Button onClick={() => hundlefavo(post.id, json.indexOf(post))}><AiOutlineHeart /></Button>)}
              </>) : (
                <Button><AiFillHeart /></Button>)}
              {post.favosCount} 件
              <Button onClick={() => handlePostDetailShow(post.id, json.indexOf(post))}><FaRegComment /></Button>{post.commentsCount} 件
            </Card.Text>
            <Card.Title>{post.title} </Card.Title>
          </Card.Body>
        </Card>
      ))
      }
    </li >
  )
}
