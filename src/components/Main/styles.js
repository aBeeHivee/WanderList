import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    minWidth: 275,
    backgroundColor: theme.palette.background.paper,
    height: '100%',
  },
  divider: {
    margin: '20px 0',
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));
