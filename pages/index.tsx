import Layout from '../components/layout'
import NestedLayout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Post from '../components/post'
import { useState, useEffect } from 'react'
import PostDetail from '../components/detailPost/postDetail'
import { getPosts, getPostsLogin } from '../lib/api'
import { useRouter } from 'next/router';
// import { usePost, usePostDetail } from '../hooks/post'

export default function Home(props) {

  //各Postの表示
  const [postResult, setPostResult] = useState(null);
  //詳細画面の表示
  const [postDetailShow, setPostDetailShow] = useState(false);
  const [postDetailResult, setPostDetailResult] = useState();

  const [statusCode, setStatusCode] = useState();
  const [isError, setIsError] = useState(false);
  const [errorContent, setErrorContent] = useState("");

  const [favos, setFavo] = useState();
  const [comments, setComments] = useState([]);

  const [favosCount, setFavosCount] = useState();
  const [commentsCount, setCommentsCount] = useState();
  const [tapIndex, setTapIndex] = useState();

  const router = useRouter();

  const handlePagePostByUser = (userId) => {
    localStorage.setItem('currentViewUserId', userId);
    router.push({
      pathname: "/userPosts"
    });
  }

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token')
      setIsError(false)

      let res
      if (token !== null) {
        res = await getPostsLogin(setStatusCode);
        setPostResult(res);
      } else {
        res = await getPosts(setStatusCode);
        setPostResult(res);
      }

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
  }, [props.loginStatus, props.topRefresh]);

  useEffect(() => {
    if (statusCode === 200 || statusCode === 201) {
      setIsError(false)
    } else if (statusCode === 400) {
      setIsError(true);
      setErrorContent(postResult);
      localStorage.clear()
      props.setLoginStatus(false);
    } else {
      setIsError(true);
      setErrorContent(postResult);
    }
  }, [statusCode, postResult])

  return (
    <><br />
      {isError ? (<><br /><br /><br /><br />{errorContent}</>) : (<>
        <ul className={utilStyles.list} >
          {postResult && <Post postResult={postResult}
            loginStatus={props.loginStatus}
            setLoginPopShow={props.setLoginPopShow}
            setPostDetailShow={setPostDetailShow}
            setPostDetailResult={setPostDetailResult}

            favos={favos} setFavo={setFavo} setTapIndex={setTapIndex}
            handlePagePostByUser={handlePagePostByUser}
            favosCount={favosCount} setFavosCount={setFavosCount}
            commentsCount={commentsCount} comments={comments} setComments={setComments} />}
        </ul >
        {postDetailResult && <PostDetail postDetailResult={postDetailResult}
          postDetailShow={postDetailShow} setPostDetailShow={setPostDetailShow} setLoginPopShow={props.setLoginPopShow}
          favos={favos} setFavo={setFavo} tapIndex={tapIndex} loginStatus={props.loginStatus}
          topRefresh={props.topRefresh} setTopRefresh={props.setTopRefresh}
          favosCount={favosCount} setFavosCount={setFavosCount} comments={comments} setComments={setComments}
          commentsCount={commentsCount} setCommentsCount={setCommentsCount} />
        }
      </>)
      }</>)
}

Home.getLayout = function getLayout(home, props) {
  return (
    <Layout home>
      <NestedLayout home>{home}</NestedLayout>
    </Layout >
  )
}