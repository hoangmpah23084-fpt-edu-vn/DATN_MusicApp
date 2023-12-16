import { ListItemButton, ListItemIcon, styled } from "@mui/material";

const ListItemButtonStyle = styled(ListItemButton)({
    width: "46px",
    height: "100%",
    borderRadius: "50px",
    transition: "0.5s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    " .MuiTouchRipple-root": {
        display: "none",
        width: "37px",
        height: "36px",
        transform: "translate(3px, 4px)",
    }
});

const ListItemIconStyle = styled(ListItemIcon)({
    minWidth: "0",
    width: "37px",
    height: "36px",
    borderRadius: "50px",
    transition: "0.5s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ":hover": {
        backgroundColor: "rgb(187 184 184 / 31%)",
    }
});

const ListItemIconBgStyle = styled(ListItemIcon)({
    minWidth: "0",
    width: "37px",
    height: "36px",
    borderRadius: "50px",
    transition: "0.5s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(187 184 184 / 31%)",
});

const PauseListItemButtonStyle = styled(ListItemButton)({
    width: "60px",
    height: "100%",
    borderRadius: "50px",
    transition: "0.5s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiTouchRipple-root": {
        display: "none"
    }
});
const PauseListItemIconStyle = styled(ListItemIcon)({
    minWidth: "0",
    width: "40px",
    height: "40px",
    borderRadius: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid white",
    ":hover": {
        border: "2px solid #3BC8E7",
        "& .MuiSvgIcon-root": {
            color: "#3BC8E7"
        }
    }
});


export {
    ListItemButtonStyle,
    ListItemIconStyle,
    ListItemIconBgStyle,
    PauseListItemButtonStyle,
    PauseListItemIconStyle,
    
}