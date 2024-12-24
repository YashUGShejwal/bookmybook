import {
  Typography,
  Box,
  Switch,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { MainPage } from '../../globals/styles';
import { Icon } from '@iconify/react';
import * as S from './adminDashboard.styles';
import palette from '../../theme/palette';
import { DataGrid } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import AddBookModal from '../../components/AddBookModal/AddBookModal.component';
import CountUp from 'react-countup';
import CSVModal from '../../components/CSVParser/CSVModal.component';
import useQuery from '../../hooks/useQuery';
import { Navigate, useNavigate } from 'react-router';
const AdminDashboard = () => {
  const router = useNavigate();
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [allRentals, setAllRentals] = useState([]);
  const { fetchData } = useQuery({
    url: '/order/getAllRentals',
    showSnack: false,
    onSuccess: (res) => {
      console.log(res);
      setAllRentals(res);
    },
  });
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'User Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'date', headerName: 'OrderDate', width: 250 },
    { field: 'isActive', headerName: 'isActive', width: 150 },
    {
      field: 'details',
      headerName: 'Details',
      width: 100,
      renderCell: (params) => {
        // console.log(params,"PARAMS")
        return (
          <IconButton
            onClick={() => {
              router(`/admin/orderSummary/${params.id}`);
            }}
          >
            <Icon icon="bx:link-external" />
          </IconButton>
        );
      },
    },
  ];

  const { breakpoints } = useTheme();

  const toggleAddBookModal = () => {
    setShowAddBookModal(!showAddBookModal);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(allRentals);
  const rows = allRentals?.data || [];

  return (
    <MainPage>
      <CSVModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
      <S.DashboardContainer>
        <Typography
          sx={{
            fontSize: '2em',
            letterSpacing: '2px',
            fontWeight: 600,
            [breakpoints.down('md')]: { fontSize: '1.5em' },
          }}
        >
          BookMyBook Admin Panel
        </Typography>
        <S.DashboardRow>
          <S.DashboardLeft>
            <S.StatsContainer>
              <S.StatCard>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Icon
                    icon="fluent:people-team-16-filled"
                    width="30px"
                    height="30px"
                    color={palette.primary}
                  />
                  <Icon
                    icon="entypo:circular-graph"
                    width="30px"
                    height="30px"
                  />
                </Box>
                <Typography sx={{ fontSize: '2em', fontWeight: 700 }}>
                  <CountUp end={allRentals?.rentLen} duration={1} />
                </Typography>
                <Typography sx={{ fontWeight: 600, color: palette.primary }}>
                  Books rented
                </Typography>
              </S.StatCard>

              <S.StatCard>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Icon
                    icon="fluent:tasks-app-28-filled"
                    width="30px"
                    height="30px"
                    color={palette.primary}
                  />
                  <Icon
                    icon="entypo:circular-graph"
                    width="30px"
                    height="30px"
                  />
                </Box>
                <Typography sx={{ fontSize: '2em', fontWeight: 700 }}>
                  <CountUp end={allRentals?.booksLen} duration={1} />
                </Typography>
                <Typography sx={{ fontWeight: 600, color: palette.primary }}>
                  Books available
                </Typography>
              </S.StatCard>
            </S.StatsContainer>
            <S.TableContainer>
              <Typography sx={{ fontSize: '1.2em', fontWeight: 700 }}>
                Quick Access
              </Typography>
              <S.InputsContainer></S.InputsContainer>
              <S.DataGridContainer>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  sx={{
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    boxShadow: palette.shadow,
                    padding: '15px',
                  }}
                  autoHeight
                />
              </S.DataGridContainer>
            </S.TableContainer>
          </S.DashboardLeft>
          <S.DashboardRight>
            <S.ActionBarContainer>
              <Typography sx={{ fontSize: '1.2em', fontWeight: 700 }}>
                Actions Bar
              </Typography>
              <S.ActionBarItem>
                <Icon
                  icon="wpf:add-user"
                  width="35px"
                  height="35px"
                  color={palette.primary}
                />
                <Box sx={{ width: '70%' }} onClick={toggleAddBookModal}>
                  <Typography sx={{ fontSize: '0.9em', fontWeight: 600 }}>
                    ADD A BOOK
                  </Typography>
                  <Typography
                    sx={{ fontSize: '0.65em', color: 'gray' }}
                    className="subtitle"
                  >
                    Add a single book to the library
                  </Typography>
                </Box>
              </S.ActionBarItem>

              <AddBookModal
                state={showAddBookModal}
                toggleModal={toggleAddBookModal}
              />
              <S.ActionBarItem onClick={(e) => handleOpen()}>
                <Icon
                  icon="fluent:people-team-16-filled"
                  width="35px"
                  height="35px"
                  color={palette.primary}
                />
                <Box sx={{ width: '70%' }}>
                  <Typography sx={{ fontSize: '0.9em', fontWeight: 600 }}>
                    EXCEL IMPORT
                  </Typography>
                  <Typography
                    sx={{ fontSize: '0.65em', color: 'gray' }}
                    className="subtitle"
                  >
                    Add books from excel sheet to the library
                  </Typography>
                </Box>
              </S.ActionBarItem>
            </S.ActionBarContainer>
          </S.DashboardRight>
        </S.DashboardRow>
      </S.DashboardContainer>
    </MainPage>
  );
};

export default AdminDashboard;
