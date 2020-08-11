module.exports = {
  siteTitle: 'Gaurav Batra | Undergraduate',
  siteDescription:
    'I\'m a undergraduate researcher, currently completing my bachelors at IIIT, Hyderabad. I\'m an honours research student at the Machine Learning Lab, where I work on algorithms in the Multi-Arm Bandit Setting.',
  siteKeywords:
    'Gaurav Batra, Gaurav, Batra, suzaku_kuru, Suzaku_kuru, machine learning, Reinforcement Learning, Software Engineer',
  siteUrl: 'https://gauravbatra.netlify.app/',
  siteLanguage: 'en_US',
  googleAnalyticsID: 'UA-174145610-2',
  // googleVerification: 'DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk',
  name: 'Gaurav Batra',
  location: 'Hyderabad, India',
  email: 'gaurav.batra@students.iiit.ac.in',
  github: 'https://github.com/batra98',
  twitterHandle: '@GauravB57707626',
  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/batra98',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/gaurav-batra-363084176/',
    },
    // {
    //   name: 'Codepen',
    //   url: 'https://codepen.io/bchiang7',
    // },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/batra.gaurav2616/',
    },
    // {
    //   name: 'Facebook',
    //   url: 'https://twitter.com/bchiang7',
    // },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Work',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
    {
      name: 'Blog',
      url: '/pensieve',
    },
  ],

  navHeight: 100,

  colors: {
    green: '#7AB547',
    navy: '#0a192f',
    darkNavy: '#25274D',
  },

  srConfig: (delay = 200) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: 0.25,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
