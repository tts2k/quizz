import React, { useEffect, useState } from 'react'
import Question from '../Question/Question';
import { Box, Grid, Pagination, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { getAllQuestions } from '../../features/question/questionAction';
import { showSnack, SnackTypes } from '../../features/snack/snackSlice';

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
  const dispatch = useDispatch();
  const { questions, count, error } = useSelector(state => state.question);
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    dispatch(getAllQuestions({ page, searchKeyword }));
  }, [page, searchKeyword])

  useEffect(() => {
    if (error) {
      dispatch(showSnack({
        type: SnackTypes.ERROR,
        message : error.response.data.message,
      }));
    }
  }, [error])

  const changePage = (e, value) => {
    setPage(value);
  }

  const searchQuestion = (e) => {
    setSearchKeyword(e.target.value);
  }

  return (
    <>
      <Box sx={style.searchContainer}>
        <SearchBar onChange={searchQuestion}/>
      </Box>
      <Grid
        container
        spacing={5}
        alignItems="center"
        justifyContent="center"
      >
        { questions.map(e => {
          return (
            <Grid item xs={5} key={e.id}>
              <Question question={e} />
            </Grid>
          )
        }) }
      </Grid>
      <Box sx={ style.pagination }>
          <Pagination count={Math.ceil(count / 10)} shape="rounded" onChange={changePage} />
      </Box>
    </>
  )
}
