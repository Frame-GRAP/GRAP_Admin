import React from "react";
import {Dialog, DialogContent, DialogTitle, makeStyles, Typography} from "@material-ui/core";
import Controller from "./Controller";

const useStyles = makeStyles(theme => ({
    dialogWrapper : {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle:{
        padding: theme.spacing(1),
    }
}))

export default function Popup(props) {
    const {title, children, openPopup, setOpenPopup} = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" className={{ paper : classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display: 'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow:1}}>
                        {title}
                    </Typography>
                    <Controller.Button
                        color="secondary"
                        text="X"
                        onClick={() => {setOpenPopup(false)}}
                    />
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
