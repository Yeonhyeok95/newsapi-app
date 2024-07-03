import { Articles } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface Props {
  filteredArticles: Articles[];
}

export default function NewsList({ filteredArticles }: Props) {
  return (
    <div className="grid-cols-1 gap-4 p-4">
      {filteredArticles.map((article, index) => (
        <div
          key={`${article.title}-${index}`}
          className="p-4 gap-4 border rounded-lg shadow-md flex"
        >
          <div className="w-1/5">
            <Link href={article.url}>
              <Image
                src={`${article?.urlToImage !== null ? article?.urlToImage : "/news-default.jpeg"}`}
                alt={article?.title}
                width={600}
                height={400}
              />
            </Link>
          </div>
          <div className="w-4/5">
            <div className="text-xl font-bold">{article.title}</div>
            <div className="text-sm text-gray-500">
              By {article.author} | {new Date(article.publishedAt).toLocaleDateString("en-GB")}
            </div>
            <div className="text-base truncate">{article.content}</div>
            <div className="text-blue-500">
              <Link href={article.url}>Read more</Link>
            </div>
            <button className="inline-block rounded bg-neutral-100 px-6 pb-2 pt-2.5 mt-2 text-xs font-medium uppercase leading-normal text-neutral-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
              Update this News
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
