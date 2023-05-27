import { Button, TextField } from "@mui/material";
import Head from "next/head";

export default function DayPage() {
  return (
    <div>
      <Head>
        <title>Day</title>
      </Head>
      Hello Day
      <Button> sss</Button>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />
    </div>
  );
}
