import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SearchIcon from '@mui/icons-material/Search';
import SearchPage from "../pages/SearchPage";
import LanguageIcon from '@mui/icons-material/Language';
import SitesForm from "./SitesForm";
import SitesTable from "./SitesTable";


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const renderTabTitle = (Icon, title) => {
  return (
    <span>
      <Icon />
      <span style={{ verticalAlign: "super", marginLeft: "10px" }}>
        {title}
      </span>
    </span>
  );
};

const Navigation = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label={renderTabTitle(SearchIcon, 'Пошук')} {...a11yProps(0)} />
          <Tab label={renderTabTitle(MenuBookIcon, 'Читальня')} {...a11yProps(1)} />
          <Tab label={renderTabTitle(PersonIcon, 'Акаунт')} {...a11yProps(2)} />
          <Tab label={renderTabTitle(LanguageIcon, 'Список сайтів')} {...a11yProps(2)} />
          <Tab label={renderTabTitle(LanguageIcon, 'Форма сайтів')} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SearchPage />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SitesTable />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <SitesForm />
      </TabPanel>
    </Box>
  );
};

export default Navigation;
