import { Articles } from "@/types";
import { removeTrashyData } from "@/utils";
import { GetServerSideProps } from "next";

const BASE_URL = "https://newsapi.org/v2/";

export async function getTopHeadlines() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const response = await fetch(
    BASE_URL + "top-headlines?" + `country=us&apiKey=${process.env.NEXT_PUBLIC_API_TOKEN_NEWS}`,
    { cache: "no-store" }
  );
  const json = await response.json();

  // Need to remove articles contain null value to required attributes.
  const filteredArticles = removeTrashyData(json.articles);
  return filteredArticles;
}

export async function getSearchNews(keyword: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const response = await fetch(BASE_URL + `q=${keyword}&pageSize=10&apiKey=${process.env.NEXT_PUBLIC_API_TOKEN_NEWS}`, {
    cache: "no-store",
  });
  const json = await response.json();
  return json.articles;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.q || "";
  let articles: Articles[] = [];

  try {
    const response = await fetch(
      `${BASE_URL}everything?q=${query}&pageSize=10&apiKey=${process.env.NEXT_PUBLIC_API_TOKEN_NEWS}`,
      { cache: "no-store" }
    );
    const json = await response.json();
    articles = removeTrashyData(json.articles);
  } catch (error) {
    console.error("Error fetching news articles:", error);
  }

  return {
    props: {
      initialArticles: articles,
      initialKeyword: query,
    },
  };
};
