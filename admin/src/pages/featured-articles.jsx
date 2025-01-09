import { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
// import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
export default function FeaturedArticles() {
  const [select, setSelect] = useState([]);
  const [articlesData, setArticlesData] = useState([]);
  const toastBC = useRef(null);


  // Function to implement search operation 
function findElement( arr, n, key)
{
    let i;
    for (i = 0; i < n; i++)
        if (arr[i] == key)
            return i;

    return -1;
}


  //   const navigate = useNavigate();
    useEffect(() => {
      try {
        fetch("http://localhost:5000/api/articles/articles", {}).then(
          (response) => {
            response.json().then((data) => {
              setArticlesData(data.data);
            });
          }
        );
      } catch (e) {
        console.log(e);
      }
    }, []);
  

  console.log(select);
  
  const toggleSelection = (id) => {
    setSelect((prevItems) =>
      prevItems.map((item) =>
        articlesData._id === id ? { ...articlesData} : item
      )
    );
  };
  const update = async (e) => {
    // setPageLevelLoader(true);
    e.preventDefault();
    if(select.length === 0 ) {
      toastBC.current.show({
        severity: 'error',
        summary: "add Featured Articles",
        sticky: true,
    })
    return false
    }
    const response = await fetch("http://localhost:5000/api/FeaturedArticles/update-featured", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      articleID : select,
      }),
    });
    const finalData = await response.json();
    if (finalData.success) {
      toastBC.current.show({
        severity: 'success',
        summary: "add featured succesfully",
        sticky: true,
    });
      setTimeout(() => {
        window.location.href = "/article";
      }, 500);
    } else {
      toastBC.current.show({
        severity: 'success',
        summary: "add featured succesfully",
        sticky: true,
    });
    setTimeout(() => {
      window.location.href = "/article";
    }, 500);
    }
  };

  return (
    <div className=" flex justify-between">
      <Sidebar />

      <div className="flex-1 mx-[100px] py-8">
        <Navbar />
        <form onSubmit={update} className=" w-full  px-3 py-8">
        <div className="  flex justify-between mb-4">
        <h1 className="mb-7 text-left font-bold text-3xl text-black">
            Featured Articles
          </h1>
          <div onClick={()=> setSelect([])} className=" cursor-pointer bg-main rounded-xl text-white px-6 py-2 h-fit hover:scale-[1.1]  duration-500">
            Reset
          </div>
        </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articlesData.map((article, index) => (
              <div
                key={index}
                className={`${findElement(select , select.length , article._id) === -1 ? "": "bg-black/60" } cursor-pointer group overflow-hidden rounded-lg border min-h-72 h-72 max-h-72 border-main bg-white shadow transition-transform hover:-translate-y-1 flex flex-col`}
                onClick={() => {
                  if (select.length <= 2) {
                    if (select.includes(article._id)){
                      select.pop(article._id)
                    } else (
                      select.push(article._id)
                    )
                  } 
                    toggleSelection(article._id)
                }}
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
          </div>
          <div className=" flex justify-center items-center">
            <button className=" mt-4 bg-main hover:scale-[1.1] duration-500 text-white py-2 px-10 rounded-xl">Save</button>
          </div>
        </form>
      </div>
      <Toast ref={toastBC} position="top-right" />
    </div>
  );
}
