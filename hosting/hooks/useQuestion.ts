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
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "../css/shake.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { AnswerResult } from "../types/AnswerResult.type";
import BlockIcon from "@mui/icons-material/Block";
import Pokemon from "../components/Pokemon";
import cuid from 'cuid';

const MicRecorder = require('mic-recorder-to-mp3')

import ResultBox from "../features/answer-result/ResultBox";
import Demo from "../components/Demo";
import { Question } from "../types/QuestionDto.type";

/**
 * クライアントサイドでの問題の情報を扱う
 * @returns 
 */
export default function useQuestion() {
  // 現在の質問
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [isQuestionLoading, setIsQuestionLoading] = useState<boolean>(false);

  // 新しい質問を取得する
  const getNewQuestion = async () => {
    setIsQuestionLoading(true);
    const result = await axios.get<Question>("/api/ai/question");
    setCurrentQuestion(result.data);
    setIsQuestionLoading(false);
    return result.data
  };

  // 現在の質問をstateから取得する
  const getCurrentQuestion = () => {
    return currentQuestion;
  };

  return { getNewQuestion, getCurrentQuestion, isQuestionLoading };
}



