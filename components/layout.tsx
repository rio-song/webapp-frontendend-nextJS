import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import EditProfile from "../pages/editProfile"
import RegisterPostImage from '../pages/registerPostImage'
import LoginPage from '../pages/loginPage'
import ResisterUser from '../pages/registerUser'
import { AiOutlineSearch } from 'react-icons/ai';

const name = 'App'
export const siteTitle = 'App'

export default function Layout({ children, home }) {
  const [profileShow, setPlofileShow] = useState(false);
  const handleProfileShow = () => setPlofileShow(true);

  const [registerImageShow, setRegisterImageShow] = useState(false);
  const handleRegisterImageShow = () => setRegisterImageShow(true);

  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      setLoginStatus(true);
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
    setLoginStatus(false);
  }

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      />
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
          {loginStatus ? (
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
      <header className={styles.header}>
        {home ? (
          <>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
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
        setLoginStatus={setLoginStatus}
      >
      </LoginPage>
      <ResisterUser
        resisterUserPopShow={resisterUserPopShow}
        setResisterUserPopShow={setResisterUserPopShow}
        setLoginStatus={setLoginStatus}></ResisterUser>
      <main>{children}</main>
      {
        !home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>戻る</a>
            </Link>
          </div>
        )
      }
    </div >
  )
}


async function Logout() {
  const url = "http://localhost:8000/api/logout";

  const request = {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // "token": localStorage.getItem('token'),
      //  'Access-Control-Allow-Origin': 'http://localhost:8000'
    },

  }
  const response = await fetch(url, request);
  const posts = await response.status
  return posts
}