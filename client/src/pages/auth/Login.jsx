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

export default function Login() {
  return (
    <Box sx={style.container}>
      <Card variant="outlined" sx={style.card}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            Login
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
        </Box>
        <CardActions>
          <Button size="small">Login</Button>
          <Button size="small">Register</Button>
          <Button size="small">Forget password</Button>
        </CardActions>
      </Card>
    </Box>
  )
}
