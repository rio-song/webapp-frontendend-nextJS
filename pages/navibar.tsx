import { useState, useEffect } from 'react'
import { FiPlusSquare } from 'react-icons/fi';
import { BsFillHouseDoorFill } from 'react-icons/bs';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import EditProfile from "./editProfile"
import RegisterPostImage from './registerPostImage'
import LoginPage from './loginPage'
import ResisterUser from './registerUser'
import { Logout } from '../type/api';
import { CgProfile } from "react-icons/cg";
import utilStyles from '../styles/utils.module.css'
import { IconContext } from "react-icons"

export default function Navibar(props) {
    const [profileShow, setPlofileShow] = useState(false);
    const handleProfileShow = () => setPlofileShow(true);
    const [registerImageShow, setRegisterImageShow] = useState(false);
    const handleRegisterImageShow = () => setRegisterImageShow(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            props.setLoginStatus(true);
        }
    }, [])
    const [loginPopShow, setLoginPopShow] = useState(false);
    const handleLogin = () => setLoginPopShow(true)

    const [resisterUserPopShow, setResisterUserPopShow] = useState(false);

    const logout = () => {
        async function fetchData() {
            const login = await Logout();
        }
        fetchData()
        localStorage.clear()
        props.setLoginStatus(false);
    }

    return (
        <>
            <Navbar bg="light" expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand href="#home">App</Navbar.Brand>
                    <div className={utilStyles.navIcons}>
                        <IconContext.Provider value={{ color: '#262626', size: '30px' }}>
                            <BsFillHouseDoorFill className={utilStyles.icon} />
                            {props.loginStatus ? (
                                <>
                                    <span onClick={handleRegisterImageShow}> <FiPlusSquare className={utilStyles.icon} /></span>
                                    <NavDropdown title={<CgProfile className={utilStyles.icon} />} >
                                        <NavDropdown.Item >マイページ</NavDropdown.Item>
                                        <NavDropdown.Item onClick={handleProfileShow}>プロフィールの編集</NavDropdown.Item>
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

            <EditProfile
                profileShow={profileShow}
                setprofileShow={setPlofileShow}></EditProfile>
            <RegisterPostImage
                registerImageShow={registerImageShow}
                setRegisterImageShow={setRegisterImageShow}></RegisterPostImage>
            <LoginPage
                loginPopShow={loginPopShow}
                setLoginPopShow={setLoginPopShow}
                setResisterUserPopShow={setResisterUserPopShow}
                setLoginStatus={props.setLoginStatus}
            >
            </LoginPage>
            <ResisterUser
                resisterUserPopShow={resisterUserPopShow}
                setResisterUserPopShow={setResisterUserPopShow}
                setLoginStatus={props.setLoginStatus}></ResisterUser>
        </>
    )
}