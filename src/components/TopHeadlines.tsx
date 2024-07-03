import { getTopHeadlines } from "@/api";
import { Articles } from "@/types";
import { removeTrashyData } from "@/utils";
import NewsList from "./NewsList";

export default async function TopHeadlines() {
  // fetch top headlines data
  const articles: Articles[] = await getTopHeadlines();

  // Need to remove articles contain null value to required attributes.
  const filteredArticles = removeTrashyData(articles);

  return (
    <div>
      <NewsList filteredArticles={filteredArticles} />
    </div>
  );
}
