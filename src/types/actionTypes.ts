import { QuestionType } from "./QuestionType";

type renderQuestions = {
  type: "renderTasks";
  questions: QuestionType[];
};

type TaskActions = renderQuestions

export type { TaskActions };
