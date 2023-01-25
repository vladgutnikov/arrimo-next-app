import Head from "next/head";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Layout.module.css";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const navRef = useRef();
  const [name, setName] = useState();

  const logoutClickHandler = () => {
    signOut({ callbackUrl: "/" });
  };

  const showNavbar = () => {
    navRef.current.classList.toggle("responsiveNav");
  };

  return (
    <>
      <Head>
        <title>{title ? title + " - Arrimo" : "Arrimo"}</title>
        <meta name="description" content="Test App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />
      <div>
        <header>
          <Link
            href="/"
            style={{
              fontSize: "24px",
              fontWeight: 700,
              flexGrow: 1,
            }}
          >
            Arrimo app
          </Link>
          <nav ref={navRef}>
            {status === "loading"
              ? "Loading"
              : session?.user && (
                  <>
                    <Link href="/users" className={styles.link}>
                      Users
                    </Link>
                    <Link href="/calendar" className={styles.link}>
                      Calendar
                    </Link>

                    <p className={styles.welcomeText}>
                      Welcome, {session?.user.name}
                    </p>
                    <Link
                      className={styles.linkLogout}
                      href="#"
                      onClick={logoutClickHandler}
                    >
                      Logout
                    </Link>
                  </>
                )}
            <button className="nav-btn nav-close-btn" onClick={showNavbar}>
              <FaTimes />
            </button>
          </nav>
          <button className="nav-btn" onClick={showNavbar}>
            <FaBars />
          </button>
        </header>
        <main className={styles.mainSection}>{children}</main>
        <footer className={styles.footer}></footer>
      </div>
    </>
  );
}
