import { Button, TextField } from "@mui/material";
import Head from "next/head";
require('colors');
const Diff = require('diff');

export default function DiffVewer(props: { from: string, to: string }) {


    const diff = Diff.diffChars(props.from, props.to)


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
            {output}
        </div>
    );
}