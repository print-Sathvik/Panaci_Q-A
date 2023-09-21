import { useEffect, useState } from "react";
import { QuestionType } from "../types/QuestionType";
import { useQueryParams } from "raviger";
import { getQuestions } from "../utils/apiUtils";

const fetchQuestions = () => {
  return [
    { id: 1, question: "Do you have diabetes?", disease: "diabetes" },
    { id: 2, question: "Do you have obesity?", disease: "obesity" },
    { id: 3, question: "Are you having a heart stroke?", disease: "stroke" },
  ];
};

export default function Questions() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const [qparams, setQparams] = useQueryParams();

  useEffect(() => {
    setQuestions(fetchQuestions());
    if (qparams.diseases) {
      const filter = qparams.diseases.split("+");
      setQuestions(getQuestions(filter));
      console.log(filter);
    }
  }, [qparams.diseases]);

  const handleQuestionSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDiseases(
      selectedDiseases.includes(event.target.value)
        ? selectedDiseases.filter((disease) => disease !== event.target.value)
        : [...selectedDiseases, event.target.value]
    );
  };

  const applyFilters = () => {
    if (selectedDiseases.length > 0)
      setQparams({ diseases: selectedDiseases.join("+") });
  };

  return (
    <div>
      {qparams.diseases ? (
        <div>
          {questions.map((question: QuestionType) => (
            <div
              key={question.id}
              className="group bg-white rounded p-1 mx-2 my-4 border-black border-[1px]"
            >
              <h3 className="text-base font-bold flex-1">
                {question.question}
              </h3>
              <p className="text-sm">{question.disease}</p>
              <p>{question.answer}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {questions.map((question: QuestionType) => (
            <div className="rounded p-1 mx-2 my-4 flex" key={question.id}>
              <input
                type="checkbox"
                name="diseases"
                id={`${question.id}`}
                value={question.disease}
                checked={selectedDiseases.includes(question.disease)}
                className="mr-4 h-4 w-4 my-auto ml-2"
                onChange={(e) => handleQuestionSelect(e)}
              />
              <label
                htmlFor={`${question.id}`}
                className="text-xl flex-1 cursor-pointer"
              >
                {question.question}
              </label>
            </div>
          ))}
          <button
            onClick={applyFilters}
            className="px-4 py-2 ml-20 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
