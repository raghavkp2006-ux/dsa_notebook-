import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.resolve(siteRoot, '..');
const output = path.join(siteRoot, 'src', 'data', 'notes.json');
const baselinePath = path.join(siteRoot, 'src', 'data', 'baseline-notes.json');
const files = [
  'arrays_easy_combined.md', 'arrays_medium_combined.md', 'arrays_hard_combined.md',
  'sorting_algorithms_combined.md', 'binary_search_1d_arrays_combined.md',
  'binary_search_on_answers_combined.md', 'binary_search_2d_arrays_combined.md',
  'basic_easy_string_problems_combined.md', 'medium_string_problems_combined.md',
  'linked_list_all_combined.md', 'medium_dll_hard_ll_combined.md',
  'recursion_all_25_problems.md', 'bit_manipulation_and_advanced_maths_combined.md',
  'stack_queue_all_30_problems.md', 'sliding_window_medium_hard_combined.md',
];
const fallbackFiles = new Set([
  'arrays_easy_combined.md', 'arrays_medium_combined.md',
  'arrays_hard_combined.md', 'sorting_algorithms_combined.md',
]);
const notes = [];

try {
  const baseline = JSON.parse(await readFile(baselinePath, 'utf8'));
  for (const note of baseline) {
    if (note.topic === 'Arrays' || note.topic === 'Sorting') notes.push({ ...note, id: String(notes.length + 1) });
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

for (const filename of files) {
  let source = path.join(sourceRoot, filename);
  try { await readFile(source); } catch {
    source = path.join(siteRoot, filename);
    try { await readFile(source); } catch (error) {
      if (fallbackFiles.has(filename)) continue;
      throw error;
    }
  }
  const raw = await readFile(source, 'utf8');
  for (const block of raw.split(/^---\s*$/m)) {
    if (!/^title:/m.test(block)) continue;
    const meta = Object.fromEntries([...block.matchAll(/^(title|topic|difficulty|pattern|link):\s*(.+)$/gm)].map((match) => [match[1], match[2]]));
    const sections = {};
    const headings = [...block.matchAll(/^## (.+)$/gm)];
    for (let index = 0; index < headings.length; index += 1) {
      const start = headings[index].index + headings[index][0].length;
      const end = headings[index + 1]?.index ?? block.length;
      sections[headings[index][1].trim()] = block.slice(start, end).trim();
    }
    if (Object.keys(sections).length !== 5) throw new Error(`Unexpected sections in ${meta.title}`);
    const codeMatch = sections.Code.match(/```([^\n]*)\n([\s\S]*?)\n```/);
    if (!codeMatch) throw new Error(`Missing code in ${meta.title}`);
    const complexity = sections.Code.slice(codeMatch.index + codeMatch[0].length).trim();
    const time = complexity.match(/\*\*Time:\*\*\s*(.*?)\s*\*\*Space:/);
    const space = complexity.match(/\*\*Space:\*\*\s*(.*)/);
    let subtopic = filename === 'binary_search_1d_arrays_combined.md' ? '1D Arrays'
      : filename === 'binary_search_on_answers_combined.md' ? 'On Answers'
        : filename === 'binary_search_2d_arrays_combined.md' ? '2D Arrays' : null;
    if (filename === 'medium_dll_hard_ll_combined.md' || meta.topic === 'Doubly Linked List') {
      meta.topic = 'Linked List';
      subtopic = 'Doubly Linked List';
    }
    notes.push({
      ...meta,
      id: String(notes.length + 1),
      ...(subtopic ? { subtopic } : {}),
      problem: sections.Problem,
      idea: sections['Core idea'],
      approach: sections.Approach,
      dryRun: sections['Dry run'],
      language: codeMatch[1].trim() || 'text',
      code: codeMatch[2],
      time: time?.[1].trim() || '—',
      space: space?.[1].trim() || '—',
    });
  }
}

await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, JSON.stringify(notes));
console.log(`Built ${notes.length} notes: ${output}`);
