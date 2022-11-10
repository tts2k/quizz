import React from 'react'
import Question from '../Question/Question';
import { Grid } from '@mui/material'

const style = {
  container: {
  }
}

const questions = [
  {
    questionDetail: "question 1",
  },                     
  {                      
    questionDetail: "question 2",
  },                     
  {                      
    questionDetail: "question 3",
  },                     
  {                      
    questionDetail: "question 4",
  },                     
  {                      
    questionDetail: "question 5",
  }
]

export default function QuestionList() {
  return (
    <Grid
      container
      spacing={5}
      alignItems="center"
      justifyContent="center"
      sx={ style.container }
    >
      { questions.map(e => {
        return (
          <Grid item xs={5}>
            <Question question={ e } />
          </Grid>
        )
      })}
    </Grid>
  )
}
