import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Skeleton } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
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
        // loading status
        if (res.ok) {
          // added message
          getUserInfo();
        } else {
          return res.json().then((data) => console.log(data));
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
          {/* ore better us CardMedia? */}
          <img
            key={uuidv4()}
            // component="img"
            style={{
              objectFit: "cover",
              width: "100%",
              aspectRatio: "1/1",
              display: `${isPhotoLoaded ? "block" : "none"}`,
            }}
            // sx={{ objectFit: "cover", width: "100%", aspectRatio: "1/1" }}
            src={card.image}
            // image={card.miniature || card.photos[0]}
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
            {card.price} ₴
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
