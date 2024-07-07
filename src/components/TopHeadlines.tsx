import { getTopHeadlines } from "@/api";
import { Articles } from "@/types";
import { removeTrashyData } from "@/utils";
import NewsList from "./NewsList";

export default async function TopHeadlines() {
  // fetch top headlines data
  const articles: Articles[] = await getTopHeadlines();

  return (
    <div>
      <NewsList fetchedArticles={articles} />
    </div>
  );
}
