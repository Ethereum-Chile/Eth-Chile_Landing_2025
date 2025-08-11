import React from 'react';

const SpeakerForm = () => {
  return (
    <div className="w-full">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScF_7mdZTvQMwgmTSnubSqbaaOgu3LKZHmO3YU_zTRhHqqaog/viewform?embedded=true"
        width="100%"
        height="1200"
        className="rounded-lg border-0"
        title="ETHChile 2025 Speaker Application Form"
      >
        Loading…
      </iframe>
      
      {/* Fallback link */}
      <div className="text-center mt-6">
        <p className="text-gray-400 text-sm">
          Having trouble viewing the form? 
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLScF_7mdZTvQMwgmTSnubSqbaaOgu3LKZHmO3YU_zTRhHqqaog/viewform"
            className="text-blue-400 hover:text-blue-300 ml-2 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in a new tab
          </a>
        </p>
      </div>
    </div>
  );
};

export default SpeakerForm;