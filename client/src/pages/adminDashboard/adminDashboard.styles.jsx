import { styled, Box } from '@mui/material';
import palette from '../../theme/palette';

// export const DashboardContainer = styled(Box)(() => ({
//   width: '100%',
//   height: '80%',
//   display: 'flex',

// }));
export const DashboardContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

export const DashboardRow = styled(Box)(({ theme }) => ({
  width: '100%',
  flex: 1,
  marginTop: '20px',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
    gap: '30px',
  },
}));

export const DashboardLeft = styled(Box)(({ theme }) => ({
  height: '100%',
  flex: 3,
  [theme.breakpoints.down('lg')]: {
    flex: 2,
  },
}));

export const DashboardRight = styled(Box)(() => ({
  height: '100%',
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
}));

export const StatsContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  gap: '50px',
}));

export const TableContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '30px',
}));

export const StatCard = styled(Box)(({ theme }) => ({
  width: '275px',
  height: 'fit-content',
  padding: '15px',
  borderRadius: '30px',
  // boxShadow: "24px 24px 48px #e7e9e9,-24px -24px 48px #ffffff",
  boxShadow: '0px 8px 20px rgba(35, 35, 35, 0.1)',
  // boxShadow:"-10px -10px 15px #ffffff,8px 8px 25px #97a7c3"
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  },
  [theme.breakpoints.down('md')]: {
    flex: 1,
  },
}));

export const DataGridContainer = styled(Box)(() => ({
  width: '100%',
  height: '500px',
  marginTop: '20px',
}));

export const InputsContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  marginTop: '20px',
}));

export const SearchInput = styled('input')(({ theme }) => ({
  width: '54%',
  outline: 'none',
  padding: '8px 20px',
  borderRadius: '5px',
  border: 'none',
  [theme.breakpoints.down('lg')]: {
    width: '60%',
  },
  [theme.breakpoints.down('md')]: {
    width: '70%',
  },
}));

export const ActionBarContainer = styled(Box)(({ theme }) => ({
  width: '80%',
  height: '60%',
  backgroundColor: '#fff',
  borderRadius: '20px',
  boxShadow: palette.shadow,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'fit-content',
  },
}));

export const ActionBarItem = styled(Box)(() => ({
  width: '100%',
  height: 'fit-content',
  padding: '15px',
  borderRadius: '10px',
  border: `3px solid ${palette.primary}`,
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.1s ease-in-out',
  '&:hover': {
    backgroundColor: palette.primary,
    color: '#fff',
    '& path': {
      fill: '#fff',
    },
    '& .subtitle': {
      color: '#fff',
    },
  },
}));
