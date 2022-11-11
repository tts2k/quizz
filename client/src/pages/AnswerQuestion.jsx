import { Box, Grid, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material'
import { styled } from '@mui/material/styles';
import React from 'react'

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 1000,
  color: theme.palette.text.primary,
  marginTop: 26
}));

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: 10
  }
}

const answers = [
  { answerDetail: "answer 1" },
  { answerDetail: "answer 2" },
  { answerDetail: "answer 3" },
  { answerDetail: "answer 4" },
  { answerDetail: "answer 5" },
  { answerDetail: "answer 6" },
]

function Answer({ answer }) {
  return (
    <ListItem style={ style.list } key={1} component="div">
      <ListItemButton>
        <ListItemText primary={ answer.answerDetail } />
      </ListItemButton>
    </ListItem>
  )
}

export default function AnswerQuestion({ questionId }) {
  return (
    <Box sx={ style.container }>
      <StyledPaper>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur risus vel bibendum cursus. Nunc at felis velit. Donec non volutpat urna. Vestibulum facilisis vulputate laoreet. Nullam venenatis lectus ut quam dictum pharetra ac sit amet augue. Mauris vel varius lorem, eu dictum felis. Proin non eros dapibus, dapibus metus et, semper lacus. In molestie sed velit vitae malesuada. Quisque convallis ornare lorem ac laoreet. Donec tempus libero non malesuada tempor.
      </StyledPaper>
      <StyledPaper>
        { answers.map(e => (
            <Answer answer={e} />
          ))
        }
      </StyledPaper>
    </Box>
  )
}
