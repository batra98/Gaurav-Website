/* eslint-disable no-console */
import confetti from 'canvas-confetti';

// ASCII Art Welcome
const ASCII_ART = `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     ██████╗  █████╗ ██╗   ██╗██████╗  █████╗ ██╗   ██╗  ║
║    ██╔════╝ ██╔══██╗██║   ██║██╔══██╗██╔══██╗██║   ██║  ║
║    ██║  ███╗███████║██║   ██║██████╔╝███████║██║   ██║  ║
║    ██║   ██║██╔══██║██║   ██║██╔══██╗██╔══██║╚██╗ ██╔╝  ║
║    ╚██████╔╝██║  ██║╚██████╔╝██║  ██║██║  ██║ ╚████╔╝   ║
║     ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝    ║
║                                                           ║
║              Welcome to my portfolio! 🚀                  ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`;

const COMMANDS_HELP = `
Available commands:

  🎯 hire()      - Get my contact info (with celebration!)
  💼 skills()    - See my tech stack in style
  ☕ coffee()    - Support my caffeine addiction
  🎮 games()     - My favorite games
  📚 books()     - What I'm reading
  🎵 music()     - My coding playlist
  🏆 resume()    - Download my resume
  🤫 secret()    - Unlock something special
  🎨 theme()     - Change site theme
  💡 tips()      - Get frontend tips
  🌟 about()     - Learn more about this site
  
Type any command to execute it!
`;

