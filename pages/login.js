import Link from "next/link";
import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { getError } from "../utils/error";
import Layout from "../components/Layout";
import styles from "../styles/Login.module.css";
// import { AppContext } from "../context/AppContext";

const LoginPage = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;
  const [userName, setUserName] = useState(session?.user.name);

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
      setUserName(session?.user.name);
    }
  }, [router, session, redirect, setUserName]);

  useEffect(() => {
    window.localStorage.setItem("currentUser", JSON.stringify(userName));
  }, [userName]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="login">
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
          <h1 className={styles.formTitle}>Login</h1>
          <div className={styles.inputContainer}>
            <label htmlFor="userId" className={styles.label}>
              Email
            </label>{" "}
            <br />
            <input
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "Please enter valid email",
                },
              })}
              className="w-full"
              id="email"
              autoFocus
            ></input>
            {errors.email && (
              <div style={{ color: "red" }}>{errors.email.message}</div>
            )}
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="userId" className={styles.label}>
              Password
            </label>{" "}
            <input
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: "Please enter password",
                minLength: {
                  value: 6,
                  message: "Password is more than 5 characters",
                },
              })}
              className="w-full"
              id="password"
              autoFocus
            ></input>
            {errors.password && (
              <div style={{ color: "red" }}>{errors.password.message}</div>
            )}
          </div>
          <div className={styles.additionalContainer}>
            <button className={styles.btn}>Login</button>
          </div>
          <div className={styles.additionalContainer}>
            Don&apos;t have an account? &nbsp;
            <Link href="/register" className={styles.link}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default LoginPage;
