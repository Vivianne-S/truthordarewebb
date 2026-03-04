import CosmicBackground from "@/components/landing/CosmicBackground";
import styles from "@/components/landing/landing.module.css";

export default function Home() {

  return (
    <main className={styles.page}>

      <CosmicBackground/>

      <div className={styles.content}>
        <h1 className={styles.title}>Truth or Dare</h1>
        <p className={styles.subtitle}>
          Cosmic background should cover the full screen ✅
        </p>
      </div>

    </main>
  )

}