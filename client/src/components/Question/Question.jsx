import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button
} from '@mui/material';
import config from '../../config/config';

export default function Question(props) {
  return (
    <Card sx={{ maxWidth: "700px" }}>
      <CardMedia
        component="img"
        height="140"
        image={config.baseUrl + '/public/' + props.question.image}
        alt="question"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Question #{props.question.id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { props.question.questionDetail }
        </Typography>
      </CardContent>
    </Card>
  )
}
