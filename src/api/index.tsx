const BASE_URL = "https://newsapi.org/v2/";

export async function getTopHeadlines() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const response = await fetch(
    BASE_URL + "top-headlines?" + `country=us&apiKey=${process.env.NEXT_PUBLIC_API_TOKEN_NEWS}`,
    { cache: "no-store" }
  );
  const json = await response.json();
  return json.articles;
}

export async function getSearchNews(keyword: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const response = await fetch(
    BASE_URL + `q=${keyword}&pageSize=10&apiKey=${process.env.NEXT_PUBLIC_API_TOKEN_NEWS}`,
    { cache: "no-store" }
  );
  const json = await response.json();
  return json.articles;
}
