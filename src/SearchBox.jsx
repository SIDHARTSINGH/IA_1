import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Switch,
  TextField,
  InputAdornment,
  FormControlLabel,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useDebounce } from "./hooks/useDebounce";
import { data } from "./data";

const SearchBox = () => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search);
  const [isAcademic, setIsAcademic] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // if (debouncedSearch !== "")
    // axios
    //   .post("https://api.gyanibooks.com/search_publication/", {
    //     keyword: debouncedSearch,
    //     limit: 5,
    //   })
    //   .then((res) => {
    //     console.log("App -> useEffect ", res.data);
    //     const resSuggestions = res.data?.map((obj) => obj.title);
    //     setSuggestions([...resSuggestions]);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    if (search === "") {
      setSuggestions([]);
    } else {
      const resSuggestions = data.filter((article) =>
        article.title.includes(debouncedSearch)
      );
      resSuggestions.splice(5);
      setSuggestions(resSuggestions);
      setShowSuggestions(true);
    }
  }, [search, debouncedSearch]);

  const handleSwitchChange = () => {
    setIsAcademic((prev) => !prev);
  };

  const handleSearch = (searchParam) => {
    if (search !== "") {
      console.log(`${isAcademic ? "Academic" : "Web"}` + " Search", search);

      // axios
      //   .post("https://api.gyanibooks.com/search_publication/", {
      //     keyword: search,
      //     limit: 10,
      //   })
      //   .then((res) => {
      //     console.log("App -> useEffect ", res.data);
      //     const resSuggestions = res.data?.map((obj) => obj.title);
      //     setSuggestions([...resSuggestions]);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });

      console.log("App -> useEffect ", res.data);
      const resSuggestions = data.filter((article) =>
        article.title.includes(debouncedSearch)
      );
      setSuggestions([...resSuggestions]);

      navigate("/results", { state: { search: search, isAcademic } });
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    console.log("hsc");
    // <Navigate to={"/results"} state={suggestion} />;
    navigate("/results", { state: { search: suggestion, isAcademic } });
  };

  return (
    <Box
      onBlur={() => {
        console.log("blur");
        setShowSuggestions(false);
      }}
    >
      <TextField
        placeholder="Search"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={(e) => e.stopPropagation()} // blur event of text field doesn't propogate to the Box : suggestion list doesn't disappear onClick any suggestion
        InputProps={{
          style: {
            borderRadius:
              showSuggestions && suggestions.length > 0
                ? "40px 40px 0 0"
                : "40px",
          },
          startAdornment: <SearchIcon sx={{ mr: 1 }} />,
          endAdornment: (
            <InputAdornment position="end">
              <FormControlLabel
                style={{ marginRight: 2 }}
                value="start"
                control={
                  <Switch
                    checked={isAcademic}
                    onChange={handleSwitchChange}
                    size="medium"
                  />
                }
                label="Academics"
                labelPlacement="start"
              />
              <ArrowCircleRightIcon
                fontSize="large"
                color="primary"
                onClick={(e) => handleSearch(e)}
                sx={{ cursor: "pointer" }}
              />
            </InputAdornment>
          ),
        }}
        fullWidth
      />
      {showSuggestions && suggestions.length !== 0 && search.length !== 0 && (
        <List
          sx={{
            width: "100%",
            border: 2,
            borderTop: 0,
            borderColor: "primary.main",
            borderRadius: "0 0 40px 40px",
            boxSizing: "border-box",
          }}
        >
          {suggestions?.map((article) => (
            <ListItemButton
              alignItems="flex-start"
              key={article.paperId}
              onClick={() => {
                setShowSuggestions(false);
                handleSuggestionClick(article.title);
              }}
            >
              <ListItemText
                primary={
                  article.title.length > 20
                    ? article.title.substring(0, 20) + "..."
                    : article.title
                }
              />
            </ListItemButton>
            // <Divider variant="inset" component="li" />
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchBox;
