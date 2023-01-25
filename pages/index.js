import Head from "next/head";
import Link from "next/link";

import Layout from "../components/Layout";

import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { Button, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title } = Typography;

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Layout title="HomePage">
          <div className={styles.homeContainer}>
            {session?.user ? (
              <>
                <Title
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  Welcome to our management app, {session?.user.name}!
                </Title>
              </>
            ) : (
              <>
                <Title
                  style={{
                    textAlign: "center",
                  }}
                >
                  To use this app, please Login
                </Title>
                <div className={styles.additionalContainer}>
                  <Button className={styles.btn}>
                    <Link href="/login">Login</Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </Layout>
      </main>
    </>
  );
}

function DeleteComponent({ deletehandler, canclehandler }) {
  return (
    <div className="">
      <button>Are you sure?</button>
      <button
        onClick={deletehandler}
        className="flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50"
      >
        Yes
      </button>
      <button
        onClick={canclehandler}
        className="flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gree-500 hover:border-green-500 hover:text-gray-50"
      >
        No
      </button>
    </div>
  );
}