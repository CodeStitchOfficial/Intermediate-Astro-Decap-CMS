import { SITE, BUSINESS } from "@data/client";

export function getBlogPostingSchema(data, origin) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		"headline": data.title,
		"description": data.description,
		"url": data.url,
		"image": {
			"@type": "ImageObject",
			"url": data.imageUrl,
			"caption": data.imageAlt,
		},
		"datePublished": data.publishedTime,
		"dateModified": data.modifiedTime || data.publishedTime,
		"author": {
			"@type": "Person",
			"name": data.author,
		},
		"publisher": {
			"@type": "Organization",
			"name": SITE.title,
			"logo": {
				"@type": "ImageObject",
				"url": origin + BUSINESS.logo,
			},
		},
	};
}
