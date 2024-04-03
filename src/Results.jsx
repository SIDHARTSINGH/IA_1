import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import SearchBox from "./SearchBox";

const Results = ({ search }) => {
  const [resultList, setResultList] = useState(null);

  useEffect(() => {
    axios
      .post("https://api.gyanibooks.com/search_publication/", {
        keyword: search,
        limit: 10,
      })
      .then((res) => {
        console.log(res.data);
        setResultList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <SearchBox />
      {resultList &&
        resultList.map((result) => (
          <ResultCard key={result.paperId} result={result} />
        ))}
    </>
  );
};

const ResultCard = ({ title, abstract, url }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
        </Box>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default Results;
