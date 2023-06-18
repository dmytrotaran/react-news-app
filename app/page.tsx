"use client";

import { useAppSelector } from "@/store/hooks";

// COMPONENTS ========================================
import { HiOutlineUserCircle } from "react-icons/hi2";
import { Filter } from "./components";

// ===================================================
// HOME PAGE COMPONENT (app/page.tsx) ================
// ===================================================
export default function Home() {
  // RETURN ==========================================
  return (
    <main className="container w-[90%] md:w-[75%] py-4">
      {/* filters */}
      <div className="">
        <Filter />
      </div>
      {/* news */}
      <NewsSection />
    </main>
  );
}

// EXTENDED COMPONENTS =================================
const NewsSection = () => {
  // redux
  const { loading, error, news } = useAppSelector(state => state.news);

  return (
    <section className="text-gray-600 mt-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap -m-4">
          {loading ? (
            <h1 className="p-4">Loading...</h1>
          ) : error ? (
            <h1 className="p-4">{error}</h1>
          ) : news && news.articles.length > 0 ? (
            news.articles
              .slice(0, 6)
              .map(article => <NewsCard key={article.url} data={article} />)
          ) : (
            <h1 className="p-4">No news found</h1>
          )}
        </div>
      </div>
    </section>
  );
};

const NewsCard = ({ data }: { data: any }) => {
  return (
    <div className="p-4 md:w-1/3 ">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden ">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={data.urlToImage}
          alt="blog"
        />
        <div className="p-6 bg-white">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            SOURCE
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {data.source.name}
          </h1>
          <p className="leading-relaxed mb-3">
            {data.content.slice(0, 100)}...
          </p>
          <div className="flex items-center flex-wrap ">
            <a
              className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
              href={data.url}
              target="_blank"
            >
              Learn More
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <span className="text-gray-400 inline-flex gap-2 items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm py-1 ">
              <HiOutlineUserCircle className="h-5 w-5" />
              <span>{data.author}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
