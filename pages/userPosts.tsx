import Layout from '../components/layout'
import NestedLayout from '../components/layout'
import userPost from '../styles/userPost.module.css'
import { getUserAllPosts } from '../lib/api'
import { useState, useEffect } from 'react'
import PostByUser from '../components/userPost/postByUser'
import PostDetail from '../components/detailPost/postDetail'
import { useRouter } from 'next/router';
import UserPostsTop from '../components/userPost/userPostsTop'

export default function UserPosts(props) {

  const [result, setResult] = useState();
  const [statusCode, setStatusCode] = useState();
  const [isError, setIsError] = useState(false);
  const [errorContent, setErrorContent] = useState("");

  const [favos, setFavo] = useState();
  const [tapIndex, setTapIndex] = useState();
  const [comments, setComments] = useState([]);

  const [postDetailShow, setPostDetailShow] = useState(false);
  const [postDetailResult, setPostDetailResult] = useState(null);
  const [favosCount, setFavosCount] = useState();
  const [commentsCount, setCommentsCount] = useState();

  const router = useRouter();

  let currentViewUserId;

  useEffect(() => {
    async function fetchData() {
      if (router.query.input === "me") {
        currentViewUserId = localStorage.getItem('userId')
      } else {
        currentViewUserId = localStorage.getItem('currentViewUserId')
      }
      const res = await getUserAllPosts(currentViewUserId, setStatusCode);
      setResult(res);
      if (res != null && res.Post != null) {
        const favoArray = res.Post.map(post => (post.favoStatus))
        setFavo(favoArray)
        const favosCountArray = res.Post.map(post => (post.favosCount))
        setFavosCount(favosCountArray)
        const commentCountArray = res.Post.map(post => (post.commentsCount))
        setCommentsCount(commentCountArray)
      } else {
        setIsError(true);
        setErrorContent("表示できるコンテンツがありません。");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (statusCode === 200 || statusCode === 201) {
      setIsError(false)
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
    <><br /><br /><br /><br />
      {isError ? (errorContent) : (<>
        {result && < UserPostsTop result={result} />}
        <ul className={userPost.list} >
          {result && <PostByUser result={result} setPostDetailShow={setPostDetailShow}
            setPostDetailResult={setPostDetailResult} loginStatus={props.loginStatus}
            favos={favos} setFavo={setFavo} setTapIndex={setTapIndex}
            comments={comments} setComments={setComments} />}
        </ul >
        {postDetailResult && <PostDetail postDetailResult={postDetailResult}
          postDetailShow={postDetailShow} setPostDetailShow={setPostDetailShow} setLoginPopShow={props.setLoginPopShow}
          favos={favos} setFavo={setFavo} tapIndex={tapIndex} loginStatus={props.loginStatus}
          topRefresh={props.topRefresh} setTopRefresh={props.setTopRefresh}
          favosCount={favosCount} setFavosCount={setFavosCount} comments={comments} setComments={setComments}
          commentsCount={commentsCount} setCommentsCount={setCommentsCount} />}
      </>)}
    </>)
}

UserPosts.getLayout = function getLayout(userPosts, props) {
  return (
    <Layout home>
      <NestedLayout home>{userPosts}</NestedLayout>
    </Layout >
  )
}
