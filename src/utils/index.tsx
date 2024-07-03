import { Articles } from "@/types";

// Need to remove articles contain null value to required attributes.
export function removeTrashyData(articles: Articles[]) {
  const filteredArticles = articles.filter((articles) => articles?.source.id !== null);
  return filteredArticles;
}
