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
import { useEffect, useRef, useState } from "react";

const MicRecorder = require('mic-recorder-to-mp3')

import { Question, QuestionRequest } from "../types/Question.type";

/**
 * クライアントサイドでの問題の情報を扱う
 * @returns 
 */
export default function useQuestion() {
  // 現在の質問
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [isQuestionLoading, setIsQuestionLoading] = useState<boolean>(false);

  /**
   * 新しい質問をAPIから取得する
   * @param params 
   * @returns 
   */
  const getNewQuestion = async (params: QuestionRequest): Promise<Question> => {
    setIsQuestionLoading(true);
    console.log("🈲", params)
    const result = await axios.get<Question>("/api/ai/question", { params: { level: params.level, category: JSON.stringify(params.category) } });
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



