import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../features/userSlice";
import { getSession, useSession } from "next-auth/react";
import jwt from "jsonwebtoken";
interface Idata {
    id: number;
    username?: string;
    password?: string;
    role?: string;
    imgurl?: string;
    email?: string;
}

interface IDialog {
    isOpen: boolean;
    handleCloseDelete: () => void;
    selectDelete: Idata;
}

const ConfirmDelete = (props: IDialog) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { status, data: session } = useSession();
    const decodedToken = jwt.decode(session?.userid); 
   
    const handleDelete = () => {
        console.log('select user-> ',props.selectDelete)
        if (props.selectDelete.role !== decodedToken) {
            dispatch(deleteUser(props.selectDelete.id))
        }
        else{
            alert ("Cannot delete loging account!! ")
        }
        props.handleCloseDelete();
    }
    return (
        <>
            <Dialog
                open={props.isOpen}
                onClose={props.handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete <span style={{fontWeight:'bold'}}>'{props.selectDelete.username} ?'</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCloseDelete} autoFocus >No</Button>
                    <Button onClick={handleDelete} color="error">Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ConfirmDelete;