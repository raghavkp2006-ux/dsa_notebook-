from pathlib import Path
import json
import re

root = Path(__file__).resolve().parent.parent
site_root = Path(__file__).resolve().parent
out = Path(__file__).resolve().parent / "src" / "data" / "notes.json"
baseline = Path(__file__).resolve().parent / "src" / "data" / "baseline-notes.json"
files = ["arrays_easy_combined.md", "arrays_medium_combined.md", "arrays_hard_combined.md", "sorting_algorithms_combined.md", "binary_search_1d_arrays_combined.md", "binary_search_on_answers_combined.md", "binary_search_2d_arrays_combined.md", "basic_easy_string_problems_combined.md", "medium_string_problems_combined.md", "linked_list_all_combined.md", "medium_dll_hard_ll_combined.md", "recursion_all_25_problems.md", "bit_manipulation_and_advanced_maths_combined.md", "stack_queue_all_30_problems.md", "sliding_window_medium_hard_combined.md"]
notes = []

if baseline.exists():
    for note in json.loads(baseline.read_text(encoding="utf-8")):
        if note.get("topic") in {"Arrays", "Sorting"}:
            notes.append({**note, "id": str(len(notes) + 1)})

for filename in files:
    source = root / filename
    if not source.exists():
        source = site_root / filename
    if not source.exists():
        if filename in {"arrays_easy_combined.md", "arrays_medium_combined.md", "arrays_hard_combined.md", "sorting_algorithms_combined.md"}:
            continue
        raise FileNotFoundError(source)
    raw = source.read_text(encoding="utf-8")
    for block in re.split(r"(?m)^---\s*$", raw):
        if not re.search(r"(?m)^title:", block):
            continue
        meta = dict(re.findall(r"(?m)^(title|topic|difficulty|pattern|link):\s*(.+)$", block))
        sections = {}
        for match in re.finditer(r"(?m)^## (.+)$", block):
            next_heading = re.search(r"(?m)^## .+$", block[match.end():])
            end = match.end() + next_heading.start() if next_heading else len(block)
            sections[match.group(1).strip()] = block[match.end():end].strip()
        if len(sections) != 5:
            raise ValueError(f"Unexpected sections in {meta.get('title')}")
        code_section = sections["Code"]
        code_match = re.search(r"```([^\n]*)\n(.*?)\n```", code_section, re.S)
        if not code_match:
            raise ValueError(f"Missing code in {meta['title']}")
        complexity = code_section[code_match.end():].strip()
        time = re.search(r"\*\*Time:\*\*\s*(.*?)\s*\*\*Space:", complexity)
        space = re.search(r"\*\*Space:\*\*\s*(.*)", complexity)
        subtopic = "1D Arrays" if filename == "binary_search_1d_arrays_combined.md" else "On Answers" if filename == "binary_search_on_answers_combined.md" else "2D Arrays" if filename == "binary_search_2d_arrays_combined.md" else None
        if filename == "medium_dll_hard_ll_combined.md" or meta.get("topic") == "Doubly Linked List":
            meta["topic"] = "Linked List"
            subtopic = "Doubly Linked List"
        notes.append({
            **meta,
            "id": str(len(notes) + 1),
            **({"subtopic": subtopic} if subtopic else {}),
            "problem": sections["Problem"],
            "idea": sections["Core idea"],
            "approach": sections["Approach"],
            "dryRun": sections["Dry run"],
            "language": code_match.group(1).strip() or "text",
            "code": code_match.group(2),
            "time": time.group(1).strip() if time else "—",
            "space": space.group(1).strip() if space else "—",
        })

out.parent.mkdir(exist_ok=True)
out.write_text(json.dumps(notes, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
print(f"Built {len(notes)} notes: {out}")
