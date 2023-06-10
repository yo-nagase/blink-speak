import { Button, TextField } from "@mui/material";
import Head from "next/head";
import DiffVewer from "../../components/DiffViewer";
require('colors');
const Diff = require('diff');

export default function DayPage() {



  const one = 'This is your pen';
  const other = 'This are your Pencil';


  const diff = Diff.diffChars(one, other)
  // display = document.getElementById('display'),
  // fragment = document.createDocumentFragment();


  let output = []
  diff.forEach((part) => {
    // green for additions, red for deletions
    // grey for common parts
    const fontStyle = part.added ? { color: 'green', backgroundColor: '#bdf6bdc7' } :
      part.removed ? { color: 'red', textDecoration: 'line-through', backgroundColor: '#ffdada' } : { color: 'grey' }

    output.push(<span style={fontStyle}>{part.value}</span>)

  });

  return (
    <div>
      <Head>
        <title>Day</title>
      </Head>

      <DiffVewer from={one} to={other} />

      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />


    </div>
  );
}
