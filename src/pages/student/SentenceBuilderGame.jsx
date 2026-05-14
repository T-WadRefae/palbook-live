import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiRotateCcw, FiRefreshCw } from 'react-icons/fi';
import { GameShell, useSavePoints } from '../../components/games/GameShell';
import { useSound } from '../../hooks/useSound';
import { shuffle } from '../../utils/helpers';
import { SAMPLE_SENTENCES } from '../../utils/constants';

const SentenceBuilderGame = () => {
  const { t } = useTranslation();
  const sound = useSound();
  const savePoints = useSavePoints();

  const [sentences, setSentences] = useState([]);
  const [current, setCurrent] = useState(0);
  const [available, setAvailable] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [done, setDone] = useState(false);

  const startGame = () => {
    const list = shuffle(SAMPLE_SENTENCES);
    setSentences(list);
    setCurrent(0);
    setScore(0);
    setDone(false);
    loadSentence(list[0]);
  };

  const loadSentence = (s) => {
    setAvailable(shuffle(s.words).map((w, i) => ({ id: i, word: w })));
    setChosen([]);
    setFeedback(null);
  };

  useEffect(() => {
    startGame();
  }, []);

  if (sentences.length === 0) return null;

  const sentence = sentences[current];
  const isLast = current === sentences.length - 1;

  const pickWord = (item) => {
    setAvailable((a) => a.filter((x) => x.id !== item.id));
    setChosen((c) => [...c, item]);
  };

  const removeWord = (item) => {
    setChosen((c) => c.filter((x) => x.id !== item.id));
    setAvailable((a) => [...a, item]);
  };

  const checkAnswer = () => {
    const built = chosen.map((c) => c.word).join(' ');
    const correct = sentence.words.join(' ');
    if (built === correct) {
      sound.playCorrect();
      setFeedback('correct');
      setScore((s) => s + 15);
    } else {
      sound.playWrong();
      setFeedback('wrong');
    }
  };

  const nextSentence = () => {
    if (isLast) {
      sound.playWin();
      setDone(true);
      savePoints(score);
    } else {
      const next = current + 1;
      setCurrent(next);
      loadSentence(sentences[next]);
    }
  };

  if (done) {
    return (
      <GameShell title={t('games.youWon')} emoji="📝" score={score} showConfetti>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="card text-center !p-10"
        >
          <div className="text-8xl mb-4 animate-bounce-slow">🌟</div>
          <h2 className="text-3xl font-extrabold gradient-text mb-2">Excellent work!</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            {t('games.totalScore')}: <span className="font-bold text-accent-500">{score}</span>
          </p>
          <button onClick={startGame} className="btn-primary">
            <FiRotateCcw /> {t('games.playAgain')}
          </button>
        </motion.div>
      </GameShell>
    );
  }

  return (
    <GameShell
      title={t('games.sentenceBuilder')}
      emoji="📝"
      score={score}
      total={sentences.length * 15}
    >
      <div className="card !p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="badge bg-primary-100 text-primary-700">
            {t('games.question')} {current + 1} {t('games.of')} {sentences.length}
          </span>
          <span className="text-xs text-slate-500 italic">💡 {sentence.hint}</span>
        </div>

        {/* Built sentence */}
        <div className="min-h-[80px] p-4 mb-4 rounded-2xl border-2 border-dashed border-primary-300 bg-primary-50/50 dark:bg-slate-800 flex flex-wrap gap-2 items-center">
          {chosen.length === 0 ? (
            <p className="text-slate-400 text-sm w-full text-center">
              Tap words below to build your sentence...
            </p>
          ) : (
            chosen.map((item) => (
              <motion.button
                key={item.id}
                layout
                onClick={() => removeWord(item)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold shadow-soft hover:scale-105 transition-transform"
              >
                {item.word}
              </motion.button>
            ))
          )}
        </div>

        {/* Available words */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {available.map((item) => (
            <motion.button
              key={item.id}
              layout
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => pickWord(item)}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200 hover:border-primary-400"
            >
              {item.word}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-4"
            >
              <p
                className={`text-lg font-bold ${
                  feedback === 'correct' ? 'text-secondary-600' : 'text-red-600'
                }`}
              >
                {feedback === 'correct' ? t('games.correct') : t('games.wrong')}
              </p>
              {feedback === 'wrong' && (
                <p className="text-xs text-slate-500 mt-1">
                  Correct: <em>{sentence.words.join(' ')}</em>
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2 justify-center">
          {feedback === null ? (
            <>
              <button
                onClick={() => loadSentence(sentence)}
                className="btn-outline !py-2"
              >
                <FiRefreshCw /> Reset
              </button>
              <button
                onClick={checkAnswer}
                disabled={available.length > 0}
                className="btn-primary"
              >
                {t('games.submit')}
              </button>
            </>
          ) : (
            <button onClick={nextSentence} className="btn-primary">
              {isLast ? '🏁 Finish' : t('games.next')} →
            </button>
          )}
        </div>
      </div>
    </GameShell>
  );
};

export default SentenceBuilderGame;
