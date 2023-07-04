import { getSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import Box from '@mui/material/Box';
import { Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
import Typography from '@mui/material/Stack';

export default function Home({ userData }: any) {
  return (
    // <div>
    //   Hi <span>{userData.username}</span>
    // </div>
    <Box display="flex" justifyContent="center">
      <Card sx={{ minWidth: 345 , minHeight: 300, marginTop:'3rem'}}>
        <CardContent>
        <Typography variant="h1" gutterBottom style={{fontSize:'40px'}}>
            Hi! {userData.username}
          </Typography>
        </CardContent>

      </Card>
    </Box>
  );
}

export async function getServerSideProps(context: undefined) {
  const session = await getSession(context);
  let userData: any;
  if (session) {
    console.log("[Homepage] -> haved session");
    console.log("[Homepage] session -> ", session);
    console.log("[Homepage] session type -> ", typeof session);
    const username = jwt.verify(
      session.userid,
      "57918603f1c43835c880bce87fb2e050b22edafa4319e2732b20a1322e545647"
    );

    const response = await fetch(
      `http://127.0.0.1:3080/users/find/${username}`
    );

    userData = await response.json();
  } else {
    console.log("[Homepage] -> no session");
  }

  return {
    props: { userData },
  };
}
