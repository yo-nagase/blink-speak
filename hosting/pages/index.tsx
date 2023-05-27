// Importing necessary modules from Next.js and Material UI libraries
import Link from "next/link";
import Head from "next/head";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Icon,
  Paper,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { AnswerResult } from "../types/AnswerResult.type";
import BlockIcon from "@mui/icons-material/Block";
// Defining the IndexPage component as default export
export default function IndexPage() {
  const router = useRouter();
  const [questionNum, setQuestionNum] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [result, setResult] = useState<AnswerResult[]>([]);

  // 問題はDBから取得できる様にあらかじめ用意しておく。
  const questionList = [
    { id: nanoid, contents: "これはあなたのペンですか？" },
    { id: nanoid, contents: "私は東京に住んでいます。" },
    { id: nanoid, contents: "今日目覚ましを8時にセットしました" },
    { id: nanoid, contents: "私は、名古屋出身です" },
    { id: nanoid, contents: "今日は朝ごはんを食べましたか？" },
    { id: nanoid, contents: "今日見た映画は、とても感動的でした。" },
    { id: nanoid, contents: "もし私がカエルだったら草を食べていたでしょう" },
    { id: nanoid, contents: "海外に行ったことはありますか？" },
    { id: nanoid, contents: "どんな食べ物が好きですか？" },
    { id: nanoid, contents: "沖縄は日本のどのあたりにありますか？" },
    { id: nanoid, contents: "東京にはたくさんの外国人が訪れています。" },
    { id: nanoid, contents: "私はこの前のテストで１００点を取りました。" },
  ];

  useEffect(() => {
    setQuestionNum(Math.floor(Math.random() * (questionList.length - 1)));
  }, []);

  /**
   * 回答ボタンを押したときの処理
   */
  const handleClick = async () => {
    console.log("Click happened");
    try {
      setIsloading(true);

      const response = axios
        .get(
          `/api/ai/chat?question=${questionList[questionNum].contents}&answer=${answer}`
        )
        .then((response) => {
          const data = response.data;
          console.log("🈲", data.message);
          //console.log("⭐️", JSON.parse(data.message.text));
          setResult([...result, JSON.parse(data.message.text)]);
        });
      //解答欄を空白にする
      setAnswer("");
      // 問題更新
      setQuestionNum(Math.floor(Math.random() * (questionList.length - 1)));
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  };

  // Returning the JSX elements to render on the page
  return (
    <>
      <Head>
        <title>😄BlinkSpeak😃</title>
      </Head>

      <ResponsiveAppBar />
      <Paper sx={{ padding: "20px" }}>
        <Grid>
          <Grid item xs={12} sm={6}>
            <Container maxWidth="md">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Chip color="default" size="small" label="level1" />{" "}
                  <Chip color="default" size="small" label="missed > 10" />
                </Grid>
                <Grid item xs={12} sm={12}>
                  {questionList[questionNum].contents}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    sx={{ maxWidth: "md" }}
                    id="outlined-basic"
                    size="small"
                    onChange={(e) => setAnswer(e.target.value)}
                    //label="Outlined"
                    variant="outlined"
                    value={answer}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Enterキーでの自動送信を防ぐ
                        handleClick(); // Enterキーが押されたときに呼び出す関数
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button variant="contained" onClick={handleClick} startIcon>
                    回答する
                  </Button>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={handleClick}
                    startIcon={<BlockIcon />}
                  >
                    声（未実装）
                  </Button>
                </Grid>
              </Grid>

              <Box sx={{ padding: "4px" }}>
                {/* <pre>{JSON.stringify(result, null, " ")}</pre> */}
                {[...result].reverse().map((item, index) => {
                  return (
                    <>
                      <pre>{JSON.stringify(item, null, " ")}</pre>
                    </>
                  );
                })}

                <hr />
                <br />
                <Link href="/about">About</Link>
                <br />
                <Link href="/day">Day</Link>
                <hr />
                <Link href="redux-sample">redux-sample</Link>
              </Box>
            </Container>
          </Grid>
          <Grid item xs={2} sm={1}>
            hhhhhh
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
