// ===== SITE CONSTANTS =====
export const SITE = {
	title: "Code Stitch Web Designs",
	tagline: "Professional Web Design Services",
	description: "Code Stitch Web Designs offers top-tier web design and development services to meet all your project needs. Start exploring and contact our team for superior quality and reliability.",
	url: "https://www.codestitch.app",
	author: "Code Stitch Team",
};

// ===== BUSINESS INFO =====
export const BUSINESS = {
	name: SITE.title,
	email: "help@codestitch.app",
	phoneForTel: "555-779-4407",
	phoneFormatted: "(555) 779-4407",
	address: {
		lineOne: "First Address Line",
		lineTwo: "Second Address Line",
		city: "Denver",
		state: "CO",
		zip: "80206",
		mapLink: "https://goo.gl/maps/UAQn4vuGDiwv7DV39",
	},
	socials: {
		facebook: "https://www.facebook.com/",
		instagram: "https://www.instagram.com/",
	},
};

// ===== SEO DEFAULTS =====
export const SEO = {
	title: SITE.title,
	description: SITE.description,
	// Hardcoded structured data
	structuredData: {
		"@context": "https://schema.org",
		"@type": "WebPage",
		"@id": SITE.url,
		url: SITE.url,
		name: SITE.title,
		description: SITE.description,
		isPartOf: {
			"@type": "WebSite",
			url: SITE.url,
			name: SITE.title,
			description: SITE.description,
		},
		inLanguage: "en-US",
	},
};

// ===== OPEN GRAPH DEFAULTS =====
export const OG = {
	locale: "en_US",
	type: "website",
	url: SITE.url,
	title: `${SITE.title}: Professional Web Design Services`,
	description: SITE.description,
	image: "/assets/social.jpg", // Default OG image (existing file)
};
