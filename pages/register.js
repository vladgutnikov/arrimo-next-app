import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/Login.module.css";
// import { AppContext } from "../context/AppContext";

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;
  // const { userName, setUserName } = useContext(AppContext);

  const [userName, setUserName] = useState(session?.user.name);

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
      setUserName(session?.user.name);
    }
  }, [router, session, redirect]);

  useEffect(() => {
    window.localStorage.setItem("currentUser", JSON.stringify(userName));
  }, [userName]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

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
    <Layout title="Create Account">
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
          <h1 className={styles.formTitle}>Create Account</h1>
          <div className={styles.inputContainer}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              className="w-full"
              id="name"
              autoFocus
              {...register("name", {
                required: "Please enter name",
              })}
            />
            {errors.name && (
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
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
            ></input>
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Please enter password",
                minLength: {
                  value: 6,
                  message: "password is more than 5 chars",
                },
              })}
              className="w-full"
              id="password"
              autoFocus
            ></input>
            {errors.password && (
              <div className="text-red-500 ">{errors.password.message}</div>
            )}
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <input
              className="w-full"
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please enter confirm password",
                validate: (value) => value === getValues("password"),
                minLength: {
                  value: 6,
                  message: "confirm password is more than 5 characters",
                },
              })}
            />
            {errors.confirmPassword && (
              <div style={{ color: "red" }}>
                {errors.confirmPassword.message}
              </div>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <div className="text-red-500 ">Password do not match</div>
              )}
          </div>

          <div className={styles.additionalContainer}>
            <button className={styles.btn}>Register</button>
          </div>
          <div className={styles.additionalContainer}>
            Don&apos;t have an account? &nbsp;
            {/* <Link
              href={`/register?redirect=${redirect || "/"}`}
              className={styles.link}
            >
              Login
            </Link> */}
            <Link href="/login" className={styles.link}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
