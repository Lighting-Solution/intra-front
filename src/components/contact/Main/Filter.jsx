import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Filter = ({ title, subTitle, empCount, onSearch }) => {
  const [searchField, setSearchField] = useState("all");
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    onSearch(searchField, searchText);
  };

  return (
    <Box
      sx={{
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            marginLeft: "8px",
            fontSize: "1em",
            color: "rgb(122, 121, 121)",
          }}
        >
          {subTitle} ({empCount})
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <FormControl variant="outlined" sx={{ marginRight: "8px" }}>
          <Select
            labelId="address-book-select-label"
            id="address-book-select"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            sx={{ height: "40px", fontSize: "1em" }}
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="name">이름</MenuItem>
            <MenuItem value="mp">전화번호</MenuItem>
            <MenuItem value="company">회사</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          size="small"
          placeholder="검색"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSearch}>
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
