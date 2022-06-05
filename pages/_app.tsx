import '../styles/global.css'
import { useState } from 'react'
import styles from '../components/layout.module.css'
import Navibar from './navibar';

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginPopShow, setLoginPopShow] = useState(false);
  const [topRefresh, setTopRefresh] = useState(true);

  pageProps = { loginStatus, setLoginStatus, loginPopShow, setLoginPopShow, topRefresh, setTopRefresh }

  return getLayout(
    <>
      <header className={styles.header}>
        <Navibar {...pageProps}></Navibar>
      </header>

      <Component {...pageProps}>
      </Component>
    </>
  )
}
