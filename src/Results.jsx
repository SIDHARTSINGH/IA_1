import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  IconButton,
  Card,
  CardContent,
  Typography,
  Stack,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchBox from "./SearchBox";
import { data } from "./data";

const Results = () => {
  const location = useLocation();
  const { state } = location;
  const { search, isAcademic } = state || {};
  const [resultList, setResultList] = useState(null);

  useEffect(() => {
    // axios
    //   .post("https://api.gyanibooks.com/search_publication/", {
    //     keyword: search,
    //     limit: 10,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     setResultList(res.data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    const resultList = data.filter((article) => article.title.includes(search));
    resultList.splice(10);
    setResultList(resultList);
  }, [search]);

  return (
    <Stack spacing={3}>
      <SearchBox />
      {resultList &&
        resultList.map((result) => (
          <ResultCard key={result.paperId} result={result} isAcademic />
        ))}
    </Stack>
  );
};

const ResultCard = ({ result, isAcademic }) => {
  const { title, url, authors, abstract } = result;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {url.length > 31 ? url.substring(0, 31) : url}
          </Typography>
          <Box>
            <Button
              variant="text"
              sx={{ textTransform: "none" }}
              startIcon={<BookmarkIcon />}
            >
              Bookmark
            </Button>
            <IconButton sx={{ p: "0px" }}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="h5" component="div">
          {title.split(" ").slice(0, 5).join(" ")}
        </Typography>
        <Typography
          sx={{ mb: 1.5, fontSize: 14, fontStyle: "italic" }}
          color="text.secondary"
        >
          {authors
            .slice(0, 5)
            .map((author) => author.name)
            .join(" • ")}
        </Typography>
        <Typography variant="body2">
          {abstract
            ? "..., " + abstract.split(" ").slice(10, 30).join(" ") + " ..."
            : "We present in this work a new calculation of the standard-model benchmark value for the effective number of neutrinos,..."}
        </Typography>
        {isAcademic ? <AcademicFooter /> : <NonAcademicFooter />}
      </CardContent>
    </Card>
  );
};

const AcademicFooter = () => {
  return (
    <Box mt={2} display={"flex"} justifyContent={"space-between"}>
      <Box>
        <Button size="medium" sx={{ textTransform: "none" }}>
          Cited by {""}
        </Button>
        <Button size="medium" sx={{ textTransform: "none" }}>
          View all versions
        </Button>
      </Box>
      <Box display={"flex"} gap={1}>
        <Button
          variant="outlined"
          size="medium"
          sx={{
            borderRadius: "20px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Cite
        </Button>
        <Button
          variant="contained"
          size="medium"
          sx={{
            borderRadius: "20px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Explore
        </Button>
      </Box>
    </Box>
  );
};

const NonAcademicFooter = () => {
  return (
    <Box display={"flex"} justifyContent={"flex-end"}>
      <Button
        size="medium"
        variant="contained"
        sx={{ borderRadius: "20px", textTransform: "none", fontWeight: "bold" }}
      >
        Get Content
      </Button>
    </Box>
  );
};

export default Results;
