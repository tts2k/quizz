import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button
} from '@mui/material';

export default function Question(props) {
  return (
    <Card sx={{ maxWidth: "700px" }}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/to/be/added.jpg"
        alt="question"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Question
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { props.question.questionDetail }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Choose</Button>
      </CardActions>
    </Card>
  )
}
