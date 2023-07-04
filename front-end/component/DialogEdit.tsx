import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../features/userSlice";
import { RootState } from "./store";

interface Idata {
    id: number;
    username?: string;
    password?: string;
    role?: string;
    imgurl?: string;
}

interface IDialog {
    isOpen: boolean;
    handleCloseEdit: () => void;
    selectEdit: Idata;
}

const DialogEdit = (props: IDialog) => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [newUser, setNewUser] = useState<Idata>({
        username: props.selectEdit.username || "",
        password: props.selectEdit.password || "",
        role: props.selectEdit.role || "",
        id: props.selectEdit.id || 0,
        imgurl: props.selectEdit.imgurl ||
            "https://i.pinimg.com/564x/4a/ca/6f/4aca6fdd35b62296dcf6d79ada4d95e0.jpg",
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleSave = () => {
        dispatch(updateUser(newUser))
        props.handleCloseEdit();
        //console.log('updateUser -> ', updateUser)
    }
    const handleCancel = () => {
        setNewUser({
            username: "",
            password: "",
            role: "",
            imgurl:
                "https://i.pinimg.com/564x/4a/ca/6f/4aca6fdd35b62296dcf6d79ada4d95e0.jpg",
        });
        props.handleCloseEdit();
    };
    return (
        <>
            <Dialog
                open={props.isOpen}
                onClose={props.handleCloseEdit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Edit</DialogTitle>
                <DialogContent style={{ padding: '20px' }}>
                    <FormControl sx={{ m: 1, width: '5ch' }} variant="outlined">
                        <TextField
                            disabled
                            id="id-field"
                            label="ID"
                            value={props.selectEdit.id}
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <TextField
                            required
                            id="username-field"
                            label="Username"
                            // defaultValue={props.selectEdit.username}
                            value={newUser.username}
                            onChange={(event) => {
                                setNewUser((prevData) => ({
                                    ...prevData,
                                    username: event.target.value,
                                }));
                            }
                            }
                        />
                    </FormControl>

                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" required>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            required
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            defaultValue={props.selectEdit.password}
                            value={newUser.password}
                            onChange={(event) => {
                                setNewUser((prevData) => ({
                                    ...prevData,
                                    password: event.target.value,
                                }));
                            }
                            }
                            label="Password"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={newUser.role}
                            label="Role"
                            onChange={(event) => {
                                setNewUser((prevData) => ({
                                    ...prevData,
                                    role: event.target.value as string,
                                }));
                            }
                            }
                        >
                            <MenuItem value={'admin'}>Admin</MenuItem>
                            <MenuItem value={'user'}>User</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '60ch' }} variant="outlined">
                        <TextField
                            fullWidth
                            id="username-field"
                            label="Image URL"
                            defaultValue={newUser.imgurl}
                            value={props.selectEdit.imgurl}
                            onChange={(event) => {
                                setNewUser((prevData) => ({
                                    ...prevData,
                                    imgurl: event.target.value,
                                }));
                            }
                            }
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave} startIcon={<SaveAsIcon />}>Save</Button>
                    <Button onClick={handleCancel} color="error" >Cancle</Button>
                </DialogActions>
            </Dialog >

        </>
    );
};

export default DialogEdit;
