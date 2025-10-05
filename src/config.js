module.exports = {
	siteTitle: "Gaurav Batra",
	siteDescription:
		"Master's student at UW-Madison specializing in Systems and AI/ML. 3+ years building production MLOps platforms. Experienced in distributed systems, Kubernetes, and scalable AI infrastructure.",
	siteKeywords:
		"Gaurav Batra, Gaurav, Batra, MLOps, AI Infrastructure, Machine Learning Engineer, Distributed Systems, Kubernetes, Software Engineer, UW-Madison, Sigma Computing, Couture.ai",
	siteUrl: "https://gauravbatra.netlify.app/",
	siteLanguage: "en_US",
	googleAnalyticsID: "G-74KX2392ZV",
	// googleVerification: 'DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk',
	name: "Gaurav Batra",
	location: "Madison, WI, USA",
	email: "gbatra3@wisc.edu",
	github: "https://github.com/batra98",
	twitterHandle: "@GauravB57707626",
	socialMedia: [
		{
			name: "GitHub",
			url: "https://github.com/batra98",
		},
		{
			name: "Second 🧠",
			url: "https://gaurav-second-brain.netlify.app/",
		},
		{
			name: "Linkedin",
			url: "https://www.linkedin.com/in/gaurav-batra-363084176/",
		},

		// {
		//   name: 'Codepen',
		//   url: 'https://codepen.io/bchiang7',
		// },
		{
			name: "Instagram",
			url: "https://www.instagram.com/batra.gaurav2616/",
		},

		// {
		//   name: 'Facebook',
		//   url: 'https://twitter.com/bchiang7',
		// },
	],

	navLinks: [
		{
			name: "About",
			url: "/#about",
		},
		{
			name: "Experience",
			url: "/#jobs",
		},
		{
			name: "Work",
			url: "/#projects",
		},
		{
			name: "Journey",
			url: "/journey",
		},
		{
			name: "Contact",
			url: "/#contact",
		},
		{
			name: "Blog",
			url: "/pensieve",
		},
	],

	navHeight: 100,

	colors: {
		green: "#00D9FF",
		purple: "#7C3AED",
		navy: "#0F1729",
		darkNavy: "#0A0E27",
	},

	srConfig: (delay = 200) => ({
		origin: "bottom",
		distance: "20px",
		duration: 500,
		delay,
		rotate: { x: 0, y: 0, z: 0 },
		opacity: 0,
		scale: 1,
		easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
		mobile: true,
		reset: false,
		useDelay: "always",
		viewFactor: 0.25,
		viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
	}),
};
