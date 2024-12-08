import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
// import { dataset, valueFormatter } from "../assets/data";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

export default function Users() {
  const settings = {
    width: 200,
    height: 200,
    value: 60,
  };

  return (
    <div className=" flex justify-between">
      <Sidebar />
      <div className="flex-1 mx-[100px] py-8">
        <Navbar />
        <div>
          <div className=" flex justify-between">
            <div className=" shadow-xl py-5 px-6 mt-5 w-fit">
              <h3 className=" text-2xl font-bold mx-4">Users </h3>
              <Gauge
                {...settings}
                cornerRadius="50%"
                sx={(theme) => ({
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 40,
                  },
                  [`& .${gaugeClasses.valueArc}`]: {
                    fill: "#005F6A",
                  },
                  [`& .${gaugeClasses.referenceArc}`]: {
                    fill: theme.palette.text.disabled,
                  },
                })}
              />
              <div className=" flex justify-between gap-4">
                <div>
                  <h3>Vistors</h3>
                  <p className=" flex items-center text-black/50 gap-2">
                    <p className="bg-main  w-2 h-2 rounded-full"> </p> 1000
                  </p>
                </div>
                <div>
                  <h3>Registered</h3>
                  <p className=" flex items-center text-black/50 gap-2">
                    <p className="bg-secondary  w-2 h-2 rounded-full"> </p> 1000
                  </p>
                </div>
              </div>
            </div>
            <div className=" flex mt-40 border border-main h-fit rounded-lg">
              <div className=" py-4 px-4 border-r border-main">
                <h3>Total no. of accounts</h3>
                <p className=" text-center text-2xl font-bold">180,5784</p>
              </div>
              <div className=" py-4 px-8">
                <h3 className=" text-main">Active Users</h3>
                <p className=" text-center text-2xl font-bold">50,445</p>
              </div>
            </div>
          </div>
          <div className=" my-4">
            <h3 className="font-bold text-3xl">List of Users</h3>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Photo</TableCell>
                    <TableCell align="center">User Name</TableCell>
                    <TableCell align="center">Academic Title</TableCell>
                    <TableCell align="center">Affiliation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" >
                        <span>                      <img
                        src="https://via.placeholder.com/80" // Replace with the actual image URL
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      /></span>
                    </TableCell>
                    <TableCell  align="center"><span className="text-black/50">Emma Stone</span></TableCell>
                    <TableCell  align="center"><span className="text-black/50">Archaeology Professor</span></TableCell>
                    <TableCell  align="center"><span className="text-black/50">Nile University</span></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
