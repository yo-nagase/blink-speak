import { Box, Button, TextField } from "@mui/material";
import Head from "next/head";
require('colors');
const Diff = require('diff');

/**
 * 差分を表示するコンポーネント
 * @param props 
 * @param isSkipRemovedText trueの場合は削除されたテキストを表示しない
 * @returns 
 */
export default function DiffVewer(props: { from: string, to: string, isSkipRemovedText?: boolean }) {

    const diff = Diff.diffChars(props.from, props.to)

    let output = []
    diff.forEach((part) => {
        // green for additions, red for deletions
        // grey for common parts
        const fontStyle = part.added ? { color: 'green', backgroundColor: '#bdf6bdc7' } :
            part.removed ? { color: 'red', textDecoration: 'line-through', backgroundColor: '#ffdada' } : { color: 'black' }
        if (props.isSkipRemovedText==true && part.removed) {
            return
        }
        output.push(<span style={fontStyle}>{part.value}</span>)
    });

    return (
        <Box sx={{fontWeight:700}}>
            {output}
        </Box>
    );
}