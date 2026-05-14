import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiRotateCcw } from 'react-icons/fi';
import { GameShell, useSavePoints } from '../../components/games/GameShell';
import { useSound } from '../../hooks/useSound';
import { shuffle } from '../../utils/helpers';
import { SAMPLE_MATCHING_PAIRS } from '../../utils/constants';

const MatchingGame = () => {
  const { t } = useTranslation();
  const sound = useSound();
  const savePoints = useSavePoints();

  const [pairs, setPairs] = useState([]);
  const [leftCol, setLeftCol] = useState([]);
  const [rightCol, setRightCol] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const startGame = () => {
    const subset = shuffle(SAMPLE_MATCHING_PAIRS).slice(0, 5);
    setPairs(subset);
    setLeftCol(subset.map((p, i) => ({ id: i, text: p.en })));
    setRightCol(shuffle(subset.map((p, i) => ({ id: i, text: p.ar }))));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatched([]);
    setScore(0);
    setDone(false);
  };

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      if (selectedLeft === selectedRight) {
        sound.playCorrect();
        setMatched((m) => [...m, selectedLeft]);
        setScore((s) => s + 20);
      } else {
        sound.playWrong();
      }
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 600);
    }
  }, [selectedLeft, selectedRight]);

  useEffect(() => {
    if (pairs.length > 0 && matched.length === pairs.length) {
      sound.playWin();
      setDone(true);
      savePoints(score);
    }
  }, [matched, pairs]);

  const isMatched = (id) => matched.includes(id);

  if (done) {
    return (
      <GameShell title={t('games.youWon')} emoji="🧩" score={score} showConfetti>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="card text-center !p-10"
        >
          <div className="text-8xl mb-4 animate-bounce-slow">🎊</div>
          <h2 className="text-3xl font-extrabold gradient-text mb-2">All matched!</h2>
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

  const renderCard = (item, isLeft) => {
    const matched = isMatched(item.id);
    const selected = isLeft ? selectedLeft === item.id : selectedRight === item.id;

    return (
      <motion.button
        key={`${isLeft ? 'l' : 'r'}-${item.id}`}
        whileHover={!matched ? { scale: 1.04 } : {}}
        whileTap={!matched ? { scale: 0.96 } : {}}
        onClick={() => {
          if (matched) return;
          if (isLeft) setSelectedLeft(item.id);
          else setSelectedRight(item.id);
        }}
        disabled={matched}
        className={`p-4 rounded-2xl font-bold text-lg transition-all ${
          matched
            ? 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 border-2 border-secondary-500 opacity-60'
            : selected
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-kid scale-105'
            : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-primary-400'
        }`}
      >
        {matched ? `✓ ${item.text}` : item.text}
      </motion.button>
    );
  };

  return (
    <GameShell title={t('games.matching')} emoji="🧩" score={score}>
      <div className="card !p-6">
        <p className="text-center text-sm text-slate-500 mb-6">
          Match each English word with its Arabic meaning
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="text-center font-bold text-primary-600 mb-2">English 🇬🇧</h3>
            {leftCol.map((item) => renderCard(item, true))}
          </div>
          <div className="space-y-3">
            <h3 className="text-center font-bold text-secondary-600 mb-2">العربية 🇵🇸</h3>
            {rightCol.map((item) => renderCard(item, false))}
          </div>
        </div>
      </div>
    </GameShell>
  );
};

export default MatchingGame;
