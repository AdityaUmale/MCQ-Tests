import mongoose from 'mongoose';


const TestResultSchema = new mongoose.Schema({
  testName: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: String,
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  answers: [{
    question: mongoose.Schema.Types.ObjectId,
    selectedAnswer: Number
  }],
  score: Number,
  percentage: Number
});

export default mongoose.models.TestResult || mongoose.model('TestResult', TestResultSchema);