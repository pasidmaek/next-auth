import { Button, TextField, Typography } from "@mui/material";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { Box } from "@mui/material";

export default function Login() {
  const initialValues = { username: "", password: "" };
  const [userLogin, setUserLogin] = useState(initialValues);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      username: userLogin.username,
      password: userLogin.password,
      redirect: true,
    });
  };

  return (
    <div>
      <Typography sx={{ fontSize: '32px', m: 1, textAlign: 'center', marginBottom: "1rem" }}>Sign in</Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="form-group">
            <TextField
              style={{ width: "100%", marginBottom: "1rem" }}
              label="Enter your username"
              variant="outlined"
              onChange={({ target }) =>
                setUserLogin({ ...userLogin, username: target.value })
              }
            />
          </div>

          <div className="form-group mt-3">
            <TextField
              style={{ width: "100%", marginBottom: "1rem" }}
              label="Enter your password"
              variant="outlined"
              type="password"
              onChange={({ target }) =>
                setUserLogin({ ...userLogin, password: target.value })
              }
            />
          </div>

          <div className="mt-3 mb-2" style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="primary" type="submit" size="small">
              Sign in
            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
}

export async function getServerSideProps(context: undefined) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {},
  };
}
