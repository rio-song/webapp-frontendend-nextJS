import Layout from '../components/layout'
import NestedLayout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Post from './post'
import { useState, useEffect } from 'react'
import PostDetail from './postDetail'
import { getPosts, getPostsLogin } from '../type/api'
import { useRouter } from 'next/router';

export default function Home(props) {
  //各Postの表示
  const [result, setResult] = useState();
  //詳細画面の表示
  const [postDetailShow, setPostDetailShow] = useState(false);
  const [postDetailResult, setPostDetailResult] = useState(null);

  const [statusCode, setStatusCode] = useState();
  const [isError, setIsError] = useState(false);
  const [errorContent, setErrorContent] = useState("");


  const [favos, setFavo] = useState();
  const [tapFavosIndex, setTapFavosIndex] = useState();

  const router = useRouter();

  const handlePagePostByUser = (userId) => {
    router.push({
      pathname: "/userPosts",
      query: { userId: userId }
    });

  }


  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token')
      setIsError(false)
      if (token !== null) {
        const result = await getPostsLogin(setStatusCode);
        setResult(result);
        const favoArray = result.Post.map(post => (post.favoStatus))
        setFavo(favoArray)
      } else {
        const result = await getPosts(setStatusCode);
        setResult(result);
        const favoArray = result.Post.map(post => (post.favoStatus))
        setFavo(favoArray)
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
    <><br></br>
      {isError ? (errorContent) : (<>
        <ul className={utilStyles.list} >
          {result && <Post result={result} setPostDetailShow={setPostDetailShow}
            setPostDetailResult={setPostDetailResult} loginStatus={props.loginStatus}
            favos={favos} setFavo={setFavo} setTapFavosIndex={setTapFavosIndex}
            handlePagePostByUser={handlePagePostByUser} />}
        </ul >
        {postDetailResult && <PostDetail postDetailResult={postDetailResult}
          postDetailShow={postDetailShow} setPostDetailShow={setPostDetailShow}
          favos={favos} setFavo={setFavo} tapFavosIndex={tapFavosIndex} />
        } </>
      )}</>)
}

Home.getLayout = function getLayout(home, props) {
  return (
    <Layout home>
      <NestedLayout home>{home}</NestedLayout>
    </Layout >
  )
}
