import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import EditProfile from "../pages/editProfile"
import RegisterPostImage from '../pages/registerPostImage'

const name = '[Your Name]'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, home, userPost }) {
  const [profileShow, setPlofileShow] = useState(false);
  const handleProfileShow = () => setPlofileShow(true);

  const [registerImageShow, setRegisterImageShow] = useState(false);
  const handleRegisterImageShow = () => setRegisterImageShow(true);

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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" >Search</Button>
          </Form>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="マイページ" id="basic-nav-dropdown" >
                <NavDropdown.Item onClick={handleRegisterImageShow}>投稿する</NavDropdown.Item>
                <NavDropdown.Item onClick={handleProfileShow}>プロフィールの編集</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">ログアウト</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
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
      <EditProfile profileShow={profileShow} setprofileShow={setPlofileShow}></EditProfile>
      <RegisterPostImage registerImageShow={registerImageShow} setRegisterImageShow={setRegisterImageShow}></RegisterPostImage>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
