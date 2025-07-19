import React from 'react'

interface AILogoProps {
  size?: number
  className?: string
}

export default function AILogo({ size = 80, className = '' }: AILogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="45" fill="#1e293b" stroke="#475569" strokeWidth="2"/>
      
      {/* Head */}
      <circle cx="50" cy="45" r="25" fill="#f97316" stroke="#ea580c" strokeWidth="2"/>
      
      {/* Eyes */}
      <circle cx="42" cy="40" r="4" fill="#ffffff"/>
      <circle cx="58" cy="40" r="4" fill="#ffffff"/>
      <circle cx="42" cy="40" r="2" fill="#1e293b"/>
      <circle cx="58" cy="40" r="2" fill="#1e293b"/>
      
      {/* Eye sparkles */}
      <circle cx="44" cy="38" r="1" fill="#ffffff"/>
      <circle cx="60" cy="38" r="1" fill="#ffffff"/>
      
      {/* Cheeks */}
      <circle cx="38" cy="48" r="3" fill="#fb923c" opacity="0.6"/>
      <circle cx="62" cy="48" r="3" fill="#fb923c" opacity="0.6"/>
      
      {/* Mouth */}
      <path d="M 45 50 Q 50 55 55 50" stroke="#1e293b" strokeWidth="2" fill="none" strokeLinecap="round"/>
      
      {/* Hair */}
      <path d="M 25 35 Q 30 25 35 30 Q 40 25 45 30 Q 50 25 55 30 Q 60 25 65 30 Q 70 25 75 35" 
            fill="#f97316" stroke="#ea580c" strokeWidth="1"/>
      
      {/* Hair details */}
      <path d="M 30 30 Q 35 25 40 30" fill="none" stroke="#ea580c" strokeWidth="1"/>
      <path d="M 60 30 Q 65 25 70 30" fill="none" stroke="#ea580c" strokeWidth="1"/>
      
      {/* AI Circuit patterns on head */}
      <path d="M 35 35 L 37 35 M 39 35 L 41 35 M 43 35 L 45 35" 
            stroke="#ffffff" strokeWidth="1" opacity="0.7"/>
      <path d="M 55 35 L 57 35 M 59 35 L 61 35 M 63 35 L 65 35" 
            stroke="#ffffff" strokeWidth="1" opacity="0.7"/>
      
      {/* Body */}
      <ellipse cx="50" cy="75" rx="20" ry="15" fill="#f97316" stroke="#ea580c" strokeWidth="2"/>
      
      {/* Arms */}
      <ellipse cx="30" cy="70" rx="8" ry="12" fill="#f97316" stroke="#ea580c" strokeWidth="1"/>
      <ellipse cx="70" cy="70" rx="8" ry="12" fill="#f97316" stroke="#ea580c" strokeWidth="1"/>
      
      {/* Hands */}
      <circle cx="25" cy="75" r="4" fill="#f97316" stroke="#ea580c" strokeWidth="1"/>
      <circle cx="75" cy="75" r="4" fill="#f97316" stroke="#ea580c" strokeWidth="1"/>
      
      {/* Circuit patterns on body */}
      <path d="M 40 70 L 42 70 M 44 70 L 46 70" stroke="#ffffff" strokeWidth="1" opacity="0.6"/>
      <path d="M 54 70 L 56 70 M 58 70 L 60 70" stroke="#ffffff" strokeWidth="1" opacity="0.6"/>
      <path d="M 45 75 L 47 75 M 49 75 L 51 75 M 53 75 L 55 75" 
            stroke="#ffffff" strokeWidth="1" opacity="0.6"/>
      
      {/* Floating data particles */}
      <circle cx="20" cy="30" r="2" fill="#fb923c" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="80" cy="25" r="1.5" fill="#fb923c" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="15" cy="60" r="1" fill="#fb923c" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="85" cy="65" r="1.5" fill="#fb923c" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.1;0.5" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      
      {/* Glow effect */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="#f97316" strokeWidth="1" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="3s" repeatCount="indefinite"/>
      </circle>
    </svg>
  )
} 