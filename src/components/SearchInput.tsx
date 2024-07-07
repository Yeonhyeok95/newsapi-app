"use client";

import { Articles } from "@/types";
import { removeTrashyData } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import NewsList from "./NewsList";

export default function SearchInput() {
  const [keyword, setKeyword] = useState<string>("");
  const [searchedData, setSearchedData] = useState<any>([]);

  const searchParam = useSearchParams();
  const router = useRouter();

  const BASE_URL = "https://newsapi.org/v2/";

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await fetch(
          BASE_URL + `everything?${searchParam}&pageSize=10&apiKey=${process.env.NEXT_PUBLIC_API_TOKEN_NEWS}`,
          { cache: "no-store" }
        );
        const json = await response.json();
        const articles: Articles[] = json.articles;
        const filteredArticles = removeTrashyData(articles);
        setSearchedData(filteredArticles);
      } catch (error) {
        if (typeof error === "object" && error !== null) console.log(error.toString());
      }
    };

    getNews();
  }, [searchParam]);

  const searchKeyword = (e: FormEvent) => {
    e.preventDefault();
    if (!keyword) {
      router.push("/search");
    } else {
      router.push(`/search?q=${keyword}`);
    }
  };

  return (
    <div>
      <form className="flex items-center grid-cols-2 gap-2" onSubmit={searchKeyword}>
        <input
          className="text-sm text-black px-2 py-1 outline-none border border-white"
          type="text"
          placeholder="e.g. jobs, sports"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          className="inline-block rounded bg-neutral-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          type="submit"
        >
          Search
        </button>
      </form>
      <NewsList fetchedArticles={searchedData} />
    </div>
  );
}
