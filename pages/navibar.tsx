import { useState, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import EditProfile from "./editProfile"
import RegisterPostImage from './registerPostImage'
import LoginPage from './loginPage'
import ResisterUser from './registerUser'
import { Logout } from '../type/api';

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
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success" ><AiOutlineSearch /></Button>
                    </Form>
                    {props.loginStatus ? (
                        <>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavDropdown title="マイページ" id="basic-nav-dropdown" >
                                        <NavDropdown.Item onClick={handleRegisterImageShow}>投稿する</NavDropdown.Item>
                                        <NavDropdown.Item onClick={handleProfileShow}>プロフィールの編集</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={logout}>ログアウト</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </>) : (
                        <Button onClick={handleLogin}>ログイン</Button>
                    )}
                </Container>
            </Navbar>

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