import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

export const filterLaborsByType = (labors) => {
  return labors.reduce((arr, labor) => {
    const { type } = labor;
    if (arr[type]) {
      arr[type].push(labor);
    } else {
      arr[type] = [labor];
    }
    return arr;
  }, {});
};


export const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}