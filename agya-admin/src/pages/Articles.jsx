import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function Articles() {
  const articles = [
    {
      title: "Tracking Humans' First Footsteps in North America",
      author: "Ahmed Sayed",
      image: "article.png",
    },
    {
      title: "Site Linked to King Arthur Older Than Previously Known",
      author: "Mohamed Anwar",
      image: "article.png",
    },
  ];

  return (
    <div className=" flex justify-between">
      <Sidebar />

      <div className="flex-1 mx-[100px] py-8">
      <Navbar />
        <div className=" w-full  px-3 py-8">
          <h1 className="mb-7 text-left font-bold text-3xl text-black">
            Featured Articles
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-lg border border-main bg-white shadow transition-transform hover:-translate-y-1 flex flex-col"
              >
                <div className="overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className=" w-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-8 flex-grow flex flex-col justify-between text-center">
                  <h2 className="mb-1 text-base font-bold leading-tight text-gray-900">
                    {article.title}
                  </h2>
                  <p className="text-gray-500 text-xs">{article.author}</p>
                </div>
              </div>
            ))}
            <div className=" flex justify-center cursor-pointer items-center border-main border transition-transform hover:-translate-y-1">
                 <span className=" text-9xl text-main"> + </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
