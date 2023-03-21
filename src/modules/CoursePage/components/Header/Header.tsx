import { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, Button, makeStyles, Box } from '@material-ui/core';
import SearchBar from '../SearchBar/SearchBar';
import user from '../../assets/user.svg';
import plus from '../../assets/plus.svg';



function Header() {
  const classes = useStyles();
  const [userName, setUserName] = useState<string>('Бексултан Маратов');

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <SearchBar />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button className={classes.button} variant="contained">
              <img src={plus} alt="plus" style={{ marginRight: '13px' }} />
              Добавить сотрудника
            </Button>
            <Box className={classes.userBox}>
              <Avatar alt={userName} src={user} />
              <Typography className={classes.userName} component="h2" variant="subtitle1">
                {userName}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '24px 0',
    '& .MuiPaper-elevation4': {
      boxShadow: 'none',
    },
  },
  toolbar: {
    backgroundColor: '#F1F1F1',
    color: '#252525',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#756FB3',
    borderRadius: '16px',
    marginRight: '16px',
    padding: '17px 18px',
    textTransform: 'none',
    fontSize: '16px',
    color: '#fff',
  },
  userBox: {
    display: 'flex',
    alingItems: 'center',
    background: 'white',
    padding: ' 12px 19px',
    borderRadius: '16px',
    marginRight: '40px',

  },
  userName: {
    paddingTop: '5px',
    fontSize: '18px',
    marginLeft: '10px',
  },
}));