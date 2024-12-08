
export default function Login() {
  return (
    <div>
        <div className=" flex justify-between mx-64  my-32">
            <div className=" my-32">
                <h3 className=" text-center text-3xl mb-8">Login</h3>
                <form >
                    <div>
                    <label className=" font-bold text-lg block ">Email</label>
                    <input className=" w-[350px] border rounded-lg px-2 py-2 mt-4   " type="email" name="" id="" placeholder="hannah.green@test.com" />
                    </div>
                    <label className=" mt-4 text-lg font-bold block">Password</label>
                    <input className=" w-[350px] border rounded-lg px-2 py-2 mt-4" type="password" name="" id="" placeholder="enter your password" />
                    <div className=" flex justify-center items-center">
                    <button className=" block  bg-main text-white px-10 rounded-xl py-2 my-4"> Log in</button>
                    </div>
                </form>
            </div>
            <div>
                <img src="/login.png" alt="" className=" w-[600px]" />
            </div>
        </div>  
    </div>
  )
}
