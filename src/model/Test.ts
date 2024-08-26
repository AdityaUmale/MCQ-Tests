// models/Test.ts

import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
});

const TestSchema = new mongoose.Schema({
  testName: String,
  questions: [QuestionSchema],
  isPublished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Test || mongoose.model('Test', TestSchema);