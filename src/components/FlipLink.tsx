import React from "react";

interface FlipLinkProps {
  children: React.ReactNode;
  href: string;
  text?: string; // Fallback text prop
}

const FlipLink = ({ children, href, text }: FlipLinkProps) => {
  // Convert children to string safely with  better handling
  let textContent = '';
  
  if (typeof children === 'string') {
    textContent = children;
  } else if (React.isValidElement(children)) {
    textContent = (children.props as any)?.children || '';
  } else if (Array.isArray(children)) {
    textContent = children.map(child => {
      if (typeof child === 'string') return child;
      if (React.isValidElement(child)) return (child.props as any)?.children || '';
      return '';
    }).join('');
  } else {
    textContent = String(children || '');
  }

  // Use text prop as fallback if children extraction fails
  if (!textContent || textContent === '[object Object]') {
    textContent = text || 'Link';
  }

  // Debug logging
  console.log('FlipLink children:', children);
  console.log('FlipLink textContent:', textContent);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group text-white relative block overflow-hidden whitespace-nowrap text-2xl font-black uppercase sm:text-3xl md:text-4xl lg:text-5xl hover:text-blue-300 transition-colors duration-300"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div className="flex">
        {textContent.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-[110%]"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 flex">
        {textContent.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-[110%] transition-transform duration-300 ease-in-out group-hover:translate-y-0"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </a>
  );
};

export default FlipLink; 