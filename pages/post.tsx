import { Button, Card } from 'react-bootstrap'
import Link from 'next/link'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useState } from 'react';

export default function Post(props) {
  const json = props.result.Post;

  //お気に入り
  const [favo, setFavo] = useState(true);
  const hundlefavo = (id) => {
    postFavo(id)
    setFavo(false)
  }

  const hundleNoFavo = (id) => {
    deleteFavo(id)
    setFavo(true)
  }

  // //詳細画面に遷移
  const handlePostDetailShow = (id) => {
    props.setPostDetailShow(true);
    async function fetchData() {
      const postDetailResult = await getPostDetail(id);
      props.setPostDetailResult(postDetailResult);
    }
    fetchData();
  }

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
              {favo ? (<Button onClick={() => hundlefavo(post.id)}><AiOutlineHeart /></Button>
              ) : (
                <Button onClick={() => hundleNoFavo(post.id)}><AiFillHeart /></Button>)}
              {post.favosCount} 件
              <Button onClick={() => handlePostDetailShow(post.id)}><FaRegComment /></Button>{post.commentsCount} 件
            </Card.Text>
            <Card.Title>{post.title} </Card.Title>
          </Card.Body>
        </Card>
      ))}
    </li >
  )
}

async function postFavo(id) {

  const url = "http://localhost:8000/api/favo/postId/" + id + "/userId/1234567";

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      //'Access-Control-Allow-Origin': 'http://localhost:8000'
    }
  }


  const response = await fetch(url, request);
  const posts = await response.status

  return posts
}

async function deleteFavo(id) {

  const url = "http://localhost:8000/api/favo/postId/" + id + "/userId/1234567";

  const request = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      'Access-Control-Allow-Origin': 'http://localhost:8000'
    },
  }

  const response = await fetch(url, request);
  const posts = await response.status

  return posts
}

async function getPostDetail(id) {
  const url = "http://localhost:8000/api/post/postId/" + id;
  const params = { method: "GET" };
  const response = await fetch(url, params);
  const posts = await response.json()
  console.log("呼び出し３")
  console.log("挙動確認" + posts)
  return posts
}