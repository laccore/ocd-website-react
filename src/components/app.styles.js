import { makeStyles } from '@material-ui/core/styles'

export const drawerWidth = 240

export const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    appHeader: {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      zIndex: '0',
      '&:after': {
        content: 'close-quote',
        position: 'absolute',
  
        zIndex: '1',
        top: '0', right: '0', bottom: '0', left: '0',
        background: 'rgb(255,255,255)',
        background: 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(0,0,0,1) 100%)'
      }
    },
    appHeaderTypo: {
      textShadow: '0 2px 2px rgba(0,0,0,0.5)',
      fontWeight: '500',
      position: 'relative',
      zIndex: '2',
      color: theme.palette.white.main
    },
    appBar: {
      backgroundColor: theme.palette.primary.dark,
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menubar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      backgroundColor: theme.palette.primary.contrast,
      ...theme.mixins.toolbar,
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(1),
      ...theme.mixins.toolbar,
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    toolbarMiddle: {
      display: 'flex',
      padding: theme.spacing(1),
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.mixins.toolbar,
    },
    link: {
      color: theme.palette.white.main,
      fontWeight: 600,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize*0.9,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      margin: `0 ${theme.spacing(1)}`,
      '&:hover, &:active' : {
        color: theme.palette.primary.contrastText,
        fontWeight: 700,
        textDecoration: 'none'
      }
    },
    buttonOutline: {
      backgroundColor: 'rgba(0,0,0,0.1)',
      color: theme.palette.primary.main,
      boxShadow: 'none',
      border: `1px solid ${theme.palette.primary.main}`,
      '&:hover, &:active': {
        color: theme.palette.primary.contrastText,
        boxShadow: theme.shadows[2],
      }
    },
    buttonOutlineActive: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main
    },
    iconButton: {
      color: theme.palette.white.main,
      '& > *:hover, & > *:active' : {
        color: theme.palette.primary.main,
      }
    },
    logo: {
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    fullLogo: {
      display: 'inline-block',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none'
    },
    menuActive: {
      color: theme.palette.primary.main
    },
    dropdownButton: {
      color: theme.palette.white.main,
    },
    dropdownMenu: {
      backgroundColor: theme.palette.black.main,
      color: theme.palette.white.main,
      '& > *:hover, & > *:active' : {
        color: `${theme.palette.primary.contrastText} !important`,
        backgroundColor: theme.palette.black.light,
        fontWeight: 500
      }
    },
    title: {
      flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(3),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
    fullHeight: {
      height: '100vmin',
    },
    bodyBox: {
      backgroundColor: theme.palette.background.default
    },
    pageBox: {
      boxShadow: theme.shadows[2],
      backgroundColor: theme.palette.white.dark
    }
  }))