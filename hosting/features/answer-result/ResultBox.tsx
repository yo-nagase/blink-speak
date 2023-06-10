// Importing necessary modules from Next.js and Material UI libraries

import {

    Grid,
    Paper,
    Stack,
    TextField,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { nanoid } from "@reduxjs/toolkit";


// Defining the IndexPage component as default export
export default function ResultBox() {



    // Returning the JSX elements to render on the page
    return (
        <>

            <Grid container spacing={1}  >
                <Grid item xs={1} lg={1} sx={{}}>
                    Q1
                </Grid>
                <Grid item xs={11} lg={11}>
                    <h4>✅ 正解</h4>
                </Grid>
                <Grid item xs={4} md={2} wrap="nowrap" >
                    文法スコア
                </Grid>
                <Grid item xs={8} md={4} >
                    80/100
                </Grid>
                <Grid item xs={4} md={2} >
                    自然さスコア
                </Grid>
                <Grid item xs={8} md={4}>
                    23/100
                </Grid>
                <Grid item xs={2} >
                    問題
                </Grid>
                <Grid item xs={10}>
                    私は東京に住んでいます
                </Grid>
                <Grid item xs={2} >
                    正答例
                </Grid>
                <Grid item xs={10}>
                    I live in Tokyo.<br />
                    I live in Tokyo.
                </Grid>
                <Grid item xs={2} >
                    コメント
                </Grid>
                <Grid item xs={10}>
                    素晴らしい！正解です！！！
                </Grid>
            </Grid>

         

        </>
    );
}
