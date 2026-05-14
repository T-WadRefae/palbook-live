import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';
import { loginUser, resetPassword, getUserProfile } from '../../firebase/auth';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(t('common.error'));
      return;
    }
    setLoading(true);
    try {
      const user = await loginUser(email, password);
      const profile = await getUserProfile(user.uid);
      toast.success(t('auth.loginSuccess'));
      const dest = location.state?.from?.pathname;
      navigate(dest || (profile?.role === 'teacher' ? '/teacher' : '/student'));
    } catch (err) {
      toast.error(err.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    if (!email) {
      toast.error(t('auth.email'));
      return;
    }
    try {
      await resetPassword(email);
      toast.success(t('auth.resetEmailSent'));
    } catch (err) {
      toast.error(err.message);
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
          <div className="text-5xl mb-2 animate-wiggle inline-block">👋</div>
          <h1 className="text-3xl font-display font-extrabold gradient-text">
            {t('auth.loginTitle')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {t('auth.loginSubtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">{t('auth.email')}</label>
            <div className="relative">
              <FiMail className="absolute top-1/2 -translate-y-1/2 start-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input ps-12 pe-12"
                required
                autoComplete="current-password"
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute top-1/2 -translate-y-1/2 end-4 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgot}
              className="text-sm text-primary-600 hover:underline font-semibold"
            >
              {t('auth.forgotPassword')}
            </button>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <FiLogIn className="rtl-flip" /> {t('auth.loginBtn')}
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
          {t('auth.noAccount')}{' '}
          <Link
            to="/register"
            className="text-primary-600 font-bold hover:underline"
          >
            {t('auth.signupHere')}
          </Link>
        </p>
      </div>

      <p className="text-center text-xs text-slate-400 mt-4">
        🇵🇸 PalBook Live by T. Wad Refae
      </p>
    </motion.div>
  );
};

export default LoginPage;
