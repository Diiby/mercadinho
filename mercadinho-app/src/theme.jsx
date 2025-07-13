import { createTheme } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';


const theme = createTheme({
  palette: {
    
    primary: {
      main: green[700], 
    },
    
    secondary: {
      main: orange[500],
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

export default theme;