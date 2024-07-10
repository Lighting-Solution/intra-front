import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인 페이지가 로드될 때마다 localStorage 초기화
    localStorage.removeItem("authToken");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const apiUrl = "http://localhost:8000/login";
    const postData = { username, password };

    axios
      .post(apiUrl, postData)
      .then((response) => {
        localStorage.setItem("authToken", response.data.token);
        console.log(response.data.token);
        navigate("/starter");
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Invalid credentials");
      });
  };

  return (
    <Sheet
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        py: 3,
        px: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
    >
      <CssBaseline />
      <Typography level="h4" component="h1">
        <b>Welcome!</b>
      </Typography>
      <Typography level="body2">Sign in to continue.</Typography>
      <form onSubmit={handleLogin}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" sx={{ mt: 1 /* margin top */ }}>
          Login
        </Button>
      </form>
      <Typography
        endDecorator={<Link href="#">Sign up</Link>}
        fontSize="sm"
        sx={{ alignSelf: "center" }}
      >
        Don&apos;t have an account?
      </Typography>
    </Sheet>
  );
};

export default Login;
