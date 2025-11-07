export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Determines if a URL matches the current page for aria-current attribute
 * @param {string} pathname - Current page pathname (e.g., Astro.url.pathname)
 * @param {string} url - URL to check against
 * @returns {"page" | undefined} Returns "page" if URLs match, undefined otherwise
 */
export function isCurrentPage(pathname, url) {
  return pathname === url ? "page" : undefined;
}

/**
 * Converts a string to kebab-case
 * @param {string} str - String to convert
 * @returns {string} Kebab-cased string
 */
export function toKebabCase(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Generates a dropdown toggle ID from a navigation key
 * @param {string} key - Navigation entry key
 * @returns {string} Dropdown toggle ID (e.g., "projects-dropdown-toggle")
 */
export function getDropdownId(key) {
  return `${toKebabCase(key)}-dropdown-toggle`;
}
