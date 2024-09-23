import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  gridContainer: {
    padding: '20px', // Outer padding for the entire grid
    height: '100vh',
    display: 'flex', 
  },
  formContainer: {
    padding: theme.spacing(2),
    backgroundColor: 'transparent',
    borderRadius: '8px',
  },
  itineraryContainer: {
    padding: theme.spacing(2),
    backgroundColor: 'transparent',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  outerWrapper: {
    padding: theme.spacing(3),
  },
}));
