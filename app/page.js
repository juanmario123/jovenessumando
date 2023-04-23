
import Image from 'next/image'
import styles from './page.module.css'
import imagen from '../public/JS.png'
import Head from "next/head";
import Link from "next/link";

export default function Home() {
    return (
        <div className={styles.container}>
            <div>
            <main className={styles.main}>
                <div className={styles.loginContainer}>
                    <Image className={styles.imagen} src={imagen}/>
                    <br/>
                    <Link href={"https://www.facebook.com/profile.php?id=100090333447814"} className={styles.botonfacebook}>Siguenos en Facebook</Link>
                    <Link href={"#"} className={styles.botoninstagram}>Siguenos en Instagram</Link>
                    <Link href={"#"} className={styles.botontiktok}>Siguenos en TikTok</Link>
                    <h3 className={styles.h3}>Municipios</h3>
                </div>
            </main>
            </div>
        </div>


    )
}
