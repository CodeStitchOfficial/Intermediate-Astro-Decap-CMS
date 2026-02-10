// ===== SITE CONSTANTS =====
export const SITE = {
	title: "ROTA 61 Trabzon Motosiklet Derneği",
	tagline: "Iki teker sevdalilari bir araya getiriyor",
	description: "ROTA 61 Trabzon Motosiklet Derneği, motosiklet tutkunlarını bir araya getiren bir topluluktur. Amacımız, motosiklet kültürünü yaymak, güvenli sürüşü teşvik etmek ve üyelerimiz arasında dayanışmayı güçlendirmektir. Etkinliklerimiz, turlarımız ve sosyal faaliyetlerimizle, motosiklet severlerin keyifli vakit geçirebileceği bir ortam sunuyoruz.",
	url: "http://www.rota61.com/",
	author: "Elma & Co.",
	locale: "tr",
};

// ===== BUSINESS INFO =====
export const BUSINESS = {
	name: SITE.title,
	email: "info@rota61.com",
	phoneForTel: "0530 561 7061",
	phoneFormatted: "0530 561 7061",
	logo: "/assets/favicons/favicon.svg",
	address: {
		lineOne: "2 Nolu Beşirli",
		lineTwo: "918. Sk. 5B",
		city: "Ortahisar",
		state: "Trabzon",
		zip: "61040",
		mapLink: "https://maps.app.goo.gl/XEoan46842BCa7M59",
	},
	socials: {
		facebook: "https://www.facebook.com/Trabzonmotosikletdernegi/",
		instagram: "https://www.instagram.com/rota61tramod/",
	},
};

// ===== SEO DEFAULTS =====
export const SEO = {
	title: SITE.title,
	description: SITE.description,
};

// ===== OPEN GRAPH DEFAULTS =====
export const OG = {
	locale: "tr_TR",
	image: "/assets/social.jpg", // Default fallback social image located in public/
};
