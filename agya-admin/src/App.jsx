import {Route, Routes } from "react-router-dom";
// import MainLayout from "./layout/mainLayout";
import Login from "./pages/Login";
import LoginLayout from "./layout/loginLayout";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
// import ReportDetails from "./pages/ReportDetails";
import ReportDetailsPost from "./pages/ReportDetailsPost";
import ReportDetailsComment from "./pages/ReportDetailsComment";
import Articles from "./pages/Articles";

function App() {

  return (
  <>
    <Routes>
      <Route path="/" element={<LoginLayout/> }>
      <Route index element={<Login/>}/>
      </Route>
      <Route path="/overview" element={<Home/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="/report" element={<Reports/>}/>
      <Route path="/report/post" element={<ReportDetailsPost/>}/>
      <Route path="/report/comment" element={<ReportDetailsComment/>}/>
      <Route path="/article" element={<Articles/>}/>
    </Routes>
  
  </>
  )
}

export default App
