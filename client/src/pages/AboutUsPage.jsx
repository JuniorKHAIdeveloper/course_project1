import { Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import messages from "../helpers/messages";

const AboutUs = ({ isXsScreen }) => {
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
        return isXsScreen ? (
          <div key={uuidv4()}>
            <h4 style={{ textAlign: "justify" }}>{message}</h4>
          </div>
        ) : (
          <div key={uuidv4()}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: "justify" }}>
              {message}
            </Typography>
            <br />
          </div>
        );
      })}
      {Boolean(sites.length) && (
        <>
          <h3 style={{ textAlign: "center" }}>
            Сайти, які використовуються для пошуку:
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ marginLeft: "auto", marginRight: "auto" }}>
              <thead>
                <tr>
                  <th>Назва сайту</th>
                  <th>Посилання</th>
                  <th>Логотип</th>
                </tr>
              </thead>
              <tbody>
                {sites.map((site, index) => (
                  <tr key={index}>
                    <td>{site.siteName}</td>
                    <td>
                      <a href={site.siteUrl} target="_blank">
                        {site.siteUrl}
                      </a>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <img src={site.siteLogoUrl} style={{ height: "50px" }} />
                    </td>
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
