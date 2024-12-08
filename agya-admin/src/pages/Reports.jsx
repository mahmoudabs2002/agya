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

export default function Reports() {
    const navigate = useNavigate();
  return (
    <div className=" flex justify-between">
      <Sidebar />
      <div className="flex-1 mx-[100px] py-8">
        <Navbar />
        <div className=" my-4">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableBody>
                  <TableRow
                  className=" cursor-pointer"
                  onClick={()=>navigate('/report/post')}
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
                  <TableRow
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
                  
                  
                </TableBody>
              </Table>
            </TableContainer>
          </div>
      </div>
    </div>
  );
}
