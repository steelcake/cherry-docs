import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Function to extract title from content
function extractTitle(content) {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    return titleMatch ? titleMatch[1].trim() : null;
}

// Function to add frontmatter to a file
function addFrontmatter(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');

    // Skip if already has frontmatter
    if (content.startsWith('---')) {
        console.log(`Skipping ${filePath} - already has frontmatter`);
        return;
    }

    // Get title from first heading or filename
    const title = extractTitle(content) || path.basename(filePath, '.md');

    // Create frontmatter
    const frontmatter = `---
title: ${title}
description: Part of the Cherry documentation
---

${content}`;

    // Write back
    fs.writeFileSync(filePath, frontmatter);
    console.log(`Added frontmatter to ${filePath}`);
}

// Process all markdown files in pages directory
function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (file.endsWith('.md') && file !== 'SUMMARY.md') {
            addFrontmatter(filePath);
        }
    }
}

// Start processing from pages directory
processDirectory('pages'); 