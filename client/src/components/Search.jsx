import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Search = ({setQuery, handleSubmit}) => {
  return (
    <Box sx={{my: 2}}>
      <Typography variant="h5" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Typography>

      <Stack spacing={2} direction="row" sx={{alignItems: "center"}}>
        <TextField
          id="outlined-basic"
          label="Пошук"
          variant="outlined"
          fullWidth
          sx={{ m: 1 }}
          onChange={(event) => setQuery(event.target.value)}
        />
        {/* <FormControlLabel
          control={
            <Switch defaultChecked name="chat-gpt" />
          }
          label="AI"
        /> */}
        <Button sx={{height: "56px", verticalAlign: "super"}} variant="contained" onClick={handleSubmit}>
          <SearchIcon style={{marginLeft: "16px"}} />
          <span style={{ verticalAlign: "super", marginLeft: "10px", marginRight: "16px" }}>
            Пошук
          </span>
        </Button>
      </Stack>
    </Box>
  );
};

export default Search;
