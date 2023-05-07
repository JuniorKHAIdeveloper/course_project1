import React from "react";
import Box from "@mui/material/Box";
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

function Item({item}) {
  return (
    <Paper elevation={3} sx={{height: "500px", width: "300px", marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>
      <p>Джерело: {item.source}</p>
      <img src={item.image} height={"200px"}/>
      <h2>{item.title}</h2>
      <p>{item.author}</p>
      <p>{item.price} {item.availabel}</p>
    </Paper>
  );
}

const Slider = ({results}) => {

  return (
    <Box sx={{my: 2}}>
      <Carousel navButtonsAlwaysVisible={true} height={520} swipe={false} autoPlay={false}>
        {results.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </Box>
  );
};

export default Slider;
