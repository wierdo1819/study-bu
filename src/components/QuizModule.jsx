import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, RotateCcw, Award, Lightbulb, Check, ChevronRight } from 'lucide-react';
import { fireConfetti } from '../utils/confetti';

export default function QuizModule({ questions, onQuizCompleted }) {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // Filter questions based on selected subject
  const activeQuestions = React.useMemo(() => {
    if (selectedSubject === 'All') return questions;
    return questions.filter((q) => q.subject === selectedSubject);
  }, [questions, selectedSubject]);

  const currentQ = activeQuestions[currentIdx];

  const handleSelectOption = (index) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQ.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);
    setIsAnswerSubmitted(true);

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        question: currentQ.question,
        selected: selectedOption,
        correct: currentQ.correctAnswer,
        isCorrect,
        explanation: currentQ.explanation,
        options: currentQ.options
      }
    ]);
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < activeQuestions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
      if (score + (selectedOption === currentQ.correctAnswer ? 1 : 0) >= activeQuestions.length * 0.7) {
        fireConfetti();
      }
      if (onQuizCompleted) {
        onQuizCompleted({
          total: activeQuestions.length,
          score: score + (selectedOption === currentQ.correctAnswer ? 1 : 0),
          subject: selectedSubject
        });
      }
    }
  };

  const handleRestart = (newSubject = selectedSubject) => {
    setSelectedSubject(newSubject);
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setScore(0);
    setIsFinished(false);
    setShowReview(false);
  };

  const percentage = Math.round((score / activeQuestions.length) * 100) || 0;

  return (
    <section id="quiz" className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Module Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Interactive Self-Assessment</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Practice & Knowledge Check Engine
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-xl mx-auto">
          Test your understanding with instant feedback, pedagogical explanations, and step-by-step problem walkthroughs.
        </p>
      </div>

      {/* Subject Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {['All', 'Mathematics', 'Science', 'Digital Literacy', 'English'].map((subj) => (
          <button
            key={subj}
            onClick={() => handleRestart(subj)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedSubject === subj
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {subj === 'All' ? 'Mixed Curriculum' : subj}
          </button>
        ))}
      </div>

      {!isFinished ? (
        /* Quiz Card */
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden transition-all">
          {/* Header Bar */}
          <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                {currentQ.subject}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                • {currentQ.gradeLevel} Level
              </span>
            </div>

            <div className="text-xs font-medium text-slate-300">
              Question <span className="font-bold text-white">{currentIdx + 1}</span> of {activeQuestions.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-1.5">
            <div
              className="bg-indigo-600 h-1.5 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / activeQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Body */}
          <div className="p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 leading-snug">
              {currentQ.question}
            </h3>

            {/* MCQ Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctAnswer;

                let optionStyles = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-indigo-50/60 hover:border-indigo-200';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyles = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                  } else if (isSelected && !isCorrect) {
                    optionStyles = 'bg-rose-50 border-rose-500 text-rose-950 font-semibold ring-2 ring-rose-500/20';
                  } else {
                    optionStyles = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyles = 'bg-indigo-50 border-indigo-600 text-indigo-950 font-bold ring-2 ring-indigo-500/20';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between text-sm sm:text-base ${optionStyles}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold border ${
                        isSelected && !isAnswerSubmitted ? 'bg-indigo-600 text-white border-indigo-600' :
                        isAnswerSubmitted && isCorrect ? 'bg-emerald-600 text-white border-emerald-600' :
                        isAnswerSubmitted && isSelected && !isCorrect ? 'bg-rose-600 text-white border-rose-600' :
                        'bg-white text-slate-500 border-slate-200'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Card upon submit */}
            {isAnswerSubmitted && (
              <div className={`p-4 rounded-2xl mb-6 border animate-in fade-in duration-200 ${
                selectedOption === currentQ.correctAnswer
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50/80 border-amber-200 text-amber-900'
              }`}>
                <div className="flex items-start gap-2.5">
                  <Lightbulb className={`w-5 h-5 shrink-0 mt-0.5 ${
                    selectedOption === currentQ.correctAnswer ? 'text-emerald-600' : 'text-amber-600'
                  }`} />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-1">
                      {selectedOption === currentQ.correctAnswer ? 'Correct Answer!' : 'Key Learning Takeaway'}
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs font-semibold text-slate-400">
                Current Score: <span className="text-indigo-600 font-bold">{score}</span> / {activeQuestions.length}
              </div>

              {!isAnswerSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleSubmitAnswer}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all ${
                    selectedOption !== null
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:-translate-y-0.5'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Confirm Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5"
                >
                  <span>{currentIdx + 1 < activeQuestions.length ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Quiz Completed Result Card */
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            {selectedSubject === 'All' ? 'Mixed Curriculum' : selectedSubject} Assessment
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-2">
            {percentage >= 80 ? 'Outstanding Mastery! 🌟' : percentage >= 50 ? 'Great Job! Keep Learning! 📚' : 'Good Effort! Practice Makes Perfect 💪'}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 mb-8 max-w-md mx-auto">
            You scored <strong className="text-slate-900">{score} out of {activeQuestions.length}</strong> questions correctly ({percentage}%).
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mb-8 max-w-lg mx-auto">
            <div>
              <div className="text-2xl font-black text-indigo-600">{score}</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Correct</div>
            </div>
            <div>
              <div className="text-2xl font-black text-rose-500">{activeQuestions.length - score}</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase">Incorrect</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-600">+{score * 20}</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase">XP Earned</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleRestart()}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>

            <button
              onClick={() => setShowReview(!showReview)}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors border border-slate-200"
            >
              {showReview ? 'Hide Review' : 'Review Answers'}
            </button>
          </div>

          {/* Answers Review Section */}
          {showReview && (
            <div className="mt-8 pt-8 border-t border-slate-200 text-left space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                Detailed Review & Explanations:
              </h4>
              {userAnswers.map((ans, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm ${
                    ans.isCorrect
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-rose-50/50 border-rose-200'
                  }`}
                >
                  <div className="flex items-start gap-2 font-semibold text-slate-900 mb-2">
                    {ans.isCorrect ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                    <span>
                      {idx + 1}. {ans.question}
                    </span>
                  </div>
                  <div className="pl-6 space-y-1 text-xs text-slate-600">
                    <p>
                      Your answer: <strong className={ans.isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                        {ans.options[ans.selected]}
                      </strong>
                    </p>
                    {!ans.isCorrect && (
                      <p>
                        Correct answer: <strong className="text-emerald-700">{ans.options[ans.correct]}</strong>
                      </p>
                    )}
                    <p className="text-slate-500 italic mt-1 pt-1 border-t border-slate-200/60">
                      💡 {ans.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
