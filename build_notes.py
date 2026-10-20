from pathlib import Path
import json
import re

root = Path(__file__).resolve().parent.parent
out = Path(__file__).resolve().parent / "dist" / "notes.json"
files = ["arrays_easy_combined.md", "arrays_medium_combined.md", "arrays_hard_combined.md", "sorting_algorithms_combined.md"]
notes = []

for filename in files:
    raw = (root / filename).read_text(encoding="utf-8")
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
        notes.append({
            **meta,
            "id": str(len(notes) + 1),
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
