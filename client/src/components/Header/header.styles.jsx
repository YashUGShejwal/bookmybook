import { styled, Box } from '@mui/material';
import palette from '../../theme/palette';

export const HeaderContainer = styled(Box)(() => ({
  width: '100vw',
  height: '60px',
  backgroundColor: palette.primary,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '5px 30px',
  justifyContent: 'space-between',
}));

export const FlexRow = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '30px',
  cursor: 'pointer',
}));

export const CustomSearchBar = styled('input')(({ theme }) => ({
  width: '50vw',
  outline: 'none',
  padding: '8px 20px',
  borderRadius: '5px',
  border: 'none',
  [theme.breakpoints.down('lg')]: {
    width: '40vw',
  },
  [theme.breakpoints.down('md')]: {
    width: '30vw',
  },
}));

export const HeaderMenu = styled(Box)(() => ({
  width: '200px',
  padding: '5px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}));

export const HeaderItem = styled(Box)(() => ({
  width: '100%',
  height: 'fit-content',
  padding: '8px',
  cursor: 'pointer',
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: palette.primary,
    borderRadius: '5px',
    color: '#fff',
  },
}));