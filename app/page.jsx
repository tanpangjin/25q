/**
 * v0 by Vercel.
 * @see https://v0.dev/t/o4Y4TUtRHIv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(4500)
  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  useEffect(() => {
    const generatedQuestions = Array.from({ length: 25 }, () => {
      const a = Math.floor(Math.random() * 100)
      const b = Math.floor(Math.random() * 100)
      const operator = ["+", "-", "*", "/"][Math.floor(Math.random() * 4)]
      const question = `${a} ${operator} ${b}`
      const solution = eval(question)
      return { question, solution }
    })
    setQuestions(generatedQuestions)
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  const handleSubmit = () => {
    const currentQuestionData = questions[currentQuestion]
    const isCorrect = parseFloat(answer) === currentQuestionData.solution
    setIsSubmitted(true)
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1)
    }
    setTimeout(() => {
      setIsSubmitted(false)
      setAnswer("")
      setCurrentQuestion((prevQuestion) => prevQuestion + 1)
    }, 2000)
  }
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-card-foreground">Math Practice</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="text-muted-foreground">Question {currentQuestion + 1} / 25</div>
          <div className="text-muted-foreground">Time Remaining: {formatTime(timeRemaining)}</div>
        </div>
        <div className="mb-4">
          <p className="text-card-foreground text-lg font-medium">{questions[currentQuestion]?.question}</p>
          <Input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="mt-2 w-full"
            placeholder="Enter your answer"
          />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Submit
        </Button>
        {isSubmitted && (
          <div
            className={`mt-4 p-2 rounded-md ${
              parseFloat(answer) === questions[currentQuestion]?.solution
                ? "bg-green-500 text-green-50"
                : "bg-red-500 text-red-50"
            }`}
          >
            {parseFloat(answer) === questions[currentQuestion]?.solution ? "Correct!" : "Incorrect. Try again."}
          </div>
        )}
        {currentQuestion === 24 && (
          <div className="mt-4 text-card-foreground">
            <p>Time's up!</p>
            <p>Your final score: {score} / 25</p>
          </div>
        )}
      </div>
    </div>
  )
}