import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
// import { dataset, valueFormatter } from "../assets/data";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PencilOff } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

export default function Admins() {
  const navigate = useNavigate();
  const [adminsData, setAdminsData] = useState([]);
  const toastBC = useRef(null);

  useEffect(() => {
    try {
      fetch("https://agyademo.uber.space/api/auth/all-admin", {}).then(
        (response) => {
          response.json().then((data) => {
            setAdminsData(data.data);
          });
        }
      );
    } catch (e) {
      console.log(e);
    }
  }, []);
  const deleteAdmin = async (id) => {
    const data = await fetch(
      `https://agyademo.uber.space/api/auth/delete-admin/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const finalData = await data.json();
    if (finalData.success) {
      toastBC.current.show({
        severity: "success",
        summary: "removed admin succesfully",
        sticky: true,
      });
      setTimeout(() => {
        window.location.href = "/admin";
      }, 1000);
    } else {
      toastBC.current.show({
        severity: "error",
        summary: "something wrong",
        sticky: true,
      });
    }
  };
  return (
    <div className=" flex justify-between">
      <Sidebar />
      <div className="flex-1 ml-80 mx-[100px] py-8">
        <Navbar />
        <div>
          <div className=" my-8">
            <div className=" flex justify-end mb-4">
              <button
                className=" bg-main text-white py-3 px-8 rounded-xl"
                onClick={() => navigate("/admin/add-admin")}
              >
                New Admin
              </button>
            </div>
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                className="border"
              >
                <TableHead className=" border">
                  <TableRow>
                    <TableCell align="center">Photo</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adminsData === undefined ? (
                    <div>Loading</div>
                  ) : adminsData.length === 0 ? (
                    <div>no admins</div>
                  ) : (
                    adminsData.map((admin) => {
                      return (
                        <TableRow key={admin._id}>
                          <TableCell align="center" width={50}>
                            <span>
                              {" "}
                              <img
                                src={
                                  admin.image ||
                                  "https://via.placeholder.com/80"
                                } // Replace with the actual image URL
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                              />
                            </span>
                          </TableCell>
                          <TableCell align="center">
                            <span className="text-black/50">{admin.email}</span>
                          </TableCell>
                          <TableCell align="center">
                            <span className="text-black/50">
                              {admin.firstname}
                            </span>
                          </TableCell>
                          <TableCell width={50} align="center" className="">
                            <div className=" flex justify-center items-center rounded-xl border ">
                              <PencilOff
                                className=" border-r w-12 py-1 cursor-pointer "
                                onClick={() =>
                                  navigate(`/admin/edit/${admin._id}`)
                                }
                              />
                              <Trash2
                                className=" text-red-600 cursor-pointer  w-12 py-1"
                                onClick={() => deleteAdmin(admin._id)}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <Toast ref={toastBC} position="top-right" />
    </div>
  );
}
