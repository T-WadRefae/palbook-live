import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';
import PageTransition from '@components/common/PageTransition';
import ProductCard from '../components/ProductCard';
import Loader from '@components/common/Loader';
import EmptyState from '@components/common/EmptyState';
import { useAuth } from '@contexts/AuthContext';
import { getProducts, getMyEntitlements } from '../api';
import { GRADES } from '@utils/constants';

const ShopPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [owned, setOwned] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [grade, setGrade] = useState('');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const list = await getProducts();
      setProducts(list);
      setLoading(false);
    })();
  }, []);

  // Owned products get a badge and open straight into the library.
  useEffect(() => {
    if (!user) {
      setOwned(new Set());
      return;
    }
    (async () => {
      const entitlements = await getMyEntitlements(user.uid);
      setOwned(new Set(entitlements.map((e) => e.productId)));
    })();
  }, [user]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((p) => {
      if (grade && !(p.grades || []).map(Number).includes(Number(grade))) return false;
      if (!term) return true;
      return [p.title, p.titleAr, p.description, p.descriptionAr]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term));
    });
  }, [products, search, grade]);

  return (
    <PageTransition className="max-w-7xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="text-7xl mb-3 animate-float inline-block">🛍️</div>
        <h1 className="text-4xl md:text-5xl font-display font-extrabold gradient-text">
          {t('shop.title')}
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          {t('shop.subtitle')} • by T. Wad Refae
        </p>
      </motion.div>

      {/* Search + grade filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-3xl mx-auto">
        <div className="relative flex-1">
          <FiSearch className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-400" />
          <input
            type="text"
            placeholder={t('shop.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input ps-12"
          />
        </div>
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="input sm:w-48"
          aria-label={t('general.filterByGrade')}
        >
          <option value="">{t('common.all')}</option>
          {GRADES.map((g) => (
            <option key={g} value={g}>
              {t('palbook.grade')} {g}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <EmptyState
          emoji="🛍️"
          title={search || grade ? t('common.noResults') : t('shop.empty')}
          message={search || grade ? '' : t('shop.emptyHint')}
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              owned={owned.has(p.id)}
              onOpen={() => navigate(`/shop/${p.id}`)}
            />
          ))}
        </div>
      )}

      <p className="text-center text-xs text-slate-400 mt-10">
        {t('shop.manualNotice')}
      </p>
    </PageTransition>
  );
};

export default ShopPage;
