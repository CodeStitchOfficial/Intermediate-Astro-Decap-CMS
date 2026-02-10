// Astro:page-load wrapper for View Transitions purposes
document.addEventListener("astro:page-load", () => {
	// Make the script controlling the <Hamburger /> mobile menu component available after navigating to a new page.

	(() => {
		// Configuration
		const CONFIG = {
			BREAKPOINTS: {
				MOBILE: 1023.5,
			},
			SELECTORS: {
				body: "body",
				navigation: "#cs-navigation",
				hamburger: "#cs-navigation .cs-toggle",
				menuWrapper: "#cs-ul-wrapper",
				dropdownToggle: ".cs-dropdown-toggle",
				dropdown: ".cs-dropdown",
				dropdownMenu: ".cs-drop-ul",
				navButton: ".cs-nav-button",
				darkModeToggle: "#dark-mode-toggle",
				scrollSpyLinks: "#cs-navigation a[data-scrollspy]",
			},
			CLASSES: {
				active: "cs-active",
				menuOpen: "cs-open",
			},
		};

		// DOM Elements
		const elements = {
			body: document.querySelector(CONFIG.SELECTORS.body),
			navigation: document.querySelector(CONFIG.SELECTORS.navigation),
			hamburger: document.querySelector(CONFIG.SELECTORS.hamburger),
			menuWrapper: document.querySelector(CONFIG.SELECTORS.menuWrapper),
			navButton: document.querySelector(CONFIG.SELECTORS.navButton),
			darkModeToggle: document.querySelector(CONFIG.SELECTORS.darkModeToggle),
		};

		// Utilities
		const isMobile = () => window.matchMedia(`(max-width: ${CONFIG.BREAKPOINTS.MOBILE}px)`).matches;

		const getHeaderOffset = () => {
			const nav = elements.navigation;
			if (!nav) return 0;
			// position: fixed header; use its height as scrollspy offset target
			return Math.ceil(nav.getBoundingClientRect().height || 0);
		};

		const toggleAttribute = (element, attribute, value1 = "true", value2 = "false") => {
			if (!element) return;
			const current = element.getAttribute(attribute);
			element.setAttribute(attribute, current === value1 ? value2 : value1);
		};

		const toggleInert = (element) => element && (element.inert = !element.inert);

		// ScrollSpy (active link for in-page sections)
		const scrollSpy = (() => {
			let observer;
			let observedSections = [];

			const clearActive = () => {
				if (!elements.navigation) return;
				elements.navigation
					.querySelectorAll(CONFIG.SELECTORS.scrollSpyLinks)
					.forEach((a) => a.classList.remove(CONFIG.CLASSES.active));
			};

			const setActiveById = (id) => {
				if (!elements.navigation || !id) return;
				const link = elements.navigation.querySelector(`a[data-scrollspy][href="#${CSS.escape(id)}"]`);
				if (!link) return;
				clearActive();
				link.classList.add(CONFIG.CLASSES.active);
			};

			const getIdFromHashLink = (href) => {
				if (!href) return null;
				// Support plain '#id' only. Ignore '/', '/contact/', etc.
				if (!href.startsWith("#")) return null;
				const id = href.slice(1).trim();
				return id || null;
			};

			const init = () => {
				if (!elements.navigation) return;

				// Tear down previous observer
				if (observer) observer.disconnect();
				observer = undefined;
				observedSections = [];

				const links = Array.from(elements.navigation.querySelectorAll(CONFIG.SELECTORS.scrollSpyLinks));
				if (!links.length) return;

				const pairs = links
					.map((link) => ({ link, id: getIdFromHashLink(link.getAttribute("href") || "") }))
					.filter((x) => !!x.id);

				// Map links to actual sections present on page
				const sections = pairs
					.map((p) => document.getElementById(p.id))
					.filter(Boolean);

				if (!sections.length) return;

				observedSections = sections;

				// If URL already has a hash, set active immediately
				if (location.hash) {
					setActiveById(location.hash.slice(1));
				}

				// Intersection Observer Options
				// We want a section to become "active" when its top passes under the fixed header and
				// it occupies the top half of the viewport.
				const options = {
					root: null,
					rootMargin: `-${getHeaderOffset()}px 0px -55% 0px`,
					threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
				};

				observer = new IntersectionObserver((entries) => {
					// Pick the most visible intersecting entry
					const visible = entries
						.filter((e) => e.isIntersecting)
						.sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0));

					if (!visible.length) return;
					const top = visible[0];
					if (top?.target?.id) setActiveById(top.target.id);
				}, options);

				observedSections.forEach((section) => observer.observe(section));

				// Keep active state in sync when user clicks a hash link
				links.forEach((link) => {
					link.addEventListener(
						"click",
						() => {
							const id = getIdFromHashLink(link.getAttribute("href") || "");
							if (!id) return;
							// set immediately for responsiveness; observer will correct if needed
							setActiveById(id);
						},
						{ passive: true }
					);
				});
			};

			const destroy = () => {
				if (observer) observer.disconnect();
				observer = undefined;
				observedSections = [];
			};

			return { init, destroy };
		})();

		// Dropdown Management
		const dropdownManager = {
			close(dropdown, shouldFocus = false) {
				if (!dropdown || !dropdown.classList.contains(CONFIG.CLASSES.active)) return false;

				dropdown.classList.remove(CONFIG.CLASSES.active);
				const button = dropdown.querySelector(CONFIG.SELECTORS.dropdownToggle);
				const menu = dropdown.querySelector(CONFIG.SELECTORS.dropdownMenu);

				if (button) {
					button.setAttribute("aria-expanded", "false");
					shouldFocus && button.focus();
				}

				if (menu) {
					menu.inert = true;
				}

				return true;
			},

			toggle(element) {
				element.classList.toggle(CONFIG.CLASSES.active);
				const button = element.querySelector(CONFIG.SELECTORS.dropdownToggle);
				const menu = element.querySelector(CONFIG.SELECTORS.dropdownMenu);

				button && toggleAttribute(button, "aria-expanded");
				menu && toggleInert(menu);
			},

			closeAll() {
				if (!elements.navigation) return false;
				let closed = false;

				elements.navigation.querySelectorAll(`${CONFIG.SELECTORS.dropdown}.${CONFIG.CLASSES.active}`).forEach((dropdown) => {
					this.close(dropdown, true);
					closed = true;
				});

				return closed;
			},
		};

		// Menu Management
		const menuManager = {
			toggle() {
				if (!elements.hamburger || !elements.navigation) return;

				const isClosing = elements.navigation.classList.contains(CONFIG.CLASSES.active);

				[elements.hamburger, elements.navigation].forEach((el) => el.classList.toggle(CONFIG.CLASSES.active));
				elements.body.classList.toggle(CONFIG.CLASSES.menuOpen);
				toggleAttribute(elements.hamburger, "aria-expanded");

				// Only manage inert state on mobile devices
				if (elements.menuWrapper && isMobile()) {
					toggleInert(elements.menuWrapper);
				}

				// When closing the mobile menu, also close any open dropdowns
				isClosing && dropdownManager.closeAll();
			},
		};

		// Keyboard Management
		const keyboardManager = {
			handleEscape() {
				if (!elements.navigation) return;

				// Close any open dropdown menus first
				const dropdownsClosed = dropdownManager.closeAll();
				if (dropdownsClosed) return;

				// Then close hamburger menu if open
				if (elements.hamburger && elements.hamburger.classList.contains(CONFIG.CLASSES.active)) {
					menuManager.toggle();
					elements.hamburger.focus();
				}
			},
		};

		// Event Management
		const eventManager = {
			handleDropdownClick(event) {
				if (!isMobile()) return;

				const button = event.target.closest(CONFIG.SELECTORS.dropdownToggle);
				if (!button) return;

				event.preventDefault();
				const dropdown = button.closest(CONFIG.SELECTORS.dropdown);
				if (dropdown) {
					dropdownManager.toggle(dropdown);
				}
			},

			handleDropdownKeydown(event) {
				if (event.key !== "Enter" && event.key !== " ") return;

				const button = event.target.closest(CONFIG.SELECTORS.dropdownToggle);
				if (!button) return;

				event.preventDefault();
				const dropdown = button.closest(CONFIG.SELECTORS.dropdown);
				if (dropdown) {
					dropdownManager.toggle(dropdown);
				}
			},

			handleFocusOut(event) {
				setTimeout(() => {
					if (!event.relatedTarget) return;

					const dropdown = event.target.closest(CONFIG.SELECTORS.dropdown);
					if (dropdown?.classList.contains(CONFIG.CLASSES.active) && !dropdown.contains(event.relatedTarget)) {
						dropdownManager.close(dropdown);
					}
				}, 10);
			},

			handleMobileFocus(event) {
				if (!isMobile() || !elements.navigation.classList.contains(CONFIG.CLASSES.active)) return;
				if (elements.menuWrapper.contains(event.target) || elements.hamburger.contains(event.target)) return;

				menuManager.toggle();
			},

			handleDropdownHover(event) {
				if (isMobile()) return; // Only apply hover behavior on desktop

				const dropdown = event.target.closest(CONFIG.SELECTORS.dropdown);
				if (!dropdown) return;

				const menu = dropdown.querySelector(CONFIG.SELECTORS.dropdownMenu);
				if (!menu) return;

				if (event.type === "mouseenter") {
					menu.inert = false;
				} else if (event.type === "mouseleave") {
					// Only set inert=true if mouse is leaving the entire dropdown area
					// Use setTimeout to allow mouseleave/mouseenter events to complete
					setTimeout(() => {
						// Check if mouse is still over the dropdown or its menu
						if (!dropdown.matches(":hover")) {
							menu.inert = true;
						}
					}, 1);
				}
			},
		};

		// Initialization & Setup
		const init = {
			inertState() {
				if (!elements.menuWrapper) return;

				// On mobile, menu starts closed, so set inert=true
				// On desktop, menu is always visible, so set inert=false
				elements.menuWrapper.inert = isMobile();

				// Initialize dropdown menus - they start closed, so inert=true on all devices
				if (elements.navigation) {
					const dropdownMenus = elements.navigation.querySelectorAll(CONFIG.SELECTORS.dropdownMenu);
					dropdownMenus.forEach((dropdown) => {
						dropdown.inert = true;
					});
				}
			},

			eventListeners() {
				if (!elements.hamburger || !elements.navigation) return;

				// Hamburger menu
				elements.hamburger.addEventListener("click", menuManager.toggle);
				elements.navigation.addEventListener("click", (e) => {
					if (e.target === elements.navigation && elements.navigation.classList.contains(CONFIG.CLASSES.active)) {
						menuManager.toggle();
					}
				});

				// Dropdown delegation
				elements.navigation.addEventListener("click", eventManager.handleDropdownClick);
				elements.navigation.addEventListener("keydown", eventManager.handleDropdownKeydown);
				elements.navigation.addEventListener("focusout", eventManager.handleFocusOut);

				// Desktop hover listeners for inert management
				elements.navigation.addEventListener("mouseenter", eventManager.handleDropdownHover, true);
				elements.navigation.addEventListener("mouseleave", eventManager.handleDropdownHover, true);

				// Global events
				document.addEventListener("keydown", (e) => e.key === "Escape" && keyboardManager.handleEscape());
				document.addEventListener("focusin", eventManager.handleMobileFocus);

				// Resize handling
				window.addEventListener("resize", () => {
					this.inertState();
					scrollSpy.init();
					if (!isMobile() && elements.navigation.classList.contains(CONFIG.CLASSES.active)) {
						menuManager.toggle();
					}
				});
			},
		};

		// Initialize navigation system
		init.inertState();
		init.eventListeners();
		scrollSpy.init();

		// Re-init on view transitions swap (new DOM)
		document.addEventListener("astro:after-swap", () => {
			// refresh cached nav element reference
			elements.navigation = document.querySelector(CONFIG.SELECTORS.navigation);
			elements.menuWrapper = document.querySelector(CONFIG.SELECTORS.menuWrapper);
			scrollSpy.init();
		});
	})();
});
