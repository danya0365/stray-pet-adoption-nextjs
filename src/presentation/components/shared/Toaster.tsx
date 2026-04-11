'use client';

import { useToastStore } from '@/src/presentation/stores/useToastStore';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { Toast } from '../ui/Toast'; // Assuming we have a Toast UI component or creating/refining it

export const Toaster: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 w-full max-w-sm px-4">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            layout
          >
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => removeToast(toast.id)} 
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
