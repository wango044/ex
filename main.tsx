import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { Review } from '../types';

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Екатерина Соколова',
    rating: 5,
    text: 'Лучший мастер в городе! Делала ламинирование бровей впервые — результат превзошел все ожидания. Волоски лежат идеально, форма мягкая и очень естественная. Теперь просыпаюсь по утрам красивой без всякого макияжа! Большое спасибо за заботу.',
    date: '15 июля 2026',
    service: 'Ламинирование бровей + Botox',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'rev-2',
    name: 'Мария Кузнецова',
    rating: 5,
    text: 'Окрашивание хной держится уже третью неделю! Форма подобрана идеально под мой овал лица. Очень уютная студия, спокойная музыка и качественные материалы. Обязательно вернусь снова!',
    date: '08 июля 2026',
    service: 'Архитектура бровей & Окрашивание хной',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'rev-3',
    name: 'Анна Морозова',
    rating: 5,
    text: 'Обожаю коллагенирование! Волоски стали заметно толще и здоровее. Мастер очень аккуратная, деликатно работает с воском — вообще никакой боли или покраснения. Рекомендую на все 100%!',
    date: '28 июня 2026',
    service: 'Коллагеновое восстановление бровей',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
  },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [service, setService] = useState('Ламинирование бровей');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      rating: rating,
      text: text.trim(),
      date: 'Сегодня',
      service: service,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', // stylish fallback female profile
    };

    setReviews([newReview, ...reviews]);
    setName('');
    setText('');
    setRating(5);
    setService('Ламинирование бровей');
    setFormOpen(false);
  };

  return (
    <section id="reviews" className="relative py-24 px-6 md:px-12 bg-neutral-900 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-400 font-mono text-xs uppercase tracking-widest mb-3"
          >
            Отзывы гостей
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-sans font-light tracking-tight"
          >
            Что говорят клиенты
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-[1px] bg-amber-500/50 mx-auto mt-6"
          />
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatePresence mode="popLayout">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
                className="bg-neutral-950/50 border border-neutral-800/80 rounded-3xl p-8 flex flex-col justify-between shadow-lg relative group hover:border-amber-500/20 transition-all duration-300"
              >
                {/* Decorative Quote Mark */}
                <span className="absolute top-6 right-8 text-neutral-800 text-6xl font-serif pointer-events-none transition-colors group-hover:text-amber-500/10">
                  “
                </span>

                <div className="flex flex-col gap-4">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4.5 h-4.5 ${
                          i < review.rating ? 'text-amber-400 fill-current' : 'text-neutral-700'
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-neutral-300 leading-relaxed font-sans font-light italic">
                    "{review.text}"
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-neutral-800/60">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-neutral-800"
                  />
                  <div className="text-left">
                    <h4 className="text-sm font-sans font-medium text-white">{review.name}</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">{review.service}</p>
                    <span className="text-[10px] text-neutral-500 font-mono block mt-1">
                      {review.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Button & Collapsible Form */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setFormOpen(!formOpen)}
            className="px-6 py-3 rounded-full border border-neutral-700 hover:border-amber-400 text-neutral-200 hover:text-amber-400 font-medium text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer bg-neutral-950/30"
          >
            {formOpen ? 'Закрыть форму' : 'Оставить свой отзыв'}
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${formOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <AnimatePresence>
            {formOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full max-w-xl overflow-hidden bg-neutral-950/60 border border-neutral-800/80 rounded-3xl p-8"
              >
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                  <h3 className="text-xl font-sans font-light text-white border-b border-neutral-900 pb-3">
                    Новый отзыв
                  </h3>

                  {/* Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Например, Елена"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>

                  {/* Rating Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
                      Оценка
                    </label>
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: 5 }).map((_, idx) => {
                        const starValue = idx + 1;
                        return (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setRating(starValue)}
                            className="text-neutral-500 hover:scale-110 transition-transform cursor-pointer"
                          >
                            <svg
                              className={`w-7 h-7 ${
                                starValue <= rating ? 'text-amber-400 fill-current' : 'text-neutral-700'
                              }`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Service Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
                      Процедура
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                    >
                      <option>Ламинирование бровей + Botox</option>
                      <option>Архитектура бровей & Окрашивание хной</option>
                      <option>Коллагеновое восстановление бровей</option>
                      <option>Архитектура и окрашивание краской</option>
                      <option>Коррекция бровей воском</option>
                    </select>
                  </div>

                  {/* Feedback Textarea */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
                      Ваш отзыв
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Поделитесь вашими впечатлениями о работе..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-semibold text-center transition-colors shadow-lg shadow-amber-400/10 cursor-pointer"
                  >
                    Опубликовать отзыв
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
