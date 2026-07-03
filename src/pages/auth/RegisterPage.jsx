import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiUserPlus } from 'react-icons/fi';
import { registerUser } from '../../firebase/auth';
import { ROLES } from '../../utils/constants';

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ROLES.STUDENT,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error(t('auth.passwordsDontMatch'));
      return;
    }
    if (form.password.length < 6) {
      toast.error(t('auth.minPassword'));
      return;
    }
    setLoading(true);
    try {
      await registerUser({
        email: form.email,
        password: form.password,
        displayName: form.displayName,
        role: form.role,
      });
      toast.success(t('auth.registerSuccess'));
      navigate(form.role === ROLES.TEACHER ? '/teacher' : '/student');
    } catch (err) {
      toast.error(err.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="card !p-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2 animate-float inline-block">🎉</div>
          <h1 className="text-3xl font-display font-extrabold gradient-text">
            {t('auth.registerTitle')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {t('auth.registerSubtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role selector */}
          <div>
            <label className="label">{t('auth.role')}</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { v: ROLES.STUDENT, label: t('auth.student'), emoji: '🎓' },
                { v: ROLES.TEACHER, label: t('auth.teacher'), emoji: '👩‍🏫' },
              ].map((r) => (
                <button
                  key={r.v}
                  type="button"
                  onClick={() => setForm({ ...form, role: r.v })}
                  className={`p-3 rounded-2xl font-bold text-sm transition-all border-2 ${
                    form.role === r.v
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white border-primary-600 shadow-kid'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{r.emoji}</div>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">{t('auth.displayName')}</label>
            <div className="relative">
              <FiUser className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-400" />
              <input
                type="text"
                value={form.displayName}
                onChange={update('displayName')}
                className="input ps-12"
                required
                autoComplete="name"
              />
            </div>
          </div>

          <div>
            <label className="label">{t('auth.email')}</label>
            <div className="relative">
              <FiMail className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-400" />
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                className="input ps-12"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="label">{t('auth.password')}</label>
            <div className="relative">
              <FiLock className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={update('password')}
                className="input ps-12 pe-12"
                required
                minLength={6}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute top-1/2 -translate-y-1/2 end-4 text-slate-400"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="label">{t('auth.confirmPassword')}</label>
            <div className="relative">
              <FiLock className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={update('confirmPassword')}
                className="input ps-12"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <FiUserPlus /> {t('auth.registerBtn')}
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          {t('auth.hasAccount')}{' '}
          <Link to="/login" className="text-primary-600 font-bold hover:underline">
            {t('auth.signinHere')}
          </Link>
        </p>
      </div>

      <p className="text-center text-xs text-slate-400 mt-4">
        🇵🇸 PalBook by T. Wad Refae
      </p>
    </motion.div>
  );
};

export default RegisterPage;
