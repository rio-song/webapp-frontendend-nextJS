import { useState, useEffect } from 'react'
import { FiPlusSquare } from 'react-icons/fi';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { Navbar, Container, NavDropdown } from 'react-bootstrap'
import ViewProfile from "./viewProfile"
import RegisterPostImage from './registerPostImage'
import LoginPage from './loginPage'
import ResisterUser from './registerUser'
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons"
import { getUser, Logout } from '../type/api';
import { useRouter } from 'next/router';
import navbar from '../styles/navbar.module.css'

export default function Navibar(props) {
    const [viewProfileShow, setViewProfileShow] = useState(false);
    const [registerImageShow, setRegisterImageShow] = useState(false);
    const handleRegisterImageShow = () => setRegisterImageShow(true);

    const [viewProfileResult, setViewProfileResult] = useState();
    const [statusCode, setStatusCode] = useState();
    const [isError, setIsError] = useState(false);
    const [errorContent, setErrorContent] = useState("");


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            props.setLoginStatus(true);
        }
    }, [])

    const handleLogin = () => props.setLoginPopShow(true)

    const [resisterUserPopShow, setResisterUserPopShow] = useState();

    const logout = () => {
        async function fetchData() {
            const login = await Logout();
        }
        fetchData()
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        props.setLoginStatus(false);
    }

    const handleViewProfileShow = () => {
        setViewProfileShow(true)
        async function fetchData() {
            const getUserResult = await getUser(setStatusCode);
            setViewProfileResult(getUserResult);
        }
        fetchData();
    }
    useEffect(() => {
        if (statusCode === 200 || statusCode === 201) {
            setIsError(false)
        } else if (statusCode === 400) {
            setIsError(true);
            setErrorContent(viewProfileResult);
            localStorage.clear()
            props.setLoginStatus(false);
        } else {
            setIsError(true);
            setErrorContent(viewProfileResult);
        }
    }, [statusCode, viewProfileResult])

    const router = useRouter();
    const handleMyPostPage = () => {
        router.push({
            pathname: "/userPosts",
            query: { page: "me" }
        });
    }

    return (
        <>
            <Navbar bg="light" expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand href="/">App</Navbar.Brand>
                    <div className={navbar.navIcons}>
                        <IconContext.Provider value={{ color: '#262626', size: '30px' }}>
                            {props.loginStatus ? (
                                <>
                                    <BsFillHouseDoorFill className={navbar.icon} onClick={() => handleMyPostPage()} />
                                    <FiPlusSquare onClick={() => handleRegisterImageShow()} />
                                    <NavDropdown title={<CgProfile />} >
                                        <NavDropdown.Item onClick={() => handleMyPostPage()}>マイページ</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleViewProfileShow()}>プロフィールの確認</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={logout}>ログアウト</NavDropdown.Item>
                                    </NavDropdown>
                                </>) : (
                                <span onClick={handleLogin}><CgProfile /></span>
                            )}
                        </IconContext.Provider>
                    </div>
                </Container>
            </Navbar >

            {viewProfileResult && <ViewProfile
                viewProfileShow={viewProfileShow}
                setViewProfileShow={setViewProfileShow}
                viewProfileResult={viewProfileResult}
                setLoginStatus={props.setLoginStatus}></ViewProfile>
            }
            <RegisterPostImage
                registerImageShow={registerImageShow}
                setRegisterImageShow={setRegisterImageShow}
                topRefresh={props.topRefresh} setTopRefresh={props.setTopRefresh} ></RegisterPostImage>
            <LoginPage
                loginPopShow={props.loginPopShow}
                setLoginPopShow={props.setLoginPopShow}
                setResisterUserPopShow={setResisterUserPopShow}
                setLoginStatus={props.setLoginStatus}
            >
            </LoginPage>
            <ResisterUser
                resisterUserPopShow={resisterUserPopShow}
                setResisterUserPopShow={setResisterUserPopShow}
                setLoginStatus={props.setLoginStatus}
                postResult={props.postResult} setPostResult={props.setPostResult}></ResisterUser>
        </>
    )
}