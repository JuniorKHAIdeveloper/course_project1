import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Search = ({ query, setQuery, handleSubmit }) => {
  const onKeyPressHandler = (event) => {
    if (event.code.includes("Enter")) {
      handleSubmit(event.target.value);
    }
  };

  const handleSearch = (event) => {
    if (Boolean(query)) handleSubmit();
  };

  return (
    <Box sx={{ my: 2 }}>
      <Stack spacing={2} direction="row" sx={{ alignItems: "center" }}>
        <TextField
          inputProps={{ "data-testid": "search" }}
          label="Пошук"
          variant="outlined"
          fullWidth
          sx={{ m: 1 }}
          onChange={(event) => setQuery(event.target.value)}
          onKeyPress={onKeyPressHandler}
          type="search"
        />
        <Button
          data-testid="search-button"
          sx={{ height: "56px", verticalAlign: "super" }}
          variant="contained"
          onClick={handleSearch}
        >
          <SearchIcon style={{ marginLeft: "16px" }} />
          <span
            style={{
              verticalAlign: "super",
              marginLeft: "10px",
              marginRight: "16px",
            }}
          >
            Пошук
          </span>
        </Button>
      </Stack>
    </Box>
  );
};

export default Search;
