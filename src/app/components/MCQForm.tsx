// MCQForm.tsx
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { QuestionData } from '@/types/QuestionData'

interface MCQFormProps {
    onAddQuestion: (question: QuestionData) => void;
  }

  export default function MCQForm({ onAddQuestion }: MCQFormProps) {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])  // Four options
  const [correctAnswer, setCorrectAnswer] = useState('')

  // Handle option changes
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onAddQuestion({ question, options, correctAnswer })  // Pass question data to parent
    alert('Question added successfully!')
    setQuestion('')  // Reset form
    setOptions(['', '', '', ''])
    setCorrectAnswer('')
  }

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
        <RadioGroup value={correctAnswer} onValueChange={setCorrectAnswer} required>
          {options.map((_, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={`option-${index + 1}`} id={`correct-${index + 1}`} />
              <Label htmlFor={`correct-${index + 1}`}>Option {index + 1}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Submit Question Button */}
      <Button type="submit">Add Question</Button>
    </form>
  )
}
