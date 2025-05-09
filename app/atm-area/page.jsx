'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { AtmArea } from '@/components/tour';

const Page = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className={`w-full h-screen atm-page text-white flex items-center justify-center`}
    >
      <AtmArea />
    </motion.div>
  );
};

export default Page;
