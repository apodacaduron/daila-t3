import Head from "next/head";
import styles from '~/styles/HomePage.module.scss'

export default function HomePage() {

  return (
    <>
      <Head>
        <title>Daila - Home</title>
      </Head>
      <main className={styles.main}>
        Home page
      </main>
    </>
  );
}