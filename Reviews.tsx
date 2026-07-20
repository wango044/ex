import { motion, HTMLMotionProps } from 'motion/react';
import React from 'react';

interface SplitTextProps extends HTMLMotionProps<'span'> {
  text: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  className?: string;
  wordClassName?: string;
  charClassName?: string;
}

export default function SplitText({
  text,
  delay = 0,
  duration = 0.6,
  stagger = 0.02,
  direction = 'up',
  className = '',
  wordClassName = '',
  charClassName = '',
  ...props
}: SplitTextProps) {
  const words = text.split(' ');

  const getDirectionVariants = () => {
    switch (direction) {
      case 'up':
        return {
          hidden: { y: '100%', opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case 'down':
        return {
          hidden: { y: '-100%', opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case 'left':
        return {
          hidden: { x: '100%', opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case 'right':
        return {
          hidden: { x: '-100%', opacity: 0 },
          visible: { x: 0, opacity: 1 },
        };
      case 'fade':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: getDirectionVariants().hidden,
    visible: {
      ...getDirectionVariants().visible,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
        duration: duration,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block select-none ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      {...props}
    >
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className={`inline-block whitespace-nowrap ${wordClassName}`}
          style={{ marginRight: '0.25em' }}
        >
          {word.split('').map((char, charIndex) => (
            <span
              key={`${char}-${charIndex}`}
              className="inline-block overflow-hidden"
            >
              <motion.span
                className={`inline-block ${charClassName}`}
                variants={childVariants}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
