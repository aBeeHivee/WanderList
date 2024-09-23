import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  gridContainer: {
    padding: '20px',
  },
  formContainer: {
    padding: theme.spacing(2),
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: theme.shadows[2],
    height: '100%',
  },
  itineraryWrapper: {
    backgroundColor: '#ffffff',
    height: '100%',
    padding: theme.spacing(3),
    borderRadius: '8px',
    boxShadow: theme.shadows[3],
  },
  itineraryList: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100vh - 200px)', 
    overflowY: 'auto', 
  },
  listItem: {
    marginBottom: theme.spacing(1),
    cursor: 'pointer',
    padding: theme.spacing(1),
    borderRadius: '4px',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#BDC3CB',
    },
  },
  expandedCard: {
    margin: theme.spacing(1, 0),
    backgroundColor: '#ffff',
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2),
    transition: 'max-height 0.5s ease', 
    overflow: 'auto', 
  },
  noItinerary: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    height: '100%',
    textAlign: 'center',
  },
  header: {
    marginBottom: theme.spacing(2),
  },
}));
