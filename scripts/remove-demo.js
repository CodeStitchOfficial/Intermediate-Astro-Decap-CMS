import { promises as fs } from "fs";
import { join } from "path";
import readline from "readline";
import { collectFiles } from "./utils/collect-files.js";
import { replaceInFiles } from "./utils/replace-in-files.js";

// Marker file to prevent re-running
const markerPath = join(".demo-removed");

// Destination directory for moved files
const destinationDir = join("scripts", "deleted");

// Demo page paths
const demoPagesPath = join("src", "pages");
const demoPages = ["about.astro", "contact.astro", "reviews.astro", "projects.astro"];
const projectsPath = join("src", "pages", "projects");

// Demo component paths
const componentsPath = join("src", "components");
const demoComponents = ["Footer", "Hero", "Services", "Gallery", "SideBySide", "SideBySideReverse", "Testimonials", "FAQ", "Reviews", "CTA", "Banner"];

// Image paths
const imagesPath = join("src", "assets", "images");
const placeholderImage = "placeholder.jpg";

// Icon paths
const iconsPath = join("src", "icons");
const demoIcons = ["check.svg", "content-circles.svg", "cta-squares.svg", "service1.svg", "service2.svg", "service3.svg", "stars.svg"];

// Data files
const navDataPath = join("src", "data", "navData.json");

/**
 * Check if marker file exists (script already ran)
 */
async function checkMarkerFile() {
	try {
		await fs.access(markerPath);
		return true;
	} catch {
		return false;
	}
}

/**
 * Create marker file to prevent re-running
 */
async function createMarkerFile() {
	try {
		await fs.writeFile(markerPath, `Demo content removed on ${new Date().toISOString()}\n`, "utf-8");
		console.log("Created .demo-removed marker file");
	} catch (error) {
		console.error(`Error creating marker file: ${error.message}`);
	}
}

/**
 * Move demo pages to deleted folder
 */
async function moveDemoPages() {
	const pagesDestination = join(destinationDir, "pages-demo");
	await fs.mkdir(pagesDestination, { recursive: true });

	let movedCount = 0;

	// Move individual demo pages
	for (const page of demoPages) {
		const sourcePath = join(demoPagesPath, page);
		const destPath = join(pagesDestination, page);

		try {
			await fs.access(sourcePath);

			// Remove destination if exists
			try {
				await fs.rm(destPath, { force: true });
			} catch {}

			await fs.rename(sourcePath, destPath);
			console.log(`Moved ${sourcePath} to ${destPath}`);
			movedCount++;
		} catch (error) {
			if (error.code !== "ENOENT") {
				console.error(`Error moving ${sourcePath}: ${error.message}`);
			}
		}
	}

	// Move projects folder
	try {
		await fs.access(projectsPath);

		const projectsDestination = join(pagesDestination, "projects");

		// Remove destination if exists
		try {
			await fs.rm(projectsDestination, { recursive: true, force: true });
		} catch {}

		await fs.rename(projectsPath, projectsDestination);
		console.log(`Moved ${projectsPath} to ${projectsDestination}`);
		movedCount++;
	} catch (error) {
		if (error.code !== "ENOENT") {
			console.error(`Error moving ${projectsPath}: ${error.message}`);
		}
	}

	return movedCount;
}

/**
 * Move demo components to deleted folder
 */
async function moveDemoComponents() {
	const componentsDestination = join(destinationDir, "components-demo");
	await fs.mkdir(componentsDestination, { recursive: true });

	let movedCount = 0;

	for (const component of demoComponents) {
		const sourcePath = join(componentsPath, component);
		const destPath = join(componentsDestination, component);

		try {
			await fs.access(sourcePath);

			// Remove destination if exists
			try {
				await fs.rm(destPath, { recursive: true, force: true });
			} catch {}

			await fs.rename(sourcePath, destPath);
			console.log(`Moved ${sourcePath} to ${destPath}`);
			movedCount++;
		} catch (error) {
			if (error.code !== "ENOENT") {
				console.error(`Error moving ${sourcePath}: ${error.message}`);
			}
		}
	}

	return movedCount;
}

/**
 * Move demo images (keep placeholder.jpg)
 */
async function moveDemoImages() {
	const imagesDestination = join(destinationDir, "images-demo");
	await fs.mkdir(imagesDestination, { recursive: true });

	let movedCount = 0;

	try {
		// Read all items in images directory
		const items = await fs.readdir(imagesPath, { withFileTypes: true });

		for (const item of items) {
			// Skip placeholder.jpg and blog folder
			if (item.name === placeholderImage || item.name === "blog") {
				continue;
			}

			const sourcePath = join(imagesPath, item.name);
			const destPath = join(imagesDestination, item.name);

			try {
				// Remove destination if exists
				try {
					await fs.rm(destPath, { recursive: true, force: true });
				} catch {}

				await fs.rename(sourcePath, destPath);
				console.log(`Moved ${sourcePath} to ${destPath}`);
				movedCount++;
			} catch (error) {
				console.error(`Error moving ${sourcePath}: ${error.message}`);
			}
		}
	} catch (error) {
		console.error(`Error reading images directory: ${error.message}`);
	}

	return movedCount;
}

