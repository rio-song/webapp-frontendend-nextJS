import '../styles/global.css'
import { useState } from 'react'
import { Toast, } from 'react-bootstrap'
import styles from '../components/layout.module.css'
import Navibar from './navibar';

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginPopShow, setLoginPopShow] = useState(false);
  const [topRefresh, setTopRefresh] = useState(true);
  const [commonErrorHandling, setCommonErrorHandling] = useState(false);
  const [commonErrorMessage, setCommonErrorMessage] = useState("");

  pageProps = {
    loginStatus, setLoginStatus, loginPopShow, setLoginPopShow,
    topRefresh, setTopRefresh, commonErrorHandling, setCommonErrorHandling,
    commonErrorMessage, setCommonErrorMessage
  }

  // const handleClose = () => {
  //   setCommonErrorHandling(false)
  //   setCommonErrorMessage('')
  // };

  return getLayout(
    <>
      <header className={styles.header}>
        <Navibar {...pageProps}></Navibar>
      </header>

      <Component {...pageProps}>
      </Component>
      {/* <Toast show={commonErrorHandling} onClose={handleClose}>
        <Toast.Body>{commonErrorMessage}</Toast.Body>
      </Toast> */}
    </>
  )
}
