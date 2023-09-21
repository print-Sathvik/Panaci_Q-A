import { QuestionType } from "../types/QuestionType";

const API_BASE_URL = "https://reactforall.onrender.com/api/";

type RequestType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const request = async (
  endpoint: string,
  method: RequestType = "GET",
  data: any = {}
) => {
  let url;
  let payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key as keyof typeof data]}`)
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  const token = localStorage.getItem("token");
  const auth = token ? "Token " + token : "";

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: method !== "GET" ? payload : null,
  });
  if (response.ok) {
    if (method === "DELETE") return {};
    const jsonResponse = await response.json();
    return jsonResponse;
  } else {
    const errorJson = await response.json();
    throw Error(errorJson);
  }
};

export const getQuestions = (filter: string[]) => {
  // return request("boards/", "GET", filter);
  const allQuestions: QuestionType[] = [
    {id:1, question: "Db Q1", answer: "you can treat db q1", disease: "diabetes"},
    {id:2, question: "Db Q2", answer: "you can treat db q2", disease: "diabetes"},
    {id:3, question: "ob Q1", answer: "you can treat ob q1", disease: "obesity"},
    {id:4, question: "I am having a heart attack. What should I do?", answer: "you will die! Byeee!!", disease: "stroke"},
    {id:5, question: "Will I survivean heart attack?", answer: "Good bye. Miss you", disease: "stroke"},
  ]
  return allQuestions.filter((question) => filter.includes(question.disease ?? ""))
};