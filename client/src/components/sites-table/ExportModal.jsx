import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import "./styles.css"
import { AppContext } from "../../App";

const ExportModal = () => {
  const {type, setType} = React.useContext(AppContext);

  const handleChange = (event, newAlignment) => {
    if (newAlignment === null) {

      return;
    }
    setType(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={type}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      className="export-modal"
    >
      <ToggleButton value="csv">CSV</ToggleButton>
      <ToggleButton value="xls">XLS</ToggleButton>
      <ToggleButton value="json">JSON</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ExportModal;
