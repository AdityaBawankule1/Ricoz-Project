import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, PawPrint, Phone, User, Sparkles } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', petName: '', preferredService: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : {
          fullName: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          petName: formData.petName,
          preferredService: formData.preferredService,
          userType: 'pet-owner'
        };

    try {
      const endpoint = isLogin ? '/api/login' : '/api/signup';
      const apiUrl = process.env.REACT_APP_API_URL ||
        'https://ricoz-backend-6wjbjiprm-aditya-bawankules-projects-19b949fb.vercel.app';
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (!isLogin) {
          setSuccessMessage('Signup successful. Please sign in with your account.');
          setIsLogin(true);
          setFormData({
            name: '',
            email: '',
            password: '',
            phone: '',
            petName: '',
            preferredService: ''
          });
          setError('');
          setLoading(false);
          return;
        }

        const user = data.user || {
          _id: 'local-user',
          name: formData.name || formData.email.split('@')[0],
          email: formData.email
        };

        setSuccessMessage('');
        onLoginSuccess?.(user);
        navigate('/');
      } else {
        const message = data.message || 'Authentication failed';
        setSuccessMessage('');
        setError(message);
      }
    } catch (err) {
      setError('Unable to connect to the Kind Paws server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#fffaf5] text-slate-800 font-sans selection:bg-amber-100">
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Wellness for every pup</p>
              <span className="text-2xl font-black text-slate-900">Kind Paws</span>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-slate-600 mt-2">
              {isLogin
                ? 'Sign in to manage your dog care plans and trainer bookings.'
                : 'Join Kind Paws and get expert support for your furry family member.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Full name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                      placeholder="Aarav Sharma"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Phone number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Dog name</label>
                  <input
                    type="text"
                    name="petName"
                    value={formData.petName}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    placeholder="Buddy"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-700">Preferred service</label>
                  <select
                    name="preferredService"
                    value={formData.preferredService}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  >
                    <option value="">Select a service</option>
                    <option value="obedience-training">Obedience training</option>
                    <option value="puppy-socialisation">Puppy socialisation</option>
                    <option value="behavior-support">Behaviour support</option>
                    <option value="grooming">Grooming care</option>
                  </select>
                </div>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Email address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  placeholder="hello@kindpaws.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 py-3.5 font-semibold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Please wait
                </span>
              ) : isLogin ? (
                'Sign in'
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-600">
            {isLogin ? "Need an account?" : 'Already a member?'}
            <button
              type="button"
              onClick={() => {
                setIsLogin((prev) => !prev);
                setError('');
              }}
              className="ml-2 font-bold text-orange-600 hover:text-orange-700"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>

      <div className="hidden flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.25),_transparent_40%),linear-gradient(135deg,#1f2937_0%,#111827_100%)] lg:flex">
        <div className="relative z-10 max-w-xl px-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-orange-200">
            <Sparkles className="h-3.5 w-3.5" />
            Trusted by happy dog parents
          </div>

          <h2 className="text-5xl font-black leading-tight text-white">
            Gentle training.<br />
            <span className="text-orange-300">Confident dogs.</span>
          </h2>

          <ul className="mt-8 space-y-4 text-orange-50/90">
            {['Certified trainers', 'Tailored care plans', 'Real-time booking updates'].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-400/20 text-sm font-bold text-orange-200">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <p className="text-lg italic text-slate-200">
              “Kind Paws made it easy to find a trainer who truly understands our rescue pup.”
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-300 font-bold text-slate-900">
                NS
              </div>
              <div>
                <p className="font-bold text-white">Nisha Shah</p>
                <p className="text-sm text-slate-300">Dog parent, Mumbai</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}