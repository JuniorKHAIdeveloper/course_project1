import React from "react";
import ResultsTable from "../components/ResultsTable";
import Search from "../components/Search";
import SearchLoader from "../components/SearchLoader";
import Slider from "../components/Slider";

const SearchPage = () => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);

  const handleSubmit = async (event) => {
    setIsSearching(true);
    try {
      const response = await fetch("/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({search: query}),
      });
      const data = await response.json();
      setResults(data.results);
      setIsSearching(false);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Search setQuery={setQuery} handleSubmit={handleSubmit}/>
      {isSearching && <SearchLoader/>}
      {/* {Boolean(results.length) && <Slider results={results}/>} */}
      {Boolean(results.length) && <ResultsTable results={results}/>}
    </>
  );
};

export default SearchPage;
