import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiDownload, FiEye } from 'react-icons/fi';
import PageTransition from '../../components/common/PageTransition';
import { WORKSHEET_TOPICS } from '../../data/worksheets';

const WorksheetsPage = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <PageTransition className="max-w-5xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="text-7xl mb-3 animate-wiggle inline-block">📝</div>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold gradient-text">
          {t('worksheets.title')}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          {t('worksheets.subtitle')} • by T. Wad Refae
        </p>
      </motion.div>

      <div className="space-y-12">
        {WORKSHEET_TOPICS.map((topic) => (
          <section key={topic.id}>
            <h2 className="flex items-center gap-2.5 text-2xl font-display font-extrabold text-secondary-800 dark:text-secondary-300 mb-5">
              <span className="text-3xl">{topic.emoji}</span>
              {isAr ? topic.titleAr : topic.titleEn}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {topic.levels.map((lv, i) => (
                <motion.div
                  key={lv.level}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col rounded-3xl p-5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-soft hover:shadow-kid transition-shadow"
                >
                  <div
                    className={`${topic.grad} inline-flex items-center justify-center self-start px-3.5 h-9 rounded-xl text-white text-sm font-extrabold shadow-kid mb-3`}
                  >
                    {t('worksheets.level')} {lv.level}
                  </div>
                  <p className="flex-1 text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {isAr ? lv.ar : lv.en}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={lv.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl g-olive text-white text-sm font-bold py-2.5 shadow-kid hover:opacity-95 transition-opacity"
                    >
                      <FiDownload /> {t('worksheets.openPdf')}
                    </a>
                    <a
                      href={lv.html}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold py-2.5 px-3.5 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                    >
                      <FiEye /> {t('worksheets.view')}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageTransition>
  );
};

export default WorksheetsPage;