/**
 * Move demo icons to deleted folder
 */
async function moveDemoIcons() {
	const iconsDestination = join(destinationDir, "icons-demo");
	await fs.mkdir(iconsDestination, { recursive: true });

	let movedCount = 0;

	for (const icon of demoIcons) {
		const sourcePath = join(iconsPath, icon);
		const destPath = join(iconsDestination, icon);

		try {
			await fs.access(sourcePath);

			// Remove destination if exists
			try {
				await fs.rm(destPath, { force: true });
			} catch {}

			await fs.rename(sourcePath, destPath);
			console.log(`Moved ${sourcePath} to ${destPath}`);
			movedCount++;
		} catch (error) {
			if (error.code !== "ENOENT") {
				console.error(`Error moving ${sourcePath}: ${error.message}`);
			}
		}
	}

	return movedCount;
}

/**
 * Update navData.json to only contain Home entry
 */
async function updateNavData() {
	try {
		await fs.access(navDataPath);

		const content = await fs.readFile(navDataPath, "utf-8");
		const navData = JSON.parse(content);

		// Keep only the Home entry
		const homeEntry = navData.find((item) => item.key === "Home" || item.url === "/");

		const newNavData = homeEntry ? [homeEntry] : [{ key: "Home", url: "/" }];

		// Write back the updated JSON with proper formatting
		await fs.writeFile(navDataPath, JSON.stringify(newNavData, null, 2) + "\n", "utf-8");
		console.log("Updated navData.json (kept only Home entry)");
	} catch (error) {
		console.error(`Error updating navData.json: ${error.message}`);
	}
}

/**
 * Remove Banner and CTA component usage from pages before deleting components
 */
