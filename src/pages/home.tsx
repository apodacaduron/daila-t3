/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'
import { MainSection, Nav } from '~/features/home-page'
import styles from '~/styles/HomePage.module.scss'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Daila - Home</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className={styles.main}>
        <Nav />
        <MainSection />
      </main>
    </>
  )
}
