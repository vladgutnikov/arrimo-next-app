import React from "react";
import Layout from "./Layout";

const Home = ({ posts }) => {
  return (
    <Layout>
      <h1>{posts.title}</h1>
      <p>{posts.description}</p>
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const posts = { title: "New Post", description: "Lorem...." };
  return {
    props: posts,
  };
}
