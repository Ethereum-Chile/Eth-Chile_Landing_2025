'use client';

import React from 'react';
import { motion } from 'framer-motion';

const SpeakerForm: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 backdrop-blur-sm">
        <h3 className="text-2xl font-semibold text-white mb-6 text-center">
          Speaker Application Form
        </h3>
        
        <div className="w-full h-[800px]">
          <iframe
            src="https://forms.gle/eMLWa1L5Wteg5Fwm8?embedded=true"
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="rounded-lg"
            title="ETHChile 2025 Speaker Application"
          >
            Loading…
          </iframe>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            If the form doesn't load, you can also apply directly at{' '}
            <a 
              href="https://forms.gle/eMLWa1L5Wteg5Fwm8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Google Forms
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SpeakerForm;
