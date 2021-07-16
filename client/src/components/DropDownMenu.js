import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import axios from "axios";
import avatarImg from "../assets/images/avatar.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function DropDownMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const history = useHistory();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  console.log(currentUser);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  async function handleLogout() {
    console.log(currentUser);
    // console.log(JSON.parser(sessionStorage.getItem('user')));

    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/users/logout`,
        // url: `/api/users/logout`,
        withCredentials: true,
      });
      console.log(response);
      setCurrentUser(null);
      localStorage.removeItem("user");
      // await logout();
      //sessionStorage.removeItem('isAdmin')
      history.push("/");
    } catch (err) {
      console.log("frontend: ", err);
    }
  }
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <UserAvatarContainer>
      <p>{currentUser.firstName}</p>
      {/* <Avatar alt="Avatar" src={avatarImg} /> */}
      <LogOutDiv>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <ExitToAppIcon style={{ color: "#01998F" }} />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem> */}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </LogOutDiv>
    </UserAvatarContainer>
  );
}

const UserAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  // background-color: blue;

  p {
    //background-color: red;
    color: white;
    text-shadow: 2px 2px 5px #036d66;
    font-weight: 600;
    font-size: 1.2rem;
  }
`;
const LogOutDiv = styled.div`
  //background-color: blue;
`;
