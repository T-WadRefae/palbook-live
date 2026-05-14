import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiRotateCcw, FiVolume2 } from 'react-icons/fi';
import { GameShell, useSavePoints } from '../../components/games/GameShell';
import { useSound } from '../../hooks/useSound';
import { shuffle } from '../../utils/helpers';
import { SAMPLE_PRONUNCIATION } from '../../utils/constants';

const PronunciationGame = () => {
  const { t } = useTranslation();
  const sound = useSound();
  const savePoints = useSavePoints();

  const [items, setItems] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setItems(shuffle(SAMPLE_PRONUNCIATION));
  }, []);

  if (items.length === 0) return null;

  const item = items[current];
  const isLast = current === items.length - 1;

  const speak = (word) => {
    try {
      const utter = new SpeechSynthesisUtterance(word);
      utter.lang = 'en-US';
      utter.rate = 0.9;
      utter.pitch = 1.1;
      window.speechSynthesis.speak(utter);
    } catch (err) {
      console.error('Speech synthesis not available', err);
    }
  };

  const handlePick = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === item.correct) {
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
      savePoints(score + (selected === item.correct ? 10 : 0));
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setItems(shuffle(SAMPLE_PRONUNCIATION));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  };

  if (done) {
    return (
      <GameShell title={t('games.youWon')} emoji="🗣️" score={score} showConfetti>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="card text-center !p-10"
        >
          <div className="text-8xl mb-4 animate-bounce-slow">🎤</div>
          <h2 className="text-3xl font-extrabold gradient-text mb-2">Great listening!</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            {t('games.totalScore')}: <span className="font-bold text-accent-500">{score}</span>
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
      title={t('games.pronunciation')}
      emoji="🗣️"
      score={score}
      total={items.length * 10}
    >
      <div className="card !p-8 text-center">
        <span className="badge bg-primary-100 text-primary-700 mb-4">
          {t('games.question')} {current + 1} {t('games.of')} {items.length}
        </span>

        <p className="text-slate-600 dark:text-slate-300 mb-6">
          🎧 Listen and choose the correct word
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => speak(item.word)}
          className="mx-auto w-32 h-32 rounded-full bg-gradient-pal text-white flex items-center justify-center shadow-kid mb-8 group"
        >
          <FiVolume2 size={48} className="group-hover:scale-110 transition-transform" />
        </motion.button>

        <div className="grid grid-cols-2 gap-3">
          {item.options.map((opt, idx) => {
            const isCorrect = idx === item.correct;
            const isSelected = idx === selected;
            let classes =
              'p-4 rounded-2xl border-2 font-bold text-lg transition-all hover:scale-[1.02]';
            if (selected === null) {
              classes +=
                ' bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary-400';
            } else if (isCorrect) {
              classes +=
                ' bg-secondary-100 dark:bg-secondary-900/30 border-secondary-500 text-secondary-700';
            } else if (isSelected) {
              classes += ' bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700';
            } else {
              classes +=
                ' bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-60';
            }
            return (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.97 }}
                onClick={() => handlePick(idx)}
                disabled={selected !== null}
                className={classes}
              >
                {opt}
              </motion.button>
            );
          })}
        </div>

        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <p
              className={`text-lg font-bold mb-3 ${
                selected === item.correct ? 'text-secondary-600' : 'text-red-600'
              }`}
            >
              {selected === item.correct ? t('games.correct') : t('games.wrong')}
            </p>
            <button onClick={handleNext} className="btn-primary">
              {isLast ? '🏁 Finish' : t('games.next')} →
            </button>
          </motion.div>
        )}
      </div>
    </GameShell>
  );
};

export default PronunciationGame;
