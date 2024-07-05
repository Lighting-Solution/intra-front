import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Filter = () => {
  return (
    <Box
      sx={{
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography
          variant='h6'
          sx={{
            marginLeft: '8px',
            fontSize: '1em',
            color: 'rgb(122, 121, 121)',
          }}
        >
          {subTitle}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControl variant='outlined' sx={{ marginRight: '8px' }}>
          <Select
            labelId='address-book-select-label'
            id='address-book-select'
            defaultValue='전체'
            sx={{ height: '40px', fontSize: '1em' }}
          >
            <MenuItem value='전체'>전체</MenuItem>
            <MenuItem value='이름'>이름</MenuItem>
            <MenuItem value='회사'>회사</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant='outlined'
          size='small'
          placeholder='검색'
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default Filter;
