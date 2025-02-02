import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function Reports() {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    try {
      fetch("https://agyademo.uber.space/api/reports/all-reports", {}).then(
        (response) => {
          response.json().then((data) => {
            setReportData(data.data);
          });
        }
      );
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className=" flex justify-between">
      <Sidebar />
      <div className="flex-1 ml-80 mx-[100px] py-8">
        <Navbar />
        <div className=" my-4">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                {reportData === undefined || reportData.length === 0 ? (
                  <div className=" text-center  font-bold text-2xl" >No Report</div>
                ) : (
                  reportData.map((report) => {
                    return (
                      <TableRow
                        className=" cursor-pointer"
                        key={report._id}
                        onClick={() =>
                          navigate(
                            `${
                              report.articleId !== undefined
                                ? `/report/article/${report.articleId}/${report.content}?id=${report._id}`
                                : report.postId !== undefined
                                ? `/report/post/${report.postId}/${report.content}?id=${report._id}`
                                : report.commentId !== undefined
                                ? `/report/comment/${report.commentId}/${report.content}?id=${report._id}`
                                : null
                            }`
                          )
                        }
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">
                          <span>
                            {" "}
                            <img
                              src={
                                report.userImage ||
                                "https://via.placeholder.com/80"
                              } // Replace with the actual image URL
                              alt="Profile"
                              className="w-8 h-8 rounded-full"
                            />
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <span
                            className={`${
                              report?.isRead === true
                                ? "text-black/50"
                                : "text-black"
                            }`}
                          >
                            {report.username}
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <span
                            className={`${
                              report?.isRead === true
                                ? "text-black/50"
                                : "text-black"
                            }`}
                          >
                            {report.username} Reported a{" "}
                            {report.articleId !== undefined ? (
                              <span>Article</span>
                            ) : report.postId !== undefined ? (
                              <span>Post</span>
                            ) : report.commentId !== undefined ? (
                              <span>Comment</span>
                            ) : null}{" "}
                            : Major Paleolithic Site Excavated...
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <span
                            className={`${
                              report?.isRead === true
                                ? "text-black/50"
                                : "text-black"
                            }`}
                          >
                            {format(report.createdAt, "p")}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}

                {/* <TableRow
                  className=" cursor-pointer"
                  onClick={()=>navigate('/report/comment')}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" >
                        <span>                      <img
                        src="https://via.placeholder.com/80" // Replace with the actual image URL
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      /></span>
                    </TableCell>
                    <TableCell  align="center"><span className="text-black/50">Nada Abbas</span></TableCell>
                    <TableCell  align="center"><span className="text-black/50">Nada Abbas Reported a post: Major Paleolithic Site Excavated...</span></TableCell>
                    <TableCell  align="center"><span className="text-black/50">8:38 AM</span></TableCell>
                  </TableRow>
                   */}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
