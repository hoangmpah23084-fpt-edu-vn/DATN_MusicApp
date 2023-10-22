import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { Avatar, Collapse, ListItemAvatar } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GridViewIcon from '@mui/icons-material/GridView';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import LayersIcon from '@mui/icons-material/Layers';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { Link, Outlet } from 'react-router-dom';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import LogoutIcon from '@mui/icons-material/Logout';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function LayoutAdmin() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openArtist, setOpenArtist] = React.useState(false);
  const [openSong, setOpenSong] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);
  const [openGenre, setOpenGenre] = React.useState(false);
  const [openAlbum, setOpenAlbum] = React.useState(false);
  const [openUserif, setUserif] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClickUser = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setUserif((previousOpen) => !previousOpen);
  };
  const closeLeave = () => {
    setUserif((previousOpen) => !previousOpen);
  }

  const canBeOpen = anchorEl && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;


  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setOpenSong(false);
    setOpenArtist(false);
  };
  const handleClick = () => {
    setOpenSong(!openSong);
  };
  const handleArtist = () => {
    setOpenArtist(!openArtist);
  };
  const handleAlbum = () => {
    setOpenAlbum(!openAlbum);
  };
  const handleUser = () => {
    setOpenUser(!openUser);
  };
  const handleGenre = () => {
    setOpenGenre(!openGenre);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar  sx={{backgroundColor : "white", boxShadow : "none",
              borderBottom : "1px solid #DDDDDD",}} position="fixed" open={open}>
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
              color : "gray",
              "&:hover" : {
                backgroundColor : "#F1F6F9",
                color : "#27374D"
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display : "flex", justifyContent : "space-between", width : "100%", height : "65px" }} >
            <Box sx={{ width : "20%", height : "65px" }} ></Box>
            <Box sx={{ width : "15%", height : "65px", display : "flex" }}>
            <Box sx={{ width : "20%", mr : "1%"  , height : "65px" ,display : "flex", justifyContent : "space-between", alignItems : "center"  }} >
            <IconButton ><SettingsSuggestIcon /></IconButton>
            </Box>
            <Box  sx={{ width : "79%", height : "65px" }} >
              <List sx={{ width : "100%", height : "65px", padding : 0,  }} >
                 <ListItem  sx={{  p : "10px 5px 0px 5px" }} >
                  <ListItemButton sx={{ padding : 0}} onClick={handleClickUser} >
                  <ListItemAvatar>
                       <Avatar sx={{width: 35, height: 35 }}></Avatar>
                   </ListItemAvatar>
                     <ListItemText  
                     sx={{
                           "& .css-10hburv-MuiTypography-root" : {
                               color : 'gray',
                               fontSize : "0.7rem"
                             } ,
                             "& .css-83ijpv-MuiTypography-root" : {
                              color : "#567189",
                              fontSize : "0.8rem",
                              fontWeight : "700"
                             }
                     }} primary="Admin" secondary="Pham Thang" />
                  </ListItemButton>
                  </ListItem>
                        <Popper id={id} onMouseLeave={closeLeave} open={openUserif} anchorEl={anchorEl} transition>
                          {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                       <Box sx={{ width : 250, mr : 5 ,height : 200, backgroundColor : "white", borderRadius : "10px", boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }}>
                          <Box sx={{ width : "100%", height : "30%", borderBottom : "1px solid #DDDDDD" }} >
                            <List sx={{width : "100%", height : "100%"}} >
                              <ListItem sx={{ paddingTop : 0 }} >
                                <ListItemAvatar>
                                  <Avatar sx={{width: 35, height: 35 }}></Avatar>
                                </ListItemAvatar>
                                <ListItemText sx={{
                           "& .css-10hburv-MuiTypography-root" : {
                               color : 'gray',
                               fontSize : "0.8rem",
                               fontWeight : "900"
                             } ,
                             "& .css-83ijpv-MuiTypography-root" : {
                              color : "gray",
                              fontSize : "0.8rem",
                             }
                              }} primary="Pham Thang" secondary="thang@gmail.com" ></ListItemText>
                              </ListItem>
                            </List>
                          </Box>
                          <Box sx={{ width : "100%", height : "70%" }}>
                            <List>
                              <ListItemButton sx={{ padding : "3px 16px" }}>
                                <ListItemIcon><SupervisedUserCircleIcon /></ListItemIcon>
                                <ListItemText><Typography>Profile</Typography></ListItemText>
                              </ListItemButton>
                              <ListItemButton sx={{ padding : "3px 16px" }} >
                                <ListItemIcon><LockOpenIcon /></ListItemIcon>
                                <ListItemText><Typography>Account Setting</Typography></ListItemText>
                              </ListItemButton>
                            </List>
                            <Divider />
                            <List>
                              <ListItemButton sx={{ padding : "0px 16px" }}>
                                <ListItemIcon><LogoutIcon /></ListItemIcon>
                                <ListItemText><Typography>Sign out</Typography></ListItemText>
                              </ListItemButton>
                            </List>
                          </Box>
                       </Box>
                       </Fade>
                     )}
                     </Popper>
              </List>
            </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{
        "& .MuiDrawer-paper" : {
          backgroundColor : "#F3F4F6"
        }
      }} >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{display : "block"}} >
            <ListItemButton sx={{minHeight : 48 , justifyContent : open ? "initial" : "center" }} >
              <ListItemIcon sx={{ minWidth :0, mr : open ? 3 : "auto", justifyContent :"center" }} ><GridViewIcon /></ListItemIcon>
              <ListItemText primary="DashBoard" sx={{ opacity : open ? "1" : "0" }} ></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={() => handleClick()} sx={{    
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  }} >
                <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }} >
                    <LibraryMusicIcon /></ListItemIcon>
                <ListItemText primary={"Song"} sx={{ opacity: open ? 1 : 0 }} ></ListItemText>
                {openSong ? <MdExpandLess /> : <MdExpandMore />}
              </ListItemButton>
              <Collapse in={openSong} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <Link  to={"/admin/song"} >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <AddBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Song" />
                      </ListItemButton>
                      </Link>
                      <Link to={"/admin/listsong"} >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="List Songs" />
                      </ListItemButton>
                      </Link>
                    </List>
              </Collapse>
          </ListItem>
          <ListItem disablePadding sx={{ display : "block" }} >
            <ListItemButton onClick={() => handleArtist()} sx={{ minHeight : 48, justifyContent : open ? "initial" : "center" }} >
              <ListItemIcon sx={{ minWidth : 0, mr : open ? 3 :"auto" }} ><PlaylistAddCircleIcon /></ListItemIcon>
              <ListItemText primary="Artist" sx={{ opacity : open ? 1 : 0 }} ></ListItemText>
              {openArtist ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>
            <Collapse in={openArtist} timeout={"auto"} unmountOnExit  >
            <List component={"div"} disablePadding  >
                <Link to={"/admin/add-artist"} >
                <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                        <GroupsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Add Artist" />
                    </ListItemButton>
                </Link>
                <Link to={"/admin/list-artist"} >
                <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon >
                          <GroupAddIcon/>
                        </ListItemIcon>
                        <ListItemText primary="List Artist" /> 
                    </ListItemButton>
                </Link>
            </List>
            </Collapse>
          </ListItem>
          <ListItem disablePadding sx={{ display : "block" }} >
            <ListItemButton onClick={() => handleUser()} sx={{ minHeight : 48, justifyContent : open ? "initial" : "center" }} >
              <ListItemIcon sx={{ minWidth : 0, mr : open ? 3 :"auto" }} ><SupervisedUserCircleIcon /></ListItemIcon>
              <ListItemText primary="Users" sx={{ opacity : open ? 1 : 0 }} ></ListItemText>
              {openArtist ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>
            <Collapse in={openUser} timeout={"auto"} unmountOnExit  >
            <List component={"div"} disablePadding  >
              <Link to={"/admin/listuser"}>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                <RecentActorsIcon />
                </ListItemIcon>
                <ListItemText primary="List User" />
              </ListItemButton>
              </Link>
            </List>
            </Collapse>
          </ListItem>
        </List>
        <Divider />
        <List>
        <ListItem disablePadding sx={{ display : "block" }} >
            <ListItemButton onClick={() => handleGenre()} sx={{ minHeight : 48, justifyContent : open ? "initial" : "center" }} >
              <ListItemIcon sx={{ minWidth : 0, mr : open ? 3 :"auto" }} ><LayersIcon /></ListItemIcon>
              <ListItemText primary="Genre" sx={{ opacity : open ? 1 : 0 }} ></ListItemText>
              {openArtist ? <MdExpandLess /> : <MdExpandMore />}
            </ListItemButton>
            <Collapse in={openGenre} timeout={"auto"} unmountOnExit  >
            <List component={"div"} disablePadding  >
              <Link to={"/admin/addgenre"} >
              <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                        <AddBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Genre" />
                    </ListItemButton>
              </Link>
              <Link to={"/admin/listgenre"} >
              <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                        <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="List Genre" />
                    </ListItemButton>
              </Link>
            </List>
            </Collapse>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={() => handleAlbum()} sx={{    
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  }} >
                <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }} >
                    <LibraryMusicIcon /></ListItemIcon>
                <ListItemText primary={"Album"} sx={{ opacity: open ? 1 : 0 }} ></ListItemText>
                {openAlbum ? <MdExpandLess /> : <MdExpandMore />}
              </ListItemButton>
              <Collapse in={openAlbum} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <Link  to={"/admin/add-album"} >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <AddBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Album" />
                      </ListItemButton>
                      </Link>
                      <Link to={"/admin/list-album"} >
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="List Album" />
                      </ListItemButton>
                      </Link>
                    </List>
              </Collapse>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}