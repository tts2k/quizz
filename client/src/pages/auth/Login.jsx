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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from '../../validations/formValidaton';
import { useSnackbar, SnackTypes } from '../../context/SnackBarContext';

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
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const snack = useSnackbar();

  const onSubmit = ({ username, password }, e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
  };
  
  return (
    <Box sx={style.container}>
      <Card variant="outlined" sx={style.card}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            Login
          </Typography>
        </CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={style.form}>
            <TextField 
              sx={style.input}
              error={!!errors.username}
              label="Username"
              {...register("username", {
                required: "Required",
              })}
              helperText={errors.username ? errors.username.message : ''}
            />
            <TextField 
              sx={style.input}
              error={!!errors.password}
              label="Password"
              type="password"
              {...register("password", {
                required: "Required",
              })}
              helperText={errors.password ? errors.password.message : ''}
            />
          </Box>
          <CardActions>
            <Button type="submit" size="small">Login</Button>
            <Button size="small">Register</Button>
            <Button size="small">Forget password</Button>
          </CardActions>
        </form>
      </Card>
    </Box>
  )
}
