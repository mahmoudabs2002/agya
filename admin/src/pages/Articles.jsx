import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";

export default function Articles() {
  const navigate = useNavigate();
  const [articlesCount, setArticlesCount] = useState();
  const [articlesData, setArticlesData] = useState([]);
  const [featuredArticlesData, setFeaturedArticlesData] = useState([]);

  useEffect(() => {
    try {
      fetch("https://agyademo.uber.space/api/articles/articles", {}).then(
        (response) => {
          response.json().then((data) => {
            setArticlesCount(data.numberOfArticles);
            setArticlesData(data.data);
          });
        }
      );
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      fetch(
        "https://agyademo.uber.space/api/FeaturedArticles/all-featured",
        {}
      ).then((response) => {
        response.json().then((data) => {
          setFeaturedArticlesData(data.data[0].articleID);
        });
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div className=" flex justify-between">
      <Sidebar />

      <div className="flex-1 ml-80 mx-[100px] py-8">
        <Navbar />
        <div className=" w-full  px-3 py-8">
          <h1 className="mb-7 text-left font-bold text-3xl text-black">
            Featured Articles
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredArticlesData === undefined || featuredArticlesData.length === 0 ? (
              <div className=" block text-center text-xl font-bold">No featured</div>
            ) : (
              featuredArticlesData.map((article, index) => (
                <div
                  key={index}
                  className="group overflow-hidden  rounded-lg min-h-72 h-72 max-h-72 border border-main bg-white shadow transition-transform hover:-translate-y-1 flex flex-col"
                >
                  <div className="overflow-hidden ">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className=" w-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-8 flex-grow flex flex-col justify-between text-center">
                    <h2 className="mb-1 text-base font-bold leading-tight text-gray-900">
                      {article.title}
                    </h2>
                    <p className="text-gray-500 text-xs">
                      {article.authorName}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div
              onClick={() => navigate("/article/featured-articles")}
              className=" flex justify-center cursor-pointer items-center rounded-lg  border-main border transition-transform min-h-72 h-72 max-h-72 hover:-translate-y-1"
            >
              <span className=" text-9xl text-main"> + </span>
            </div>
          </div>
          <div className=" mt-8">
            <h1 className="mb-7 text-left font-bold text-3xl text-black">
              All Articles
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {articlesData === undefined || articlesData.length === 0 ? 
              <div className=" block font-bold text-xl "> No articles </div> :
              articlesData.map((article, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-lg min-h-72 h-72 max-h-72 border border-main bg-white shadow transition-transform hover:-translate-y-1 flex flex-col"
                >
                  <div className="overflow-hidden">
                    <img
                      src={article.featuredImage                      }
                      alt={article.title}
                      className=" w-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-8 flex-grow flex flex-col justify-between text-center">
                    <h2 className="mb-1 text-base font-bold leading-tight text-gray-900">
                      {article.title}
                    </h2>
                    <p className="text-gray-500 text-xs">{article.authorName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
