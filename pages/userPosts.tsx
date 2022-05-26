import Layout, { siteTitle } from '../components/layout'
import NestedLayout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getUserAllPosts } from '../type/api'
import { useState, useEffect } from 'react'
import PostByUser from './postByUser'
import PostDetail from './postDetail'
import { useRouter } from 'next/router';
import UserPostsTop from './userPostsTop'

export default function UserPosts(props) {

  const [result, setResult] = useState();
  const [statusCode, setStatusCode] = useState();
  const [isError, setIsError] = useState(false);
  const [errorContent, setErrorContent] = useState("");

  const [favos, setFavo] = useState();
  const [tapFavosIndex, setTapFavosIndex] = useState();

  const [postDetailShow, setPostDetailShow] = useState(false);
  const [postDetailResult, setPostDetailResult] = useState(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const result = await getUserAllPosts(router.query.userId, setStatusCode);
      setResult(result);
      const favoArray = result.Post.map(post => (post.favoStatus))
      setFavo(favoArray)
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
    <><br></br><br></br><br></br><br></br>
      {isError ? (errorContent) : (<>
        {result && < UserPostsTop result={result} />}
        <ul className={utilStyles.list} >
          {result && <PostByUser result={result} setPostDetailShow={setPostDetailShow}
            setPostDetailResult={setPostDetailResult} loginStatus={props.loginStatus}
            favos={favos} setFavo={setFavo} setTapFavosIndex={setTapFavosIndex} />}
        </ul >
        {postDetailResult && <PostDetail postDetailResult={postDetailResult}
          postDetailShow={postDetailShow} setPostDetailShow={setPostDetailShow}
          favos={favos} setFavo={setFavo} tapFavosIndex={tapFavosIndex} />}
      </>)}
    </>)
}

UserPosts.getLayout = function getLayout(userPosts, props) {
  return (
    <Layout userPosts>
      <NestedLayout userPosts>{userPosts}</NestedLayout>
    </Layout >
  )
}
