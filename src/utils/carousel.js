import { Carousel } from 'flowbite';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  const items = [
    {
      position: 0,
      el: document.getElementById('carousel-item-1'),
    },
    {
      position: 1,
      el: document.getElementById('carousel-item-2'),
    },
    {
      position: 2,
      el: document.getElementById('carousel-item-3'),
    },
    {
      position: 3,
      el: document.getElementById('carousel-item-4'),
    },
  ];

  const options = {
    defaultPosition: 1,
    interval: 7000,

    indicators: {
      activeClasses: 'bg-white dark:bg-gray-800',
      inactiveClasses:
        'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
      items: [
        {
          position: 0,
          el: document.getElementById('carousel-indicator-1'),
        },
        {
          position: 1,
          el: document.getElementById('carousel-indicator-2'),
        },
        {
          position: 2,
          el: document.getElementById('carousel-indicator-3'),
        },
        {
          position: 3,
          el: document.getElementById('carousel-indicator-4'),
        },
      ],
    },
  };

  // Filter out null elements
  const validItems = items.filter(item => item.el !== null);
  const validIndicators = options.indicators.items.filter(item => item.el !== null);

  // Only initialize carousel if we have valid elements
  if (validItems.length > 0) {
    const carouselOptions = {
      ...options,
      indicators: {
        ...options.indicators,
        items: validIndicators,
      },
    };

    const carousel = new Carousel(validItems, carouselOptions);
    carousel.cycle();
  }
});
