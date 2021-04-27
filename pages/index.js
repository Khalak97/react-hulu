import Head from "next/head";

import Header from "../components/Header";
import Nav from "../components/Nav";
import Results from "../components/Results";

import requests from "../utils/requests";

// render on the client
export default function Home({ results }) {
  return (
    <div>
      <Head>
        <title>Next app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Nav />
      <Results results={results} />
    </div>
  );
}

// render on the server
export async function getServerSideProps(context) {
  const genre = context.query.genre;

  const request = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then((res) => res.json());

  return {
    props: {
      results: request.results,
    },
  };
}
