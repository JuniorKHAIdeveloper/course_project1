import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Book from "./Book";

const UserBooks = (props) => {
  const { results: cards = [], getUserInfo } = props;

  const [showCards, setShowCards] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [cardsPerPage, setCardsPerPage] = React.useState(8);

  const pages = Math.ceil(cards?.length / cardsPerPage);

  const calcCurrentCards = (page) => {
    const indexOfLastCard = page * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards?.slice(indexOfFirstCard, indexOfLastCard);

    return currentCards;
  };

  React.useEffect(() => {
    setShowCards(calcCurrentCards(currentPage));
  }, [cards]);

  const handleChange = (e, value) => {
    setCurrentPage(value);
    setShowCards(calcCurrentCards(value));
  };

  return (
    <>
    {!showCards.length && <p>Немає збережених книг.</p>}
      {!!showCards.length && (<Grid container spacing={2}>
        {showCards.map((card, i) => (
          <Book
            key={uuidv4()}
            card={card}
            getUserInfo={getUserInfo}
            {...props}
          />
        ))}
      </Grid>
       )}
      {!!showCards.length && (<Stack spacing={2} sx={{ pt: 2 }}>
        <p>
          {!!(currentPage - 1) ? (currentPage - 1) * cardsPerPage + 1 : 1} -{" "}
          {currentPage * cardsPerPage > cards.length
            ? cards.length
            : currentPage * cardsPerPage}{" "}
          із {cards.length}
        </p>
      </Stack>
      )}
      {!!showCards.length && (
        <Stack spacing={2} sx={{ py: 2 }}>
          <Pagination
            page={currentPage}
            count={pages}
            onChange={handleChange}
            color="primary"
          />
        </Stack>
      )}
    </>
  );
};

export default UserBooks;
