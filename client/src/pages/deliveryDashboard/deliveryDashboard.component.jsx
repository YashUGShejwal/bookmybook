import {
  Typography,
  Box,
  Switch,
  Button,
  IconButton,
  useTheme,
} from '@mui/material';
import CustomButton from '../../components/CustomButton/CustomButton.component';
import { Icon } from '@iconify/react';
import CountUp from 'react-countup';
import palette from '../../theme/palette';
import { DataGrid } from '@mui/x-data-grid';
import useQuery from '../../hooks/useQuery';
import * as S from '../adminDashboard/adminDashboard.styles';
import React,{ useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { borderRadius } from '@mui/system';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import {useSnackbar} from 'notistack'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DeliveryDashboard = () => {
  const [pageData, setPageData] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { enqueueSnackbar } = useSnackbar()

  const { fetchData } = useQuery({
    url: '/order/deliveryData',
    showSnack: false,
    onSuccess: (res) => {
      console.log(res);
      setPageData(res);
    },
  });
  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'User Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'date', headerName: 'OrderDate', width: 250 },
    { field: 'isDelivered', headerName: 'Delievered?', width: 150 },
    {
      field: 'details',
      headerName: 'Details',
      width: 100,
      renderCell: (params) => {
        return (
          <IconButton onClick={() => {}}>
            <Icon icon="bx:link-external" />
          </IconButton>
        );
      },
    },
  ];

  const rows = pageData?.ordersYetToBeDelivered || [];
  console.log(pageData);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >

<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <div style={{
    margin: 'auto',
    width: '400px',
  }}>

  
  </div>
</Modal>

        <Box></Box>
        <CustomButton onClick={handleOpen} >
          Scan QR Code

          <Box sx={{ marginLeft: '0.8rem' }}>
            <Icon icon="bi:qr-code-scan" width="28" height="28" />
          </Box>
        </CustomButton>
      </Box>

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
              icon="fluent:tasks-app-28-filled"
              width="30px"
              height="30px"
              color={palette.primary}
            />
            <Icon icon="entypo:circular-graph" width="30px" height="30px" />
          </Box>
          <Typography sx={{ fontSize: '2em', fontWeight: 700 }}>
            <CountUp end={pageData?.ordersDelivered?.length} duration={1} />
          </Typography>
          <Typography sx={{ fontWeight: 600, color: palette.primary }}>
            Orders delivered
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
            <Icon icon="entypo:circular-graph" width="30px" height="30px" />
          </Box>
          <Typography sx={{ fontSize: '2em', fontWeight: 700 }}>
            <CountUp
              end={pageData?.ordersYetToBeDelivered?.length}
              duration={1}
            />
          </Typography>
          <Typography sx={{ fontWeight: 600, color: palette.primary }}>
            Orders yet to be delivered
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
              width: '80%',
            }}
            autoHeight
          />
        </S.DataGridContainer>
      </S.TableContainer>
    </Box>
  );
};
export default DeliveryDashboard;
