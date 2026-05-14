import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiRotateCcw } from 'react-icons/fi';
import { GameShell, useSavePoints } from '../../components/games/GameShell';
import { useSound } from '../../hooks/useSound';
import { shuffle } from '../../utils/helpers';
import { SAMPLE_QUIZ_QUESTIONS } from '../../utils/constants';

const MultipleChoiceGame = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const sound = useSound();
  const savePoints = useSavePoints();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setQuestions(shuffle(SAMPLE_QUIZ_QUESTIONS));
  }, []);

  if (questions.length === 0) return null;

  const q = questions[current];
  const isLast = current === questions.length - 1;

  const handlePick = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correctIndex) {
      sound.playCorrect();
      setScore((s) => s + 10);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    if (isLast) {
      sound.playWin();
      setDone(true);
      savePoints(score + (selected === q.correctIndex ? 10 : 0));
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setQuestions(shuffle(SAMPLE_QUIZ_QUESTIONS));
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setDone(false);
  };

  if (done) {
    return (
      <GameShell
        title={t('games.youWon')}
        emoji="🏆"
        score={score}
        total={questions.length * 10}
        showConfetti
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card text-center !p-10"
        >
          <div className="text-8xl mb-4 animate-bounce-slow">🎉</div>
          <h2 className="text-3xl font-extrabold gradient-text mb-2">
            {t('games.youWon')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            {t('games.totalScore')}:{' '}
            <span className="font-bold text-accent-500 text-2xl">{score}</span>
          </p>
          <button onClick={handleRestart} className="btn-primary">
            <FiRotateCcw /> {t('games.playAgain')}
          </button>
        </motion.div>
      </GameShell>
    );
  }

  return (
    <GameShell
      title={t('games.multipleChoice')}
      emoji="🎯"
      score={score}
      total={questions.length * 10}
    >
      <div className="card !p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="badge bg-primary-100 text-primary-700">
            {t('games.question')} {current + 1} {t('games.of')} {questions.length}
          </span>
          <div className="h-2 flex-1 mx-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              {q.question}
            </h2>
            {q.questionAr && (
              <p className="text-base text-slate-500 dark:text-slate-400 mb-6" dir="rtl">
                {q.questionAr}
              </p>
            )}

            <div className="grid sm:grid-cols-2 gap-3">
              {q.options.map((opt, idx) => {
                const isCorrect = idx === q.correctIndex;
                const isSelected = idx === selected;
                let classes =
                  'p-4 rounded-2xl border-2 font-bold text-start transition-all hover:scale-[1.02]';
                if (selected === null) {
                  classes +=
                    ' bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary-400';
                } else if (isCorrect) {
                  classes +=
                    ' bg-secondary-100 dark:bg-secondary-900/30 border-secondary-500 text-secondary-700 dark:text-secondary-300';
                } else if (isSelected) {
                  classes +=
                    ' bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300';
                } else {
                  classes +=
                    ' bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-60';
                }
                return (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handlePick(idx)}
                    className={classes}
                    disabled={selected !== null}
                  >
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 me-2 text-sm">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {selected !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
                <p
                  className={`text-lg font-bold mb-3 ${
                    selected === q.correctIndex
                      ? 'text-secondary-600'
                      : 'text-red-600'
                  }`}
                >
                  {selected === q.correctIndex ? t('games.correct') : t('games.wrong')}
                </p>
                <button onClick={handleNext} className="btn-primary">
                  {isLast ? '🏁 Finish' : t('games.next')} →
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </GameShell>
  );
};

export default MultipleChoiceGame;
