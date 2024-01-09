// Importing necessary modules from Next.js and Material UI libraries

import {

    Container,
    Grid,
    Paper,
    Stack,
    TextField,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { nanoid } from "@reduxjs/toolkit";
import { AnswerResult } from "../../types/AnswerResult.type";
import DiffVewer from "../../components/DiffViewer";




// Defining the IndexPage component as default export
export default function ResultBox(props: AnswerResult) {
    const myClassStyles = {
        backgroundColor: 'red',
        color: 'white',
        fontSize: '16px',
    };

    // Returning the JSX elements to render on the page
    return (
        <>
            {props.is_loading ? <Container sx={{minHeight:"200px"}}>
                <h1>loading...</h1>
            </Container>
                : <Grid container spacing={1}  >
                    <Grid item xs={1} lg={1} sx={{}}>
                        Q1
                    </Grid>
                    <Grid item xs={11} lg={11}>
                        <h3>
                            {props.is_correct ? "✅ 正解" : "❌ 不正解"}
                        </h3>
                    </Grid>
                    {/* <Grid item xs={4} md={2} wrap="nowrap" >
                        文法スコア
                    </Grid>
                    <Grid item xs={8} md={4} >
                        {props.grammer_score}/100
                    </Grid>
                    <Grid item xs={4} md={2} >
                        自然さスコア
                    </Grid>
                    <Grid item xs={8} md={4}>
                        {props.natural_score}/100
                    </Grid> */}
                    <Grid item xs={12} sm={2}>
                        問題
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        {props.question}
                    </Grid>
                    <Grid item xs={12} sm={2} >
                        あなたの回答
                    </Grid>
                    <Grid item xs={122} sm={10}>
                        {props.user_answer}
                    </Grid>
                    <Grid item xs={12} sm={2} >
                        正答例
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        {props.proposal_answer}
                        {(props.user_answer) ?
                            <DiffVewer from={props.user_answer} to={props.proposal_answer} />
                            : <></>
                        }
                    </Grid>
                    <Grid item xs={12} sm={2} >
                        コメント
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        {props.comment_jpn}
                    </Grid>
                </Grid>


            }
        </>
    );
}
