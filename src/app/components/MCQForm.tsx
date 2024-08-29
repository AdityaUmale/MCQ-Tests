import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionData } from "@/types/QuestionData";

interface MCQFormProps {
  onAddQuestion: (question: QuestionData) => void;
}

export default function MCQForm({ onAddQuestion }: MCQFormProps) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]); // Four options
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [radioValue, setRadioValue] = useState<string>('');

  // Handle option changes
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (correctAnswer !== null){
      onAddQuestion({ question, options, correctAnswer }); // Pass question data to parent
      alert("Question added successfully!");
      setQuestion(""); // Reset form
      setOptions(["", "", "", ""]);
      setCorrectAnswer(null);
      setRadioValue(''); // Reset radio group
    } else {
      alert('Please select a correct answer')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Question Input */}
      <div className="mb-4">
        <Label htmlFor="question">Question</Label>
        <Input
          id="question"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>
      {/* Option Inputs */}
      {options.map((option, index) => (
        <div key={index} className="mb-4">
          <Label htmlFor={`option-${index + 1}`}>Option {index + 1}</Label>
          <Input
            id={`option-${index + 1}`}
            placeholder={`Enter option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
          />
        </div>
      ))}
      {/* Correct Answer Selection */}
      <div className="mb-4">
        <Label>Correct Answer</Label>
        <RadioGroup
          value={radioValue}
          onValueChange={(value) => {
            setRadioValue(value);
            setCorrectAnswer(parseInt(value));
          }}
          required
        >
          {options.map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem
                value={index.toString()}
                id={`correct-${index}`}
              />
              <Label htmlFor={`correct-${index}`}>Option {index + 1}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      {/* Submit Question Button */}
      <Button type="submit">Add Question</Button>
    </form>
  );
}