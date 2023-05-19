import { Typography } from "@mui/material";
import React from "react";
import messages from "../helpers/messages";
import { v4 as uuidv4 } from "uuid";

const AboutUs = () => {
  const [sites, setSites] = React.useState([]);

  const fetchSites = async () => {
    const response = await fetch("/info");
    const data = await response.json();

    setSites(data);
  };

  React.useEffect(() => {
    fetchSites();
  }, []);

  return (
    <div>
      {messages.aboutUs.map((message, index) => {
        return (
          <div key={uuidv4()}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ textAlign: "justify" }}
            >
              {message}
            </Typography>
            <br />
          </div>
        );
      })}
      {Boolean(sites.length) && (<>
      <h3 style={{textAlign: "center"}}>Сайти, які використовуються для пошуку:</h3>
      <div style={{overflowX: "auto"}}>
        <table style={{marginLeft: "auto", marginRight: "auto"}}>
          <thead>
            <tr>
              <th>Назва сайту</th>
              <th>Логотип</th>
              <th>Посилання</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site, index) => (
              <tr key={index}>
                <td>{site.siteName}</td>
                <td><a href={site.siteUrl} target="_blank">{site.siteUrl}</a></td>
                <td><img src={site.siteLogoUrl} style={{height: "50px"}}/></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </>
      )}
    </div>
  );
};

export default AboutUs;