async function removeComponentUsageFromPages() {
	console.log("\nRemoving demo component usage from pages...");

	// Update index.astro (before simplifyIndexPage() rewrites it)
	const indexPath = join("src", "pages", "index.astro");
	try {
		await fs.access(indexPath);

		let content = await fs.readFile(indexPath, "utf-8");

		content = content.replace(/import\s+CTASimple\s+from\s+["']@components\/CTA\/CTASimple\.astro["'];?\n?/g, "");
		content = content.replace(/import\s+CTAArtDirection\s+from\s+["']@components\/CTA\/CTAArtDirection\.astro["'];?\n?/g, "");
		content = content.replace(/<CTASimple\s*\/>/g, "");
		content = content.replace(/<!--\s*<CTAArtDirection\s*\/>\s*-->/g, "");

		await fs.writeFile(indexPath, content, "utf-8");
		console.log("Updated index.astro");
	} catch (error) {
		if (error.code !== "ENOENT") {
			console.error(`Error updating index.astro: ${error.message}`);
		}
	}

	// Update BlogPostLayout.astro
	const blogPostLayoutPath = join("src", "layouts", "BlogPostLayout.astro");
	try {
		await fs.access(blogPostLayoutPath);

		let content = await fs.readFile(blogPostLayoutPath, "utf-8");
		content = content.replace(/import\s+CTA\s+from\s+["']@components\/CTA\/CTASimple\.astro["'];?\n?/g, "");
		content = content.replace(/<CTA\s*\/>/g, "");

		await fs.writeFile(blogPostLayoutPath, content, "utf-8");
		console.log("Updated BlogPostLayout.astro");
	} catch (error) {
		if (error.code !== "ENOENT") {
			console.error(`Error updating BlogPostLayout.astro: ${error.message}`);
		}
	}

	// Update blog/index.astro
	const blogIndexPath = join("src", "pages", "blog", "index.astro");
	try {
		await fs.access(blogIndexPath);
		let content = await fs.readFile(blogIndexPath, "utf-8");

		content = content.replace(/import\s+Banner\s+from\s+["']@components\/Banner\/Banner\.astro["'];?\n?/g, "");
		content = content.replace(/import\s+CTA\s+from\s+["']@components\/CTA\/CTASimple\.astro["'];?\n?/g, "");
		content = content.replace(/<Banner\s+title="Blog"\s+image=\{placeholderOptimizedImage\}\s*\/>/g, "");
		content = content.replace(/<CTA\s*\/>/g, "");

		await fs.writeFile(blogIndexPath, content, "utf-8");
		console.log("Updated blog/index.astro");
	} catch (error) {
		if (error.code !== "ENOENT") {
			console.error(`Error updating blog/index.astro: ${error.message}`);
		}
	}
}

/**
 * Clean up demo component imports
 */
async function cleanupDemoImports() {
	console.log("\nCleaning up demo component imports...");

	const srcDir = join(process.cwd(), "src");

	try {
		// Create regex patterns for all demo components
		const importPatterns = demoComponents.map((component) => `import\\s+.*\\s+from\\s+[\"'].*\\/components\\/${component}.*[\"'];?\\n?`);

		for (const pattern of importPatterns) {
			replaceInFiles(srcDir, pattern, "", false);
		}

		console.log("Cleaned up demo component imports");
	} catch (error) {
		console.error(`Error cleaning up imports: ${error.message}`);
	}
}

/**
 * Simplify index.astro to minimal welcome page
 */
async function simplifyIndexPage() {
	const indexPath = join("src", "pages", "index.astro");

	try {
		await fs.access(indexPath);

		const simplifiedContent = `---
// Utils
import { getImage } from "astro:assets";

// Components
import BaseLayout from "@layouts/BaseLayout.astro";

// Images
import placeholderImg from "@assets/images/placeholder.jpg";

const optimizedPlaceholder = await getImage({ src: placeholderImg, format: "webp" });
---

<BaseLayout
	title="Welcome"
	description="Your new Astro site"
	heroImage={optimizedPlaceholder}
>
	<main id="main">
		<section id="welcome">
			<div class="cs-container">
				<div class="cs-content">
					<h1>Welcome to Your Astro Site</h1>
					<p>
						This template has been stripped to bare minimum. All demo content has been
						moved to <code>scripts/deleted/</code> and can be safely deleted.
					</p>
					<p>
						Get started by reading the
						<a href="https://github.com/yourusername/yourrepo#getting-started">
							Getting Started
						</a>
						section in the README.
					</p>
				</div>
			</div>
		</section>
	</main>
</BaseLayout>

<style lang="less">
	#welcome {
		padding: 100px 16px;

		.cs-container {
			max-width: 1280px;
			margin: 0 auto;
		}

		.cs-content {
			max-width: 800px;
			margin: 0 auto;
			text-align: center;

			h1 {
				margin-bottom: 24px;
				font-size: clamp(2rem, 5vw, 3rem);
			}

			p {
				margin-bottom: 16px;
				font-size: 1.125rem;
				line-height: 1.6;
			}

			code {
				padding: 2px 8px;
				background: #f4f4f4;
				border-radius: 4px;
				font-family: monospace;
			}

			a {
				color: var(--primary);
				text-decoration: underline;

				&:hover {
					opacity: 0.8;
				}
			}
		}
	}

	/* Dark mode */
	@media only screen and (prefers-color-scheme: dark) {
		#welcome {
			.cs-content {
				code {
					background: #2a2a2a;
				}
			}
		}
	}

	body.dark-mode {
		#welcome {
			.cs-content {
				code {
					background: #2a2a2a;
				}
			}
		}
	}
</style>
`;

		await fs.writeFile(indexPath, simplifiedContent, "utf-8");
		console.log("Simplified index.astro");
	} catch (error) {
		console.error(`Error simplifying index.astro: ${error.message}`);
	}
}

/**
 * Main function to remove demo content
 */
async function removeDemoContent() {
	// Check marker file
	const alreadyRan = await checkMarkerFile();
	if (alreadyRan) {
		console.log("Demo content has already been removed. Skipping.");
		console.log("Delete .demo-removed marker file to run again (not recommended).");
		process.exit(0);
	}

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	// Confirmation prompt
	const userConfirmed = await new Promise((resolve) => {
		rl.question("This will remove all demo content and strip the template to bare minimum. Continue? (y/n): ", (answer) => {
			rl.close();
			resolve(answer.toLowerCase() === "y");
		});
	});

	if (!userConfirmed) {
		console.log("Operation cancelled.");
		process.exit(0);
	}

	console.log();

	try {
		// Create destination directory
		await fs.mkdir(destinationDir, { recursive: true });
		console.log(`Created directory ${destinationDir}\n`);

		// Run cleaning up functions and move files
		await simplifyIndexPage();
		await updateNavData();
		await removeComponentUsageFromPages();

		const movedPages = await moveDemoPages();
		console.log(`\nMoved ${movedPages} demo page(s)`);

		const movedComponents = await moveDemoComponents();
		console.log(`Moved ${movedComponents} demo component(s)`);

		const movedImages = await moveDemoImages();
		console.log(`Moved ${movedImages} demo image(s) and folder(s)`);

		const movedIcons = await moveDemoIcons();
		console.log(`Moved ${movedIcons} demo icon(s)`);

		await cleanupDemoImports();
		await createMarkerFile();

		console.log("\n...done!\n");
		console.log("=================================================");
		console.log(" Successfully removed demo content");
		console.log("=================================================\n");

		console.log("Next steps:");
		console.log("- Review removed files in scripts/deleted/");
		console.log("- Run 'npm run dev' to start building");
		console.log("- To remove blog/Decap CMS: 'npm run remove-decap'\n");
	} catch (error) {
		console.error(`\n✗ Error during removal: ${error.message}`);
		process.exit(1);
	}
}

removeDemoContent();
