import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { Skeleton } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Checkbox } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";

const Book = ({ card, getUserInfo }) => {
  const [isPhotoLoaded, setIsPhotoLoaded] = React.useState(false);

  const favoriteHandler = (book) => {
    const userId = localStorage.getItem("userId");
    const data = { userId, book };

    fetch("/book", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          getUserInfo();
        } else {
          return res.json().then((data) => data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Grid item key={uuidv4()} xs={6} sm={6} md={3}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <Checkbox
          defaultChecked
          sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite color="warning" />}
          onChange={() => favoriteHandler(card)}
        />
        <div style={{ position: "relative" }}>
          <Skeleton
            key={uuidv4()}
            sx={{
              width: "100%",
              height: "100%",
              aspectRatio: "1/1",
              display: `${!isPhotoLoaded ? "block" : "none"}`,
            }}
            animation="wave"
            variant="rectangular"
          />
          <img
            key={uuidv4()}
            style={{
              objectFit: "cover",
              width: "100%",
              aspectRatio: "1/1",
              display: `${isPhotoLoaded ? "block" : "none"}`,
            }}
            src={card.image}
            alt="photo"
            onLoad={() => setIsPhotoLoaded(true)}
          />
        </div>
        <div>
          <a href={card.bookUrl} target="_blank">
            <Typography noWrap sx={{ textAlign: "center", m: 1, p: 0 }}>
              {card.title || ""}
            </Typography>
          </a>
          <Typography noWrap sx={{ textAlign: "center", m: 1, p: 0 }}>
            {!card.author.length ? "⠀" : card.author}
          </Typography>
          <Typography noWrap sx={{ textAlign: "center", m: 1, p: 0 }}>
            {card.price} грн
          </Typography>
          <Typography noWrap sx={{ textAlign: "center", m: 1, p: 0 }}>
            {card.available}
          </Typography>
        </div>
      </Card>
    </Grid>
  );
};

export default Book;
