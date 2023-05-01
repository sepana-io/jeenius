import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jeenius</title>
        <meta name="description" content="Jeenius" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Jeenius</a> back-end
        </h1>

        <p className={styles.description}>
          Available API endpoints:
        </p>

        <div className={styles.grid}>
          <Link href="/api/gpt/replace this text with your prompt" className={styles.card}>
            <h2>Talk to GPT &rarr;</h2>
            <p>Send prompt to CHAT-GPT and get response</p>
          </Link>
        </div>
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