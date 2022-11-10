import React from 'react';
import { 
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  TextField
} from '@mui/material';

const style = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: "500px",
    padding: "13px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "13px"
  },
  input: {
    marginTop: "13px"
  }
}

export default function Register() {
  return (
    <Box sx={style.container}>
      <Card variant="outlined" sx={style.card}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            Register
          </Typography>
        </CardContent>
        <Box sx={style.form}>
          <TextField 
            sx={style.input}
            required
            id="outlined-required"
            label="Username"
          />
          <TextField 
            sx={style.input}
            required
            id="outlined-required"
            label="Password"
            type="password"
          />
          <TextField 
            sx={style.input}
            required
            id="outlined-required"
            label="Confirm password"
            type="password"
          />
          <TextField 
            sx={style.input}
            required
            id="outlined-required"
            label="Email"
          />
        </Box>
        <CardActions>
          <Button size="small">Register</Button>
        </CardActions>
      </Card>
    </Box>
  )
}
