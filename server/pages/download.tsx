import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Download() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jeenius - Download</title>
        <meta name="description" content="Jeenius" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Link href={"/jeenius_extension.zip"}>Download Jeenius extension</Link>
      </main>

      <footer className={styles.footer}>
        <Link
          href="https://sepana.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Powered by <b>Sepana</b></span>
        </Link>
      </footer>
    </div>
  )
}