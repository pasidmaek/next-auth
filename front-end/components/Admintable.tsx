import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Tooltip, IconButton, Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import { RootState } from "../pages/store";

import ConfirmDelete from "./DialogDelete";
import DialogEdit from "./DialogEdit";
interface Column {
  id: "username" | "password" | "role" | "actions"; // Add "delete" option
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "username", label: "Username", minWidth: 170 },
  { id: "password", label: "Password", minWidth: 170 },
  {
    id: "role",
    label: "Role",
    minWidth: 100,
  },
  { id: "actions", label: "Actions", minWidth: 100 }, // Add column for delete icon
];

interface Idata {
  id?: number;
  username?: string;
  password?: string;
  role?: string;
  imgurl?: string;
}

const initialData = {
  username: "",
  password: "",
  role: "",
  imgurl: "",
};

function StickyHeadTable({ data }: any) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<any[]>([]);
  const [selectDelete, setSelectDelete] = useState<Idata>(initialData);
  const [selectEdit, setSelectEdit] = useState<Idata>(initialData);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);

  useEffect(() => {
    setRows(data);
    console.log("[Admintable] ->", data);
  }, [data]);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseDelete = () => {
    setIsOpenDeleteDialog(false);
  };
  const handleCloseEdit = () => {
    setIsOpenEditDialog(false);
  };

  const handleDelete = (temp: Idata) => {
    setSelectDelete(temp);
    setIsOpenDeleteDialog(true);
  };

  const handleEdit = (temp: Idata) => {
    setSelectEdit(temp);
    setIsOpenEditDialog(true);
  };

  useEffect(() => {
    //console.log('Selected value updated:', selectEdit);
  }, [selectDelete, selectEdit]);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      if (column.id === "actions") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Tooltip arrow placement="left" title="Edit">
                              <IconButton
                                onClick={() => {
                                  handleEdit(row);
                                }}
                              >
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              arrow
                              color="error"
                              placement="right"
                              title="Delete"
                            >
                              <IconButton
                                onClick={() => {
                                  handleDelete(row);
                                }}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {row[column.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={isOpenDeleteDialog}>
        <ConfirmDelete
          isOpen={isOpenDeleteDialog}
          handleCloseDelete={handleCloseDelete}
          selectDelete={selectDelete}
        />
      </Dialog>
      <Dialog open={isOpenEditDialog}>
        <DialogEdit
          isOpen={isOpenEditDialog}
          handleCloseEdit={handleCloseEdit}
          selectEdit={selectEdit}
        />
      </Dialog>
    </>
  );
}

export default StickyHeadTable;
