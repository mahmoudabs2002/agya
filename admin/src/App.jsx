import {Route, Routes } from "react-router-dom";
// import MainLayout from "./layout/mainLayout";
import Login from "./pages/Login";
// import LoginLayout from "./layout/loginLayout";
import Home from "./pages/Home";
import Users from "./pages/users.jsx";
import Reports from "./pages/Reports";
// import ReportDetails from "./pages/ReportDetails";
import ReportDetailsPost from "./pages/ReportDetailsPost";
import ReportDetailsComment from "./pages/ReportDetailsComment";
import Articles from "./pages/Articles";
import FeaturedArticles from "./pages/featured-articles";
import ArticleEdit from "./pages/article-edit";
import AddArticle from "./pages/Add-article";
import Tages from "./pages/tages";
import Activities from "./pages/Activities";
import ActiviteDetails from "./pages/ActiviteDetails";
import ActiviteEdit from "./pages/Activite-edit";
import PendingActivities from "./pages/PendingActivities";
import PendingActivitiesDetails from "./pages/PendingActivitiesDetails";
import Messages from "./pages/Messages";
import Admins from "./pages/Admins";
import AdminEdit from "./pages/Admin-edit";
import NewAdmin from "./pages/New-admin";
import ReportDetailsArticle from "./pages/ReportDetailsArticle";
import Search from "./pages/search";
import ForgetPassword from "./pages/forgetPassword";
import EditPassword from "./pages/Edit-password";

function App() {

  return (
  <>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/overview" element={<Home/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="/report" element={<Reports/>}/>
      <Route path="/report/article/:id/:content" element={<ReportDetailsArticle/>}/>
      <Route path="/report/comment/:id/:content" element={<ReportDetailsComment/>}/>
      <Route path="/report/post/:id/:content" element={<ReportDetailsPost/>}/>
      <Route path="/article" element={<Articles/>}/>
      <Route path="/article/featured-articles" element={<FeaturedArticles/>}/>
      <Route path="/article/:name/edit" element={<ArticleEdit/>}/>
      <Route path="/article/add" element={<AddArticle/>}/>
      <Route path="/tags" element={<Tages/>}/>
      <Route path="/activities" element={<Activities/>}/>
      <Route path="/activities/:id" element={<ActiviteDetails/>}/>
      <Route path="/activities/:id/edit" element={<ActiviteEdit/>}/>
      <Route path="/activity/new-activity" element={<ActiviteEdit/>}/>
      <Route path="/activities/:id/edit" element={<ActiviteEdit/>}/>
      <Route path="/activities/pending-activities" element={<PendingActivities/>}/>
      <Route path="/activities/pending-activities/:id" element={<PendingActivitiesDetails/>}/>
      <Route path="/messages" element={<Messages/>}/>
      <Route path="/article/search" element={<Search/>}/>
      <Route path="/admin" element={<Admins/>}/>
      <Route path="/admin/add-admin" element={<NewAdmin/>}/>
      <Route path="/admin/edit/:id" element={<AdminEdit/>}/>
      <Route path="/forget-password" element={<ForgetPassword/>}/>
      <Route path="/edit-password/:id" element={<EditPassword/>}/>
    </Routes>
  </>
  )
}

export default App
