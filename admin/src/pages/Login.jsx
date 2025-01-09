import { useContext, useState, useRef } from "react";
import { GlobalContext } from "../context/GlobelContext";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const toastBC = useRef(null);

  const login = async (e) => {
    // setPageLevelLoader(true);
    e.preventDefault();
    const response = await fetch(
      "https://agya-new-main-umye.vercel.app/api/auth/admin-login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );
    const finalData = await response.json();
    if (finalData.success) {
      localStorage.setItem("userInfo", JSON.stringify(finalData));
      setIsAuthUser(finalData);
      toastBC.current.show({
        severity: "success",
        summary: "login succesfully",
        sticky: true,
      });
      setTimeout(() => {
        window.location.href = "/overview";
      }, 500);
    } else {
      toastBC.current.show({
        severity: "error",
        summary: "login failed",
        sticky: true,
      });
    }
  };
  return (
    <div>
      <div className=" flex justify-between mx-[250px]  my-32">
        <div className=" my-20">
          <h3 className=" text-center text-3xl mb-8">Login</h3>
          <form onSubmit={login} className="">
            <div>
              <label className=" font-bold text-lg block ">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className=" w-[330px] border rounded-lg px-2 py-2 mt-4   "
                type="email"
                name=""
                id=""
                placeholder="hannah.green@test.com"
              />
            </div>
            <label className=" mt-4 text-lg font-bold block">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className=" w-[330px] border rounded-lg px-2 py-2 mt-4"
              type="password"
              name=""
              id=""
              placeholder="enter your password"
            />
            <div
              className=" mt-2 text-main cursor-pointer"
              onClick={() => navigate(`/forget-password`)}
            >
              Forget Password
            </div>
            <div className=" flex justify-center items-center">
              <button className=" block  bg-main text-white px-10 rounded-xl py-2 my-4">
                {" "}
                Log in
              </button>
            </div>
          </form>
        </div>
        <div>
          <img src="/login.png" alt="" className=" w-[480px] h-[450px]" />
        </div>
      </div>
      <Toast ref={toastBC} position="top-right" />
    </div>
  );
}
