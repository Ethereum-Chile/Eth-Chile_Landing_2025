import React from 'react';

const SpeakerTimeline = () => {
  const timelineEvents = [
    {
      date: '25 Jul',
      title: 'Application submissions start',
      description: 'Speaker applications open',
      status: 'completed'
    },
    {
      date: '25 Aug',
      title: 'First round of submissions review',
      description: 'Initial feedback provided',
      status: 'active'
    },
    {
      date: '10 Sep',
      title: 'Speaker applications close',
      description: 'Final deadline for submissions',
      status: 'upcoming'
    },
    {
      date: '25 Sep',
      title: 'Last round of speaker review',
      description: 'Final selections made',
      status: 'upcoming'
    }
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          circle: 'bg-gradient-to-br from-green-600 to-green-800 shadow-green-500/50',
          text: 'text-green-400',
          border: 'border-green-500/30',
          dateText: 'text-white'
        };
      case 'active':
        return {
          circle: 'bg-gradient-to-br from-blue-600 to-blue-800 shadow-blue-500/50 animate-pulse',
          text: 'text-blue-400',
          border: 'border-blue-500/30',
          dateText: 'text-white'
        };
      case 'upcoming':
        return {
          circle: 'bg-gradient-to-br from-gray-700 to-gray-900',
          text: 'text-gray-300',
          border: 'border-gray-600/30',
          dateText: 'text-gray-200'
        };
      default:
        return {
          circle: 'bg-gradient-to-br from-gray-700 to-gray-900',
          text: 'text-gray-300',
          border: 'border-gray-600/30',
          dateText: 'text-gray-200'
        };
    }
  };

  return (
    <div className="w-full px-4">
      {/* Desktop Horizontal Timeline */}
      <div className="hidden lg:block max-w-6xl mx-auto">
        <div className="relative">
          {/* Main horizontal line */}
          <div className="absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
          
          {/* Events */}
          <div className="relative grid grid-cols-4 gap-4">
            {timelineEvents.map((event, index) => {
              const styles = getStatusStyles(event.status);
              return (
                <div key={index} className="relative">
                  {/* Event node and content */}
                  <div className="flex flex-col items-center">
                    {/* Circle with date */}
                    <div className="relative z-20 mb-8">
                      <div className={`w-20 h-20 rounded-full ${styles.circle} shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-110 border border-gray-700`}>
                        <span className={`${styles.dateText} font-bold text-sm`}>{event.date}</span>
                      </div>
                      {/* Connector to content */}
                      <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b ${event.status === 'completed' ? 'from-green-500' : event.status === 'active' ? 'from-blue-500' : 'from-gray-600'} to-transparent`}></div>
                    </div>
                    
                    {/* Content box */}
                    <div className={`w-full p-4 rounded-lg bg-gray-900/90 backdrop-blur-sm border ${styles.border} hover:bg-gray-800/90 transition-all duration-300`}>
                      <h4 className="font-semibold text-base mb-2 text-white">
                        {event.title}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tablet Timeline (2x2 Grid) */}
      <div className="hidden md:block lg:hidden max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-8">
          {timelineEvents.map((event, index) => {
            const styles = getStatusStyles(event.status);
            return (
              <div key={index} className="relative">
                <div className="flex items-start space-x-4">
                  {/* Date circle */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full ${styles.circle} shadow-lg flex items-center justify-center border border-gray-700`}>
                    <span className={`${styles.dateText} font-bold text-xs`}>{event.date}</span>
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-base mb-1 text-white">
                      {event.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="md:hidden max-w-lg mx-auto">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
          
          {/* Events */}
          <div className="space-y-6">
            {timelineEvents.map((event, index) => {
              const styles = getStatusStyles(event.status);
              return (
                <div key={index} className="relative flex items-start">
                  {/* Date circle */}
                  <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full ${styles.circle} shadow-lg flex items-center justify-center border border-gray-700`}>
                    <span className={`${styles.dateText} font-bold text-xs`}>{event.date}</span>
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-6 flex-1 p-4 rounded-lg bg-gray-900/90 backdrop-blur-sm border ${styles.border}`}>
                    <h4 className="font-semibold text-base mb-1 text-white">
                      {event.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default SpeakerTimeline;