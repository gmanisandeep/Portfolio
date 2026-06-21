import React, { useState } from 'react';

export default function AppleEmoji({ emoji, className }) {
  const [error, setError] = useState(false);
  
  if (!emoji) return null;
  if (error) return <span className={className}>{emoji}</span>;
  
  // Clean up emoji for emoji-datasource-apple CDN
  let hex = Array.from(emoji)
    .map(c => c.codePointAt(0).toString(16))
    .filter(h => h !== 'fe0f') // remove variant selectors as the CDN files usually omit them
    .join('-');
  
  const src = `https://cdnjs.cloudflare.com/ajax/libs/emoji-datasource-apple/14.0.0/img/apple/64/${hex}.png`;

  return (
    <img 
      src={src} 
      alt={emoji} 
      className={`inline-block align-middle pointer-events-none select-none ${className || 'w-[1.1em] h-[1.1em] mt-[-0.15em]'}`} 
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}
