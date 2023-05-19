import React from "react";
import ResultsTable from "../components/search/ResultsTable";
import Search from "../components/search/Search";
import SearchLoader from "../components/search/SearchLoader";
import Typography from "@mui/material/Typography";
import messages from "../helpers/messages";
import Loader from "../core/Loader";

const SearchPage = ({ results, setResults, isAuth, isXsScreen = "false" }) => {
  const [query, setQuery] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);

  const handleSubmit = () => {
    // setResults([]);
    setIsSearching(true);
    fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: query }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResults(data.results);
        setIsSearching(false);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {!Boolean(results?.length) && (
        <>
          {messages.search.map((message) => {
            return (
              <>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ textAlign: "justify" }}
                >
                  {message}
                </Typography>
                <br />
              </>
            );
          })}
        </>
      )}
      <Search query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
      {isSearching && <Loader />}
      {Boolean(results?.length) && (
        <ResultsTable
          isXsScreen={isXsScreen}
          results={results}
          isAuth={isAuth}
        />
      )}
    </>
  );
};

export default SearchPage;