// Initialize Easter Eggs
export const initEasterEggs = () => {
  // Welcome message
  console.log('%c' + ASCII_ART, 'color: #00D9FF; font-weight: bold;');
  console.log(
    '%c👋 Hey there, curious developer!',
    'color: #7C3AED; font-size: 16px; font-weight: bold;',
  );
  console.log(
    '%cLooks like you opened the console. I like your style! 😎',
    'color: #94A3B8; font-size: 14px;',
  );
  console.log('%cType %chelp()%c to see available commands', 'color: #94A3B8;', 'color: #00D9FF; font-weight: bold;', 'color: #94A3B8;');
  console.log('');

  // Help command
  window.help = () => {
    console.log('%c' + COMMANDS_HELP, 'color: #00D9FF; font-size: 13px; line-height: 1.8;');
  };

  // Hire command - with confetti!
  window.hire = () => {
    console.clear();
    console.log('%c🎉 AWESOME! Let\'s make something great together!', 'color: #00D9FF; font-size: 20px; font-weight: bold;');
    console.log('');
    console.log('%c📧 Email: gbatra3@wisc.edu', 'color: #7C3AED; font-size: 16px;');
    console.log('%c🔗 LinkedIn: linkedin.com/in/gaurav-batra-363084176', 'color: #7C3AED; font-size: 16px;');
    console.log('%c💼 GitHub: github.com/batra98', 'color: #7C3AED; font-size: 16px;');
    console.log('%c📱 Phone: +1 (608) 658-5267', 'color: #7C3AED; font-size: 16px;');
    console.log('');
    console.log('%c💡 Seeking full-time roles in AI Infrastructure, MLOps, and Distributed Systems for 2026!', 'color: #00D9FF; font-style: italic;');
    
    // Trigger confetti!
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00D9FF', '#7C3AED', '#E2E8F0'],
      });
    }
    
    return '🎊 Confetti launched! Check your screen!';
  };

  // Skills command - Matrix style
  window.skills = () => {
    console.clear();
    console.log('%c⚡ TECH STACK LOADING...', 'color: #00D9FF; font-size: 18px; font-weight: bold;');
    console.log('');
    
    const skills = [
      { category: '💻 Languages', items: 'Python • C++ • Golang • Rust • Bash' },
      { category: '🤖 ML/AI', items: 'PyTorch • TensorFlow • Hugging Face • W&B' },
      { category: '☁️ Cloud/Infra', items: 'Kubernetes • Docker • AWS • GCP • Istio' },
      { category: '⚙️ Backend', items: 'FastAPI • Flask • PostgreSQL • Redis • Celery' },
      { category: '📊 Data', items: 'Spark/PySpark • Pandas • NumPy' },
      { category: '🛠️ Systems', items: 'FUSE • Linux • RAID • Low-level C' },
    ];

    skills.forEach((skill, i) => {
      setTimeout(() => {
        console.log(`%c${skill.category}`, 'color: #7C3AED; font-size: 14px; font-weight: bold;');
        console.log(`%c  ${skill.items}`, 'color: #94A3B8; font-size: 13px;');
        console.log('');
      }, i * 200);
    });

    return '✨ Skills loaded!';
  };

  // Coffee command
  window.coffee = () => {
    console.clear();
    console.log('%c☕ Thanks for the caffeine support!', 'color: #00D9FF; font-size: 18px; font-weight: bold;');
    console.log('');
    console.log('%c' + `
      ☕
     (  )
    (    )
    |====|
    |    |
    '----'
    `, 'color: #7C3AED; font-size: 12px;');
    console.log('%cActually, the best way to support me is to hire me! 😄', 'color: #94A3B8; font-size: 14px;');
    console.log('%cTry: hire()', 'color: #00D9FF; font-size: 14px;');
    return '☕ Coffee > Sleep';
  };

  // Games command
  window.games = () => {
    console.log('%c🎮 Favorite Games:', 'color: #00D9FF; font-size: 16px; font-weight: bold;');
    console.log('%c  🏰 Age of Empires - Strategy Classic', 'color: #94A3B8;');
    console.log('%c  🗡️  Assassin\'s Creed - Action Adventure', 'color: #94A3B8;');
    console.log('%c  ⚔️  Attack on Titan - The ultimate story', 'color: #94A3B8;');
    console.log('');
    console.log('%cWanna play together? Let\'s connect! → hire()', 'color: #7C3AED;');
    return '🎮 GG!';
  };

  // Books command
  window.books = () => {
    console.log('%c📚 Currently Reading:', 'color: #00D9FF; font-size: 16px; font-weight: bold;');
    console.log('%c  📖 Designing Data-Intensive Applications', 'color: #94A3B8;');
    console.log('%c  📖 Database Internals', 'color: #94A3B8;');
    console.log('%c  📖 System Design Interview Vol 1 & 2', 'color: #94A3B8;');
    console.log('');
    console.log('%cAlways learning! 📚', 'color: #7C3AED;');
    return '📖 Knowledge++';
  };

  // Music command
  window.music = () => {
    console.log('%c🎵 Coding Playlist:', 'color: #00D9FF; font-size: 16px; font-weight: bold;');
    console.log('%c  🎸 Lo-fi Hip Hop beats', 'color: #94A3B8;');
    console.log('%c  🎹 Synthwave & Cyberpunk', 'color: #94A3B8;');
    console.log('%c  🎼 Epic orchestral (for debugging)', 'color: #94A3B8;');
    console.log('');
    console.log('%c"Code without music is just debugging in silence" - Gaurav', 'color: #7C3AED; font-style: italic;');
    return '🎵 Now playing...';
  };

  // Resume command
  window.resume = () => {
    console.log('%c📄 Resume Download:', 'color: #00D9FF; font-size: 16px; font-weight: bold;');
    console.log('%c  Opening resume in new tab...', 'color: #94A3B8;');
    window.open('/resume.pdf', '_blank');
    return '✅ Resume opened!';
  };

  // Secret command
  window.secret = () => {
    console.clear();
    console.log('%c🔓 SECRET UNLOCKED!', 'color: #7C3AED; font-size: 20px; font-weight: bold;');
    console.log('');
    console.log('%cYou found the secret! Here\'s a bonus:', 'color: #00D9FF; font-size: 14px;');
    console.log('');
    console.log('%c"The best code is no code at all." - Jeff Atwood', 'color: #94A3B8; font-style: italic;');
    console.log('');
    console.log('%cBut since we have to write code, let\'s make it elegant! 🎨', 'color: #7C3AED;');
    console.log('');
    console.log('%cTry the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #00D9FF;');
    
    // Unlock cyberpunk theme
    localStorage.setItem('secretUnlocked', 'true');
    return '🎉 Secret unlocked! Cyberpunk theme available!';
  };

  // Theme command
  window.theme = (themeName) => {
    if (!themeName) {
      console.log('%c🎨 Available Themes:', 'color: #00D9FF; font-size: 16px; font-weight: bold;');
      console.log('%c  • dark (default)', 'color: #94A3B8;');
      console.log('%c  • light', 'color: #94A3B8;');
      console.log('%c  • cyberpunk (unlock with secret())', 'color: #94A3B8;');
      console.log('');
      console.log('%cUsage: theme("dark") or theme("light")', 'color: #7C3AED;');
      return '🎨 Pick your theme!';
    }
    
    localStorage.setItem('preferredTheme', themeName);
    window.location.reload();
    return `✅ Switching to ${themeName} theme...`;
  };

  // Tips command
  window.tips = () => {
    const tips = [
      '💡 This site is built with Gatsby.js + React',
      '⚡ Uses styled-components for CSS-in-JS',
      '🎨 Features glassmorphism and gradient effects',
      '🖱️ Has a custom cursor on desktop',
      '📊 Includes a scroll progress indicator',
      '⌨️ Typing animation in the hero section',
      '🔥 All deployed on Netlify with CI/CD',
      '✨ Open source - check the GitHub repo!',
    ];
    
    console.log('%c💡 Frontend Tips:', 'color: #00D9FF; font-size: 16px; font-weight: bold;');
    tips.forEach(tip => {
      console.log(`%c  ${tip}`, 'color: #94A3B8;');
    });
    return '💡 Keep learning!';
  };

  // About command
  window.about = () => {
    console.log('%c🌟 About This Portfolio:', 'color: #00D9FF; font-size: 16px; font-weight: bold;');
    console.log('');
    console.log('%c  Built with: Gatsby.js, React, Styled Components', 'color: #94A3B8;');
    console.log('%c  Design: Modern glassmorphism with gradients', 'color: #94A3B8;');
    console.log('%c  Theme: Cyan (#00D9FF) + Purple (#7C3AED)', 'color: #94A3B8;');
    console.log('%c  Performance: Optimized for speed', 'color: #94A3B8;');
    console.log('%c  Accessibility: WCAG 2.1 AA compliant', 'color: #94A3B8;');
    console.log('');
    console.log('%c  Version: 2.0 (2025 Complete Redesign)', 'color: #7C3AED;');
    console.log('%c  Easter Eggs: You\'re exploring them! 🎉', 'color: #7C3AED;');
    return '✨ Made with ❤️ and lots of ☕';
  };

  // Fun facts command
  window.funfacts = () => {
    const facts = [
      '🎓 Graduated with 9.48/10 CGPA from IIIT Hyderabad',
      '💼 Worked with Rust for 40% performance improvements',
      '📄 Published paper at PRICAI\'21 on ML algorithms',
      '🏆 Contributed to $250k ARR in first U.S. client',
      '🎮 Massive Age of Empires & Assassin\'s Creed fan',
      '🤖 Built 15+ microservices in production',
      '📊 Reduced issue discovery time by 75%',
      '🚀 Currently @ UW-Madison with 3.92 GPA',
    ];
    
    console.log('%c🌟 Fun Facts About Me:', 'color: #00D9FF; font-size: 16px; font-weight: bold;');
    console.log('');
    facts.forEach(fact => {
      console.log(`%c  ${fact}`, 'color: #94A3B8; font-size: 13px;');
    });
    return '🎉 Pretty cool, right?';
  };

  // Konami code sequence
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateKonamiCode();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
};

