import '../styles/global.css'
import { useState } from 'react'
import styles from '../components/layout.module.css'
import Navibar from './navibar';

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  const [loginStatus, setLoginStatus] = useState(false);
  pageProps = { loginStatus, setLoginStatus }

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
