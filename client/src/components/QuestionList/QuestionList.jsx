import React from 'react'
import Question from '../Question/Question';
import { Box, Grid, Pagination, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const style = {
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
    marginBottom: "30px",
  },
  searchContainer: {
    margin: "50px"
  }
}

const questions = [
  { questionDetail: "question 1", },                     
  { questionDetail: "question 2", },                     
  { questionDetail: "question 3", },                     
  { questionDetail: "question 4", },                     
  { questionDetail: "question 5", },
  { questionDetail: "question 6", }
]

function SearchBar({ onChange }) {
  return (
    <TextField
      sx={ style.search }
      placeholder="Search"
      type="search"
      variant="outlined"
      fullWidth
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default function QuestionList() {
  return (
    <>
      <Box sx={style.searchContainer}>
        <SearchBar />
      </Box>
      <Grid
        container
        spacing={5}
        alignItems="center"
        justifyContent="center"
      >
        { questions.map(e => {
          return (
            <Grid item xs={5}>
              <Question question={ e } />
            </Grid>
          )
        }) }
      </Grid>
      <Box sx={ style.pagination }>
          <Pagination count={10} shape="rounded" />
      </Box>
    </>
  )
}