// Konami code activation
const activateKonamiCode = () => {
  console.clear();
  console.log('%c🎮 KONAMI CODE ACTIVATED! 🎮', 'color: #7C3AED; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #7C3AED;');
  console.log('');
  console.log('%c🔓 Secret Features Unlocked:', 'color: #00D9FF; font-size: 16px;');
  console.log('%c  ✨ Cyberpunk theme available', 'color: #94A3B8;');
  console.log('%c  🎯 Hidden projects revealed', 'color: #94A3B8;');
  console.log('%c  🏆 Achievement unlocked: "Code Master"', 'color: #94A3B8;');
  console.log('');
  console.log('%cType theme("cyberpunk") to activate! 🌃', 'color: #7C3AED; font-size: 14px;');
  
  localStorage.setItem('konamiUnlocked', 'true');
  
  // Epic confetti
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#00D9FF', '#7C3AED'],
    }));
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#00D9FF', '#7C3AED'],
    }));
  }, 250);

  // Dispatch custom event for UI updates
  window.dispatchEvent(new CustomEvent('konamiActivated'));
};

// Achievement system
export const trackAchievement = (achievementId) => {
  const achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
  if (!achievements.includes(achievementId)) {
    achievements.push(achievementId);
    localStorage.setItem('achievements', JSON.stringify(achievements));
    showAchievementNotification(achievementId);
  }
};

const showAchievementNotification = (achievementId) => {
  const achievementNames = {
    'first-visit': '👋 First Visit',
    'read-all-jobs': '💼 Career Explorer',
    'view-all-projects': '🚀 Project Hunter',
    'konami-master': '🎮 Konami Code Master',
    'console-warrior': '💻 Console Warrior',
    'theme-switcher': '🎨 Theme Enthusiast',
  };

  console.log(`%c🏆 Achievement Unlocked: ${achievementNames[achievementId] || achievementId}`, 'color: #FFD700; font-size: 16px; font-weight: bold;');
  
  // Visual notification could be added here
};

// Check for achievements
window.achievements = () => {
  const unlocked = JSON.parse(localStorage.getItem('achievements') || '[]');
  console.log('%c🏆 Your Achievements:', 'color: #00D9FF; font-size: 16px; font-weight: bold;');
  console.log('');
  
  if (unlocked.length === 0) {
    console.log('%c  None yet! Keep exploring... 🔍', 'color: #94A3B8;');
  } else {
    unlocked.forEach(achievement => {
      console.log(`%c  ✅ ${achievement}`, 'color: #7C3AED;');
    });
  }
  
  return `🏆 ${unlocked.length} achievements unlocked!`;
};

export default initEasterEggs;