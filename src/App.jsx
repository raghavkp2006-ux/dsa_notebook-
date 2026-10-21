import React, { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { Linking } from 'react-native';
import notes from './data/notes.json';

const topicInfo = {
  Arrays: ['From linear scans to intervals and matrix traversal.', '[]'],
  Sorting: ['Compare, partition, merge, and build intuition.', '↕'],
  'Binary Search': ['Find values, bounds, and turning points in sorted data.', '⌕'],
  Strings: ['Practice string transformations, frequency counting, and matching.', 'Aa'],
  'Linked List': ['Build confidence with node links and pointer updates.', '↔'],
  Recursion: ['Solve problems through smaller steps and base cases.', '↻'],
  'Bit Manipulation': ['Reason about binary representations and bitwise operations.', '01'],
  'Advanced Maths': ['Use number theory and mathematical tools to solve problems.', 'π'],
  'Stack and Queue': ['Master LIFO, FIFO, monotonic stacks, and expression conversion.', '⇄'],
  'Sliding Window': ['Track a moving range to solve substring and subarray problems.', '▣'],
};
const slug = (value = '') => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const titleCase = (value = '') => value.replace(/(^|-)([a-z])/g, (_, sep, char) => `${sep ? ' ' : ''}${char.toUpperCase()}`);
const patternList = [...new Set(notes.map((note) => note.pattern))].sort((a, b) => a.localeCompare(b));
const inlineStyles = StyleSheet.create({ inlineCode: { fontFamily: 'monospace', fontSize: 12, color: '#e11900' }, strong: { fontWeight: '700' } });
const allTopics = [...new Set(notes.map((note) => note.topic))];
const readProgress = () => {
  try { return JSON.parse(localStorage.getItem('dsa-progress') || '{}'); } catch { return {}; }
};
const readTheme = () => {
  try { return localStorage.getItem('dsa-theme') === 'dark'; } catch { return false; }
};

function InlineText({ children, style }) {
  const parts = String(children ?? '').split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean);
  return <Text style={style}>{parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) return <Text key={index} style={inlineStyles.inlineCode}>{part.slice(1, -1)}</Text>;
    if (part.startsWith('**') && part.endsWith('**')) return <Text key={index} style={inlineStyles.strong}>{part.slice(2, -2)}</Text>;
    return <Text key={index}>{part}</Text>;
  })}</Text>;
}

function Markdown({ value, S }) {
  const lines = String(value || '').split('\n');
  const blocks = [];
  for (let i = 0; i < lines.length;) {
    const line = lines[i].trim();
    if (!line) { i += 1; continue; }
    if (line.startsWith('|') && lines[i + 1]?.trim().match(/^\|?\s*[-:| ]+\s*\|?$/)) {
      const cells = (row) => row.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
      const header = cells(line);
      const rows = [];
      i += 2;
      while (lines[i]?.trim().startsWith('|')) { rows.push(cells(lines[i])); i += 1; }
      blocks.push(<ScrollView key={`table-${i}`} horizontal style={S.tableScroll}><View style={S.table}>
        <View style={[S.tableRow, S.tableHeader]}>{header.map((cell, idx) => <View key={idx} style={S.tableCell}><InlineText style={S.tableHeadText}>{cell}</InlineText></View>)}</View>
        {rows.map((row, ridx) => <View key={ridx} style={S.tableRow}>{row.map((cell, idx) => <View key={idx} style={S.tableCell}><InlineText style={S.bodyText}>{cell}</InlineText></View>)}</View>)}
      </View></ScrollView>);
      continue;
    }
    const ordered = line.match(/^\d+\.\s+(.+)$/);
    const unordered = line.match(/^[-*]\s+(.+)$/);
    if (ordered || unordered) {
      const orderedList = Boolean(ordered);
      const items = [];
      while (i < lines.length) {
        const candidate = lines[i].trim();
        const match = orderedList ? candidate.match(/^\d+\.\s+(.+)$/) : candidate.match(/^[-*]\s+(.+)$/);
        if (!match) break;
        items.push(match[1]); i += 1;
      }
      blocks.push(<View key={`list-${i}`} style={S.markdownList}>{items.map((item, idx) => <View key={idx} style={S.listRow}><Text style={S.listBullet}>{orderedList ? `${idx + 1}.` : '•'}</Text><InlineText style={S.bodyText}>{item}</InlineText></View>)}</View>);
      continue;
    }
    blocks.push(<InlineText key={`p-${i}`} style={S.bodyText}>{line}</InlineText>);
    i += 1;
  }
  return <View style={S.markdown}>{blocks}</View>;
}

function App() {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || '/');
  const [progress, setProgress] = useState(readProgress);
  const [dark, setDark] = useState(readTheme);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState('');
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPattern, setSelectedPattern] = useState('All');
  const { width } = useWindowDimensions();
  const mobile = width < 820;
  const S = useMemo(() => makeStyles(dark, width), [dark, width]);
  const revisedCount = notes.filter((note) => progress[note.id]?.status === 'revised').length;
  const currentRoute = route.split('?')[0];

  useEffect(() => {
    const update = () => { setRoute(window.location.hash.slice(1) || '/'); setMobileMenu(false); };
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    try { localStorage.setItem('dsa-progress', JSON.stringify(progress)); } catch { /* storage may be unavailable */ }
  }, [progress]);
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true); }
      if (event.key === 'Escape') { setSearchOpen(false); setMobileMenu(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (path) => { window.location.hash = path; setRoute(path); setMobileMenu(false); setSearchOpen(false); };
  const patchProgress = (note, status) => {
    setProgress((current) => ({ ...current, [note.id]: { ...current[note.id], status, lastRevised: status === 'revised' ? Date.now() : null } }));
    setToast(status === 'revised' ? 'Marked as revised ✓' : status === 'needs' ? 'Added to revision queue' : 'Progress updated');
  };
  const flipTheme = () => setDark((value) => { const next = !value; try { localStorage.setItem('dsa-theme', next ? 'dark' : 'light'); } catch { /* ignore */ } return next; });
  const topicFromSlug = (topicSlug) => allTopics.find((topic) => slug(topic) === topicSlug);

  const routeParts = currentRoute.split('/').filter(Boolean);
  let screen;
  if (!routeParts.length) screen = <HomeScreen S={S} go={go} progress={progress} revisedCount={revisedCount} />;
  else if (routeParts[0] === 'topics' && routeParts.length === 1) screen = <TopicIndex S={S} go={go} progress={progress} />;
  else if (routeParts[0] === 'topics' && routeParts[1]) {
    const topic = topicFromSlug(routeParts[1]);
    screen = topic ? <TopicScreen S={S} go={go} topic={topic} subgroup={routeParts[2]} progress={progress} query={query} setQuery={setQuery} difficulty={difficulty} setDifficulty={setDifficulty} statusFilter={statusFilter} setStatusFilter={setStatusFilter} patchProgress={patchProgress} /> : <NotFound S={S} go={go} />;
  } else if (routeParts[0] === 'problem' && routeParts[1]) {
    screen = <ProblemScreen S={S} go={go} note={notes.find((item) => item.id === routeParts[1])} progress={progress} patchProgress={patchProgress} />;
  } else if (routeParts[0] === 'patterns') {
    screen = <PatternScreen S={S} go={go} pattern={routeParts[1] ? decodeURIComponent(routeParts[1]) : null} progress={progress} patchProgress={patchProgress} />;
  } else if (routeParts[0] === 'revise') screen = <RevisionScreen S={S} go={go} progress={progress} patchProgress={patchProgress} />;
  else if (routeParts[0] === 'all') screen = <AllProblemsScreen S={S} go={go} progress={progress} patchProgress={patchProgress} query={query} setQuery={setQuery} difficulty={difficulty} setDifficulty={setDifficulty} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />;
  else screen = <NotFound S={S} go={go} />;

  const topics = allTopics.map((topic) => ({ topic, count: notes.filter((note) => note.topic === topic).length }));
  const searched = search.trim() ? notes.filter((note) => `${note.title} ${note.topic} ${note.pattern}`.toLowerCase().includes(search.toLowerCase())).slice(0, 8) : [];
  const Sidebar = <View style={S.sidebar}>
    <Text style={S.sidebarLabel}>YOUR NOTES</Text>
    {topics.map(({ topic, count }, index) => <Pressable key={topic} onPress={() => go(`/topics/${slug(topic)}`)} style={({ pressed }) => [S.sideLink, currentRoute.startsWith(`/topics/${slug(topic)}`) && S.sideLinkActive, pressed && S.pressed]}>
      <Text style={S.sideNumber}>{String(index + 1).padStart(2, '0')}</Text><Text numberOfLines={1} style={S.sideName}>{topic}</Text><Text style={S.sideCount}>{progressCount(topic, progress)}/{count}</Text>
    </Pressable>)}
    <View style={S.sideDivider} />
    <Pressable onPress={() => go('/patterns')} style={S.sideSecondary}><Text style={S.sideSecondaryText}>Browse patterns</Text><Text style={S.sideArrow}>↗</Text></Pressable>
    <Pressable onPress={() => go('/revise')} style={S.sideSecondary}><Text style={S.sideSecondaryText}>Revision queue</Text><Text style={S.sideArrow}>↗</Text></Pressable>
  </View>;

  return <SafeAreaView style={S.root}>
    <View style={S.header}>
      <Pressable onPress={() => go('/')} style={S.brand}><View style={S.brandMark}><Text style={S.brandMarkText}>D</Text></View><Text style={S.brandText}>DSA Notebook</Text></Pressable>
      {!mobile && <View style={S.headerNav}>
        <HeaderLink label="Topics" onPress={() => go('/topics')} S={S} active={currentRoute.startsWith('/topics')} />
        <HeaderLink label="Patterns" onPress={() => go('/patterns')} S={S} active={currentRoute.startsWith('/patterns')} />
        <HeaderLink label="Revise" onPress={() => go('/revise')} S={S} active={currentRoute === '/revise'} />
      </View>}
      <View style={S.headerActions}>
        <Pressable accessibilityLabel="Search problems" onPress={() => setSearchOpen(true)} style={S.headerIcon}><Text style={S.headerIconText}>⌕</Text></Pressable>
        <Pressable accessibilityLabel="Toggle appearance" onPress={flipTheme} style={S.headerIcon}><Text style={S.headerIconText}>{dark ? '☼' : '◐'}</Text></Pressable>
        {mobile && <Pressable accessibilityLabel="Open topic menu" onPress={() => setMobileMenu((value) => !value)} style={S.headerIcon}><Text style={S.headerIconText}>☰</Text></Pressable>}
      </View>
    </View>
    <View style={S.body}>
      {!mobile && Sidebar}
      {mobile && mobileMenu && <View style={S.mobileDrawer}>{Sidebar}</View>}
      <ScrollView style={S.mainScroll} contentContainerStyle={S.mainScrollContent} keyboardShouldPersistTaps="handled">{screen}</ScrollView>
    </View>
    {searchOpen && <View style={S.modalBackdrop}>
      <Pressable style={S.backdropTap} onPress={() => setSearchOpen(false)} />
      <View style={S.searchDialog}>
        <View style={S.searchBar}><Text style={S.searchGlyph}>⌕</Text><TextInput autoFocus value={search} onChangeText={setSearch} placeholder="Search problems or patterns…" placeholderTextColor={S.muted.color} style={S.searchInput} />
          <Pressable onPress={() => setSearchOpen(false)} style={S.escButton}><Text style={S.escText}>Esc</Text></Pressable></View>
        {searched.length > 0 && <ScrollView style={S.searchResults}>{searched.map((note) => <Pressable key={note.id} onPress={() => go(`/problem/${note.id}`)} style={S.searchResult}><View style={S.flexOne}><Text style={S.searchResultTitle}>{note.title}</Text><Text style={S.searchResultMeta}>{note.topic} · {note.pattern}</Text></View><Difficulty value={note.difficulty} S={S} /></Pressable>)}</ScrollView>}
        {search && searched.length === 0 && <Text style={S.emptySearch}>No matching problems.</Text>}
        <Text style={S.searchHint}>Esc to close · Search {notes.length} notes</Text>
      </View>
    </View>}
    {!!toast && <View style={S.toast}><Text style={S.toastText}>{toast}</Text></View>}
  </SafeAreaView>;
}

function HeaderLink({ label, onPress, S, active }) { return <Pressable onPress={onPress} style={S.headerNavLink}><Text style={[S.headerNavText, active && S.headerNavActive]}>{label}</Text></Pressable>; }

function HomeScreen({ S, go, progress, revisedCount }) {
  const pct = Math.round((revisedCount / notes.length) * 100);
  const visibleTopics = allTopics.filter((topic) => topicInfo[topic]);
  return <View style={S.page}>
    <View style={S.hero}>
      <View style={S.heroCopy}>
        <Text style={S.eyebrow}>DSA DIGITAL NOTEBOOK</Text>
        <Text style={S.heroTitle}>Make revision{'\n'}feel simple.</Text>
        <Text style={S.heroSub}>A calm place to revisit DSA problems.</Text>
        <View style={S.heroActions}><ActionButton label="Start revising ↗" onPress={() => go('/revise')} S={S} /><ActionButton label="Browse all problems ›" secondary onPress={() => go('/all')} S={S} /></View>
      </View>
      <View style={S.heroVisual}><View style={S.heroVisualTop}><Text style={S.heroVisualLabel}>Linear scan · find the maximum</Text><Text style={S.heroVisualLabel}>O(n)</Text></View><View style={S.arrayVisual}>{['3','2','1','5','4'].map((num, i) => <View key={i} style={[S.arrayCell, i === 3 && S.arrayCellActive]}><Text style={[S.arrayCellText, i === 3 && S.arrayCellTextActive]}>{num}</Text></View>)}</View><Text style={S.heroVisualFoot}>max = 5 · scan once, remember the best</Text></View>
    </View>
    <View style={S.statsRow}>{[[notes.length, 'Problems'], [visibleTopics.length, 'Topics'], [patternList.length, 'Patterns'], [`${pct}%`, 'Revised']].map(([number, label]) => <View key={label} style={S.stat}><Text style={S.statNumber}>{number}</Text><Text style={S.statLabel}>{label}</Text></View>)}</View>
    <SectionHeading eyebrow="YOUR LIBRARY" title="Find your focus." subtitle="Choose a topic, then work from the question to the core idea." action="All problems ›" onAction={() => go('/all')} S={S} />
    <View style={S.cardGrid}>{visibleTopics.map((topic) => <TopicCard key={topic} topic={topic} go={go} progress={progress} S={S} />)}</View>
    <SectionHeading eyebrow="THINK IN PATTERNS" title="Recognize the move." subtitle="Practice the underlying technique across problems." action="Explore patterns ›" onAction={() => go('/patterns')} S={S} />
    <View style={S.chipWrap}>{patternList.slice(0, 12).map((pattern) => <Chip key={pattern} label={pattern} onPress={() => go(`/patterns/${encodeURIComponent(pattern)}`)} S={S} />)}</View>
  </View>;
}

function SectionHeading({ eyebrow, title, subtitle, action, onAction, S }) { return <View style={S.sectionHeading}><View style={S.flexOne}><Text style={S.eyebrow}>{eyebrow}</Text><Text style={S.sectionTitle}>{title}</Text>{subtitle && <Text style={S.sectionSub}>{subtitle}</Text>}</View>{action && <Pressable onPress={onAction}><Text style={S.textLink}>{action}</Text></Pressable>}</View>; }
function TopicCard({ topic, go, progress, S }) {
  const [description, icon] = topicInfo[topic] || ['', '•'];
  const list = notes.filter((note) => note.topic === topic);
  const revised = list.filter((note) => progress[note.id]?.status === 'revised').length;
  return <Pressable onPress={() => go(`/topics/${slug(topic)}`)} style={({ pressed }) => [S.topicCard, pressed && S.cardPressed]}>
    <View style={S.topicCardTop}><View style={S.topicIcon}><Text style={S.topicIconText}>{icon}</Text></View><Text style={S.cardArrow}>↗</Text></View>
    <Text style={S.topicTitle}>{topic}</Text><Text style={S.topicDescription}>{description}</Text>
    <View style={S.topicCardBottom}><Text style={S.topicCount}>{list.length} problems · {revised} revised</Text></View><ProgressTrack value={revised} total={list.length} S={S} />
  </Pressable>;
}
function ProgressTrack({ value, total, S }) { return <View style={S.progressTrack}><View style={[S.progressFill, { width: `${total ? Math.round((value / total) * 100) : 0}%` }]} /></View>; }
function TopicIndex({ S, go, progress }) { return <View style={S.page}><Text style={S.eyebrow}>YOUR LIBRARY</Text><Text style={S.pageTitle}>Explore topics.</Text><Text style={S.pageSub}>Choose a subject and keep your revision moving.</Text><View style={S.cardGrid}>{allTopics.map((topic) => <TopicCard key={topic} topic={topic} go={go} progress={progress} S={S} />)}</View></View>; }

function topicGroups(topic) {
  const list = notes.filter((note) => note.topic === topic);
  if (topic === 'Binary Search') return [
    ['BS on 1D Arrays', list.filter((note) => note.subtopic === '1D Arrays'), '1d-arrays'],
    ['BS on Answers', list.filter((note) => note.subtopic === 'On Answers'), 'answers'],
    ['BS on 2D Arrays', list.filter((note) => note.subtopic === '2D Arrays'), '2d-arrays'],
  ].filter(([, entries]) => entries.length);
  if (topic === 'Linked List') return [
    ['Linked List basics', list.filter((note) => !note.subtopic), 'general'],
    ['Doubly Linked List', list.filter((note) => note.subtopic === 'Doubly Linked List'), 'doubly-linked-list'],
  ].filter(([, entries]) => entries.length);
  return ['Easy','Medium','Hard'].map((difficulty) => [difficulty, list.filter((note) => note.difficulty === difficulty), difficulty.toLowerCase()]).filter(([, entries]) => entries.length);
}
function TopicScreen({ S, go, topic, subgroup, progress, query, setQuery, difficulty, setDifficulty, statusFilter, setStatusFilter, patchProgress }) {
  const groups = topicGroups(topic);
  const activeGroup = subgroup ? groups.find((group) => group[2] === subgroup || group[0].toLowerCase() === subgroup) : null;
  const visibleGroups = activeGroup ? [[activeGroup[0], activeGroup[1]]] : groups.map(([name, list]) => [name, list]);
  const all = visibleGroups.flatMap(([, list]) => list);
  const filtered = all.filter((note) => (!query || `${note.title} ${note.pattern}`.toLowerCase().includes(query.toLowerCase()))
    && (difficulty === 'All' || note.difficulty === difficulty)
    && (statusFilter === 'All' || (statusFilter === 'Done' ? progress[note.id]?.status === 'revised' : progress[note.id]?.status !== 'revised')));
  const done = all.filter((note) => progress[note.id]?.status === 'revised').length;
  const title = subgroup ? `${topic} · ${activeGroup?.[0] || titleCase(subgroup)}` : topic;
  return <View style={S.page}>
    <View style={S.breadcrumb}><Text style={S.breadcrumbText}>DSA Notebook</Text><Text style={S.breadcrumbSep}>›</Text><Text style={S.breadcrumbText}>Topics</Text>{subgroup && <><Text style={S.breadcrumbSep}>›</Text><Text style={S.breadcrumbText}>{activeGroup?.[0]}</Text></>}</View>
    <Text style={S.eyebrow}>PROBLEM SHEET</Text><Text style={S.pageTitle}>{title}</Text><Text style={S.pageSub}>{topic === 'Binary Search' && subgroup === 'answers' ? 'Search for the smallest valid answer, maximum capacity, or minimum feasible limit.' : topic === 'Binary Search' && subgroup === '2d-arrays' ? 'Search sorted rows and columns with binary search.' : topicInfo[topic]?.[0]}</Text>
    <View style={S.progressPanel}><View style={S.progressTop}><View style={S.progressCount}><Text style={S.progressNumber}>{done}</Text><Text style={S.progressLabel}>of {all.length} revised</Text></View><View style={S.difficultySummary}>{['Easy','Medium','Hard'].map((d) => <Text key={d} style={S.difficultySummaryText}>{d}: {all.filter((note) => note.difficulty === d && progress[note.id]?.status === 'revised').length}/{all.filter((note) => note.difficulty === d).length}</Text>)}</View></View><ProgressTrack value={done} total={all.length} S={S} /></View>
    {!subgroup && groups.length > 1 && <View style={S.chipWrap}>{groups.map(([name,,key]) => <Chip key={key} label={name} onPress={() => go(`/topics/${slug(topic)}/${key}`)} S={S} />)}</View>}
    <View style={S.controls}><TextInput value={query} onChangeText={setQuery} placeholder={`Search within ${topic}…`} placeholderTextColor={S.muted.color} style={S.searchField} /><View style={S.filterBar}><Segment options={['All','Easy','Medium','Hard']} value={difficulty} onChange={setDifficulty} S={S} /><Segment options={['All','Not done','Done']} value={statusFilter} onChange={setStatusFilter} S={S} /></View></View>
    {visibleGroups.map(([name, list]) => {
      const visible = list.filter((note) => filtered.includes(note));
      if (!visible.length) return null;
      return <View key={name} style={S.problemGroup}><View style={S.groupHead}><Text style={S.groupTitle}>{name}</Text><Text style={S.groupCount}>{list.filter((note) => progress[note.id]?.status === 'revised').length} / {list.length} revised</Text></View>{visible.map((note) => <ProblemRow key={note.id} note={note} go={go} progress={progress} patchProgress={patchProgress} S={S} />)}</View>;
    })}
    {!filtered.length && <Empty S={S} text="No problems match these filters." />}
  </View>;
}

function Segment({ options, value, onChange, S }) { return <View style={S.segmentGroup}>{options.map((option) => <Pressable key={option} onPress={() => onChange(option)} style={[S.segment, value === option && S.segmentActive]}><Text style={[S.segmentText, value === option && S.segmentTextActive]}>{option}</Text></Pressable>)}</View>; }
function Chip({ label, onPress, S, active = false }) { return <Pressable onPress={onPress} style={[S.chip, active && S.chipActive]}><Text style={[S.chipText, active && S.chipTextActive]}>{label}</Text></Pressable>; }
function Difficulty({ value, S }) { return <View style={[S.badge, value === 'Easy' ? S.badgeEasy : value === 'Medium' ? S.badgeMedium : S.badgeHard]}><Text style={[S.badgeText, value === 'Easy' ? S.badgeEasyText : value === 'Medium' ? S.badgeMediumText : S.badgeHardText]}>{value}</Text></View>; }
function ProblemRow({ note, go, progress, patchProgress, S }) {
  const status = progress[note.id]?.status || 'not-started';
  return <View style={S.problemRow}>
    <Pressable onPress={() => patchProgress(note, status === 'revised' ? 'not-started' : 'revised')} style={[S.check, status === 'revised' && S.checkDone]}><Text style={S.checkText}>{status === 'revised' ? '✓' : ''}</Text></Pressable>
    <Pressable onPress={() => go(`/problem/${note.id}`)} style={S.problemMain}><Text numberOfLines={1} style={[S.problemTitle, status === 'revised' && S.problemDone]}>{note.title}</Text><Text numberOfLines={1} style={S.problemMeta}>{note.pattern}</Text></Pressable>
    <Difficulty value={note.difficulty} S={S} />
    <Pressable onPress={() => patchProgress(note, status === 'needs' ? 'not-started' : 'needs')} style={S.starButton}><Text style={[S.star, status === 'needs' && S.starActive]}>{status === 'needs' ? '★' : '☆'}</Text></Pressable>
    <Pressable onPress={() => Linking.openURL(note.link)} style={S.sourceButton}><Text style={S.sourceText}>{sourceName(note.link)} ↗</Text></Pressable>
  </View>;
}
function sourceName(link) { try { const host = new URL(link).hostname; return host.includes('leetcode') ? 'LeetCode' : host.includes('takeuforward') ? 'TUF' : 'Source'; } catch { return 'Source'; } }

function TopicList({ list, S, go, progress, patchProgress }) { return <View style={S.problemGroup}>{list.map((note) => <ProblemRow key={note.id} note={note} go={go} progress={progress} patchProgress={patchProgress} S={S} />)}</View>; }
function PatternScreen({ S, go, pattern, progress, patchProgress }) {
  const activePattern = pattern ? patternList.find((item) => item === pattern) : null;
  const matched = notes.filter((note) => !activePattern || note.pattern === activePattern);
  const groups = [...new Set(matched.map((note) => note.topic))];
  return <View style={S.page}><Text style={S.eyebrow}>PATTERN INDEX</Text><Text style={S.pageTitle}>{activePattern || 'Choose a pattern.'}</Text><Text style={S.pageSub}>Every note that uses this technique, grouped for focused revision.</Text><View style={S.chipWrap}>{patternList.map((item) => <Chip key={item} label={item} active={item === activePattern} onPress={() => go(`/patterns/${encodeURIComponent(item)}`)} S={S} />)}</View>{groups.map((topic) => <View key={topic} style={S.problemGroup}><View style={S.groupHead}><Text style={S.groupTitle}>{topic}</Text><Text style={S.groupCount}>{matched.filter((note) => note.topic === topic).length} problems</Text></View>{matched.filter((note) => note.topic === topic).map((note) => <ProblemRow key={note.id} note={note} go={go} progress={progress} patchProgress={patchProgress} S={S} />)}</View>)}</View>;
}

function ProblemScreen({ S, go, note, progress, patchProgress }) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  if (!note) return <NotFound S={S} go={go} />;
  const index = notes.findIndex((item) => item.id === note.id);
  const status = progress[note.id]?.status || 'not-started';
  const copyCode = async () => { try { await navigator.clipboard.writeText(note.code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard may be unavailable */ } };
  return <View style={S.page}>
    <View style={S.breadcrumb}><Pressable onPress={() => go('/')}><Text style={S.breadcrumbText}>Home</Text></Pressable><Text style={S.breadcrumbSep}>›</Text><Pressable onPress={() => go(`/topics/${slug(note.topic)}`)}><Text style={S.breadcrumbText}>{note.topic}</Text></Pressable><Text style={S.breadcrumbSep}>›</Text><Text style={S.breadcrumbText}>{note.title}</Text></View>
    <View style={S.noteHeader}><View style={S.flexOne}><Text style={S.eyebrow}>{note.topic.toUpperCase()} · #{note.id}</Text><Text style={S.pageTitle}>{note.title}</Text><View style={S.noteMeta}><Chip label={note.pattern} onPress={() => go(`/patterns/${encodeURIComponent(note.pattern)}`)} S={S} /><Difficulty value={note.difficulty} S={S} /><Text style={S.mutedText}>{note.language}</Text></View></View><View style={S.noteActions}><ActionButton label={status === 'needs' ? '★ Needs revision' : '☆ Flag to revise'} secondary onPress={() => patchProgress(note, status === 'needs' ? 'not-started' : 'needs')} S={S} /><ActionButton label={status === 'revised' ? '✓ Revised' : 'Mark revised'} onPress={() => patchProgress(note, status === 'revised' ? 'not-started' : 'revised')} S={S} /></View></View>
    <View style={S.noteLayout}><View style={S.noteContent}>
      <NoteSection title="Problem" S={S}><Markdown value={note.problem} S={S} /></NoteSection>
      <View style={S.ideaCard}><Text style={S.eyebrow}>THE CORE IDEA</Text><Markdown value={note.idea} S={S} /></View>
      <NoteSection title="Approach" S={S}><Markdown value={note.approach} S={S} /></NoteSection>
      <NoteSection title="Dry run" S={S}><Markdown value={note.dryRun} S={S} /></NoteSection>
      <NoteSection title="Complexity" S={S}><View style={S.complexityRow}><View style={S.complexityCard}><Text style={S.complexityLabel}>TIME</Text><Text style={S.complexityValue}>{note.time}</Text></View><View style={S.complexityCard}><Text style={S.complexityLabel}>SPACE</Text><Text style={S.complexityValue}>{note.space}</Text></View></View></NoteSection>
      <NoteSection title="Solution" S={S}><Pressable onPress={() => setShowCode((value) => !value)} style={S.revealButton}><Text style={S.revealText}>{showCode ? 'Hide solution' : 'Try writing it first, then reveal the code'}</Text><Text style={S.revealChevron}>{showCode ? '−' : '+'}</Text></Pressable>{showCode && <View style={S.codeCard}><View style={S.codeToolbar}><Text style={S.codeLanguage}>{note.language.toUpperCase()}</Text><Pressable onPress={copyCode}><Text style={S.copyLink}>{copied ? 'Copied ✓' : 'Copy code'}</Text></Pressable></View><ScrollView horizontal><Text selectable style={S.codeText}>{note.code}</Text></ScrollView></View>}</NoteSection>
      <View style={S.noteNavigation}>{index > 0 ? <Pressable onPress={() => go(`/problem/${notes[index - 1].id}`)}><Text style={S.textLink}>← {notes[index - 1].title}</Text></Pressable> : <View />}{index < notes.length - 1 ? <Pressable onPress={() => go(`/problem/${notes[index + 1].id}`)}><Text style={S.textLink}>{notes[index + 1].title} →</Text></Pressable> : <View />}</View>
    </View><View style={S.onPage}><Text style={S.onPageTitle}>On this page</Text>{['Problem','Core idea','Approach','Dry run','Complexity','Solution'].map((item) => <Text key={item} style={S.onPageItem}>{item}</Text>)}<Pressable onPress={() => Linking.openURL(note.link)}><Text style={S.externalLink}>Original problem ↗</Text></Pressable></View></View>
  </View>;
}
function NoteSection({ title, children, S }) { return <View style={S.noteSection}><Text style={S.noteSectionTitle}>{title}</Text>{children}</View>; }

function AllProblemsScreen({ S, go, progress, patchProgress, query, setQuery, difficulty, setDifficulty, statusFilter, setStatusFilter }) {
  const list = notes.filter((note) => (!query || `${note.title} ${note.pattern} ${note.topic}`.toLowerCase().includes(query.toLowerCase())) && (difficulty === 'All' || note.difficulty === difficulty) && (statusFilter === 'All' || (statusFilter === 'Done' ? progress[note.id]?.status === 'revised' : progress[note.id]?.status !== 'revised')));
  return <View style={S.page}><Text style={S.eyebrow}>PROBLEM SHEET</Text><Text style={S.pageTitle}>All problems.</Text><Text style={S.pageSub}>Search and filter the complete notebook.</Text><View style={S.controls}><TextInput value={query} onChangeText={setQuery} placeholder="Search problems…" placeholderTextColor={S.muted.color} style={S.searchField} /><View style={S.filterBar}><Segment options={['All','Easy','Medium','Hard']} value={difficulty} onChange={setDifficulty} S={S} /><Segment options={['All','Not done','Done']} value={statusFilter} onChange={setStatusFilter} S={S} /></View></View><Text style={S.resultCount}>{list.length} of {notes.length} problems</Text><TopicList list={list} S={S} go={go} progress={progress} patchProgress={patchProgress} /></View>;
}
function RevisionScreen({ S, go, progress, patchProgress }) {
  const needs = notes.filter((note) => progress[note.id]?.status === 'needs');
  const revised = notes.filter((note) => progress[note.id]?.status === 'revised').length;
  const todo = notes.length - revised - needs.length;
  return <View style={S.page}><Text style={S.eyebrow}>YOUR REVISION SPACE</Text><Text style={S.pageTitle}>Pick up where you left off.</Text><Text style={S.pageSub}>Flag weak spots, then come back to them for a focused second pass.</Text><View style={S.statsRow}>{[[needs.length,'Needs revision'],[revised,'Revised'],[todo,'Not started']].map(([number,label]) => <View key={label} style={S.stat}><Text style={S.statNumber}>{number}</Text><Text style={S.statLabel}>{label}</Text></View>)}</View><ActionButton label="Surprise me ↗" onPress={() => { const next = needs[0] || notes[Math.floor(Math.random() * notes.length)]; go(`/problem/${next.id}`); }} S={S} /><View style={S.sectionHeading}><View><Text style={S.eyebrow}>YOUR QUEUE</Text><Text style={S.sectionTitle}>{needs.length ? 'Needs another look.' : 'A clean slate.'}</Text></View></View>{needs.length ? <TopicList list={needs} S={S} go={go} progress={progress} patchProgress={patchProgress} /> : <Empty S={S} text="Flag any problem to build a focused revision queue." />}</View>;
}
function Empty({ S, text }) { return <View style={S.empty}><Text style={S.emptyTitle}>Nothing here yet.</Text><Text style={S.emptyText}>{text}</Text></View>; }
function NotFound({ S, go }) { return <View style={S.page}><Text style={S.eyebrow}>PAGE NOT FOUND</Text><Text style={S.pageTitle}>Let’s find another path.</Text><Text style={S.pageSub}>The note you requested isn’t here.</Text><ActionButton label="Browse topics" onPress={() => go('/topics')} S={S} /></View>; }
function ActionButton({ label, onPress, secondary = false, S }) { return <Pressable onPress={onPress} style={({ pressed }) => [S.actionButton, secondary && S.actionButtonSecondary, pressed && S.pressed]}><Text style={[S.actionButtonText, secondary && S.actionButtonTextSecondary]}>{label}</Text></Pressable>; }

function progressCount(topic, progress) { return notes.filter((note) => note.topic === topic && progress[note.id]?.status === 'revised').length; }

function makeStyles(dark, width) {
  const c = dark ? { bg:'#101010', surface:'#171717', alt:'#1d1d1d', text:'#f5f5f5', muted:'#a0a0a0', line:'#303030', blue:'#ff5a46', soft:'#321d1a', green:'#72d6af', amber:'#f2c765', rose:'#ff8291', code:'#111111' } : { bg:'#ffffff', surface:'#ffffff', alt:'#f7f7f6', text:'#111111', muted:'#6b6b6b', line:'#e6e6e4', blue:'#e11900', soft:'#fff1ee', green:'#16875e', amber:'#9b6d00', rose:'#c52a1b', code:'#171717' };
  const base = StyleSheet.create({
    root:{flex:1,backgroundColor:c.bg}, header:{height:60,paddingHorizontal:width<620?16:34,position:'relative',borderBottomWidth:1,borderBottomColor:c.line,backgroundColor:c.surface,flexDirection:'row',alignItems:'center',zIndex:5}, brand:{flexDirection:'row',alignItems:'center',gap:10,minWidth:width<620?0:205,maxWidth:width<820?'68%':undefined,flexShrink:1},brandMark:{width:27,height:27,borderRadius:6,backgroundColor:c.blue,alignItems:'center',justifyContent:'center'},brandMarkText:{fontSize:16,color:c.surface,fontWeight:'700'},brandText:{color:c.text,fontSize:15,fontWeight:'650'},headerNav:{flex:1,flexDirection:'row',justifyContent:'center',gap:28},headerNavLink:{paddingVertical:8},headerNavText:{fontSize:13,color:c.muted},headerNavActive:{color:c.blue,fontWeight:'600'},headerActions:{flexDirection:'row',alignItems:'center',gap:5,marginLeft:'auto',flexShrink:0,position:'relative'},headerIcon:{width:35,height:35,alignItems:'center',justifyContent:'center',borderRadius:6},headerIconText:{fontSize:22,color:c.text},body:{flex:1,flexDirection:'row'},sidebar:{width:232,paddingHorizontal:16,paddingTop:24,paddingBottom:20,borderRightWidth:1,borderRightColor:c.line,backgroundColor:dark?c.bg:'#fbfbfa'},mobileDrawer:{position:'absolute',zIndex:4,top:0,bottom:0,left:0,elevation:10,shadowColor:'#000',shadowOpacity:.18,shadowRadius:20},sidebarLabel:{fontSize:10,color:c.muted,letterSpacing:1.4,fontWeight:'700',marginBottom:13,marginLeft:9},sideLink:{minHeight:39,paddingHorizontal:9,borderRadius:9,alignItems:'center',flexDirection:'row',gap:8},sideLinkActive:{backgroundColor:c.soft},sideNumber:{fontSize:10,color:c.muted,fontVariant:['tabular-nums'],width:18},sideName:{flex:1,fontSize:12,color:c.text},sideCount:{fontSize:10,color:c.muted,fontVariant:['tabular-nums']},sideDivider:{height:1,backgroundColor:c.line,marginVertical:16},sideSecondary:{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:9,paddingVertical:9},sideSecondaryText:{fontSize:12,color:c.muted},sideArrow:{fontSize:13,color:c.blue},mainScroll:{flex:1},mainScrollContent:{flexGrow:1},page:{width:'100%',maxWidth:1200,alignSelf:'center',paddingHorizontal:width<620?20:width<1000?32:52,paddingTop:width<620?28:40,paddingBottom:72},flexOne:{flex:1},eyebrow:{fontSize:10,color:c.muted,letterSpacing:1.4,fontWeight:'700'},hero:{flexDirection:width<900?'column':'row',alignItems:width<900?'stretch':'center',justifyContent:'space-between',gap:width<900?12:36,paddingTop:8,paddingBottom:20},heroCopy:{width:width<620?width-40:width<900?undefined:'53%'},heroTitle:{fontSize:width<620?45:width<1000?58:64,lineHeight:width<620?49:width<1000?62:68,letterSpacing:-2.7,color:c.text,fontWeight:'700',marginTop:15},heroSub:{fontSize:16,lineHeight:24,color:c.muted,marginTop:14,maxWidth:width<620?width-40:470},heroActions:{flexDirection:'row',gap:9,flexWrap:'wrap',marginTop:21},actionButton:{backgroundColor:c.blue,minHeight:42,paddingHorizontal:17,borderRadius:4,alignItems:'center',justifyContent:'center'},actionButtonSecondary:{backgroundColor:c.surface,borderWidth:1,borderColor:c.line},actionButtonText:{fontSize:13,color:'#fff',fontWeight:'650'},actionButtonTextSecondary:{color:c.text},pressed:{opacity:.72},heroVisual:{display:width<620?'none':'flex',width:width<900?undefined:'40%',alignSelf:width<900?'stretch':'auto',maxWidth:width<900?560:440,marginTop:width<900?20:0,padding:16,borderWidth:1,borderColor:c.line,borderRadius:8,backgroundColor:c.surface},heroVisualTop:{flexDirection:'row',justifyContent:'space-between'},heroVisualLabel:{fontSize:11,color:c.muted},arrayVisual:{flexDirection:'row',gap:8,marginTop:16},arrayCell:{width:43,height:42,alignItems:'center',justifyContent:'center',backgroundColor:c.alt,borderWidth:1,borderColor:c.line,borderRadius:9},arrayCellActive:{backgroundColor:c.blue,borderColor:c.blue},arrayCellText:{fontSize:15,color:c.text,fontWeight:'600'},arrayCellTextActive:{color:'#fff'},heroVisualFoot:{fontSize:11,color:c.muted,marginTop:12},statsRow:{flexDirection:'row',flexWrap:'wrap',gap:width<620?8:0,marginTop:10,marginBottom:26,paddingVertical:15,borderTopWidth:1,borderBottomWidth:1,borderColor:c.line},stat:{width:width<620?'45%':150,minWidth:width<620?0:150,paddingHorizontal:width<620?4:14,paddingVertical:5,backgroundColor:'transparent',borderRadius:0,borderWidth:0,borderRightWidth:width<620?0:1,borderColor:c.line},statNumber:{fontSize:22,color:c.text,fontWeight:'650',letterSpacing:-.7},statLabel:{fontSize:11,color:c.muted,marginTop:5},sectionHeading:{flexDirection:'row',alignItems:'flex-end',gap:20,marginTop:28,marginBottom:16},sectionTitle:{fontSize:29,color:c.text,fontWeight:'650',letterSpacing:-1,marginTop:8},sectionSub:{fontSize:13,color:c.muted,marginTop:6},textLink:{fontSize:12,color:c.blue,fontWeight:'600'},cardGrid:{flexDirection:'row',flexWrap:'wrap',gap:13},topicCard:{width:width<600?'100%':width<960?'48%':'31.8%',minHeight:178,padding:18,borderRadius:8,borderWidth:1,borderColor:c.line,backgroundColor:c.surface},cardPressed:{transform:[{scale:.99}],opacity:.86},topicCardTop:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},topicIcon:{width:34,height:34,alignItems:'center',justifyContent:'center',borderRadius:6,backgroundColor:c.soft},topicIconText:{fontSize:17,color:c.blue,fontWeight:'650'},cardArrow:{fontSize:15,color:c.muted},topicTitle:{fontSize:17,color:c.text,fontWeight:'650',marginTop:14},topicDescription:{fontSize:12,color:c.muted,lineHeight:18,marginTop:6,minHeight:34},topicCardBottom:{marginTop:15,marginBottom:10},topicCount:{fontSize:10,color:c.muted},progressTrack:{height:4,backgroundColor:c.line,borderRadius:5,overflow:'hidden'},progressFill:{height:'100%',backgroundColor:c.blue,borderRadius:5},chipWrap:{flexDirection:'row',flexWrap:'wrap',gap:8,marginVertical:14},chip:{paddingHorizontal:12,paddingVertical:8,borderRadius:4,borderWidth:1,borderColor:c.line,backgroundColor:c.surface},chipActive:{borderColor:c.blue,backgroundColor:c.soft},chipText:{fontSize:11,color:c.muted},chipTextActive:{color:c.blue,fontWeight:'600'},pageTitle:{fontSize:width<620?39:54,lineHeight:width<620?46:62,color:c.text,letterSpacing:-2.2,fontWeight:'680',marginTop:12},pageSub:{fontSize:14,lineHeight:21,color:c.muted,maxWidth:720,marginTop:9},breadcrumb:{flexDirection:'row',alignItems:'center',flexWrap:'wrap',gap:8,marginBottom:28},breadcrumbText:{fontSize:11,color:c.muted},breadcrumbSep:{fontSize:13,color:c.line},progressPanel:{padding:20,backgroundColor:c.surface,borderWidth:1,borderColor:c.line,borderRadius:8,marginTop:25,marginBottom:20},progressTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:15,flexWrap:'wrap',gap:10},progressCount:{flexDirection:'row',alignItems:'baseline',gap:8},progressNumber:{fontSize:36,color:c.text,fontWeight:'650'},progressLabel:{fontSize:12,color:c.muted},difficultySummary:{flexDirection:'row',gap:12,flexWrap:'wrap'},difficultySummaryText:{fontSize:10,color:c.muted},controls:{marginVertical:17},searchField:{height:45,borderWidth:1,borderColor:c.line,borderRadius:6,backgroundColor:c.surface,paddingHorizontal:14,color:c.text,fontSize:14},filterBar:{flexDirection:'row',gap:9,flexWrap:'wrap',marginTop:11},segmentGroup:{flexDirection:'row',padding:3,borderWidth:1,borderColor:c.line,borderRadius:4,backgroundColor:c.alt},segment:{paddingHorizontal:12,paddingVertical:7,borderRadius:6},segmentActive:{backgroundColor:c.surface,elevation:1},segmentText:{fontSize:10,color:c.muted},segmentTextActive:{fontWeight:'650',color:c.blue},problemGroup:{marginTop:23},groupHead:{flexDirection:'row',alignItems:'baseline',justifyContent:'space-between',gap:9,marginBottom:10},groupTitle:{fontSize:19,color:c.text,fontWeight:'650'},groupCount:{fontSize:10,color:c.muted},problemRow:{minHeight:62,paddingHorizontal:12,paddingVertical:9,flexDirection:'row',alignItems:'center',gap:10,backgroundColor:c.surface,borderBottomWidth:1,borderColor:c.line},check:{width:19,height:19,borderRadius:6,borderWidth:1.4,borderColor:c.line,alignItems:'center',justifyContent:'center'},checkDone:{backgroundColor:c.blue,borderColor:c.blue},checkText:{fontSize:12,color:'#fff',fontWeight:'700'},problemMain:{flex:1,minWidth:0},problemTitle:{fontSize:12,color:c.text,fontWeight:'600'},problemDone:{color:c.muted},problemMeta:{fontSize:10,color:c.muted,marginTop:3},badge:{paddingHorizontal:8,paddingVertical:4,borderRadius:6},badgeEasy:{backgroundColor:dark?'#1d352c':'#e8f7f0'},badgeMedium:{backgroundColor:dark?'#3a3020':'#fff4d6'},badgeHard:{backgroundColor:dark?'#3b2429':'#ffebee'},badgeText:{fontSize:9,fontWeight:'650'},badgeEasyText:{color:c.green},badgeMediumText:{color:c.amber},badgeHardText:{color:c.rose},starButton:{width:27,height:30,alignItems:'center',justifyContent:'center'},star:{fontSize:18,color:c.muted},starActive:{color:c.amber},sourceButton:{minWidth:48,alignItems:'flex-end'},sourceText:{fontSize:9,color:c.blue,fontWeight:'600'},empty:{marginVertical:22,padding:24,borderRadius:8,backgroundColor:c.surface,borderWidth:1,borderColor:c.line},emptyTitle:{fontSize:16,color:c.text,fontWeight:'650'},emptyText:{fontSize:12,color:c.muted,marginTop:7},noteHeader:{flexDirection:width<740?'column':'row',alignItems:width<740?'stretch':'flex-end',justifyContent:'space-between',gap:20},noteMeta:{flexDirection:'row',alignItems:'center',gap:8,flexWrap:'wrap',marginTop:15},noteActions:{flexDirection:'row',gap:8,flexWrap:'wrap'},noteLayout:{flexDirection:width<900?'column':'row',gap:35,marginTop:32},noteContent:{flex:1,minWidth:0,maxWidth:760},onPage:{width:190,padding:17,alignSelf:'flex-start',backgroundColor:c.surface,borderRadius:8,borderWidth:1,borderColor:c.line},onPageTitle:{fontSize:12,color:c.text,fontWeight:'650',marginBottom:10},onPageItem:{fontSize:11,color:c.muted,paddingVertical:6},externalLink:{fontSize:11,color:c.blue,marginTop:13},noteSection:{marginBottom:29},noteSectionTitle:{fontSize:19,color:c.text,fontWeight:'650',marginBottom:12},markdown:{gap:9},bodyText:{fontSize:14,lineHeight:23,color:c.text},strong:{fontWeight:'700'},inlineCode:{fontFamily:'monospace',fontSize:12,color:c.blue,backgroundColor:c.soft},markdownList:{gap:7,marginVertical:3},listRow:{flexDirection:'row',gap:9,alignItems:'flex-start'},listBullet:{fontSize:13,color:c.blue,width:22},tableScroll:{maxWidth:'100%'},table:{borderWidth:1,borderColor:c.line,borderRadius:9,overflow:'hidden',minWidth:400},tableRow:{flexDirection:'row',borderBottomWidth:1,borderColor:c.line},tableHeader:{backgroundColor:c.alt},tableCell:{flex:1,minWidth:80,padding:9},tableHeadText:{fontSize:11,color:c.text,fontWeight:'650'},ideaCard:{padding:19,borderRadius:8,backgroundColor:c.soft,marginBottom:27,gap:10},complexityRow:{flexDirection:'row',gap:11},complexityCard:{flex:1,padding:15,borderRadius:6,borderWidth:1,borderColor:c.line,backgroundColor:c.surface},complexityLabel:{fontSize:9,color:c.muted,letterSpacing:1},complexityValue:{fontSize:17,color:c.text,fontWeight:'650',marginTop:7},revealButton:{minHeight:47,paddingHorizontal:14,borderRadius:6,borderWidth:1,borderColor:c.line,backgroundColor:c.surface,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},revealText:{fontSize:12,color:c.text},revealChevron:{fontSize:18,color:c.blue},codeCard:{marginTop:10,borderRadius:6,backgroundColor:c.code,overflow:'hidden'},codeToolbar:{height:39,paddingHorizontal:13,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderBottomColor:'#33353a'},codeLanguage:{fontSize:9,color:'#a4a6ae',letterSpacing:1},copyLink:{fontSize:10,color:'#ff7868'},codeText:{fontFamily:'monospace',fontSize:12,lineHeight:19,color:'#eaebef',padding:15},noteNavigation:{borderTopWidth:1,borderColor:c.line,paddingTop:18,marginTop:30,flexDirection:'row',justifyContent:'space-between',gap:20},mutedText:{fontSize:11,color:c.muted},resultCount:{fontSize:11,color:c.muted,marginBottom:10},inlineModal:{},modalBackdrop:{position:'absolute',zIndex:20,top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(0,0,0,.36)',alignItems:'center',paddingTop:Math.max(80,width<620?50:105)},backdropTap:{position:'absolute',top:0,left:0,right:0,bottom:0},searchDialog:{width:width<620?'92%':600,maxHeight:'70%',backgroundColor:c.surface,borderRadius:8,padding:11,elevation:10},searchBar:{height:48,paddingHorizontal:10,flexDirection:'row',alignItems:'center',gap:10,borderBottomWidth:1,borderBottomColor:c.line},searchGlyph:{fontSize:21,color:c.muted},searchInput:{flex:1,color:c.text,fontSize:14,outlineStyle:'none'},escButton:{padding:6,borderWidth:1,borderColor:c.line,borderRadius:6},escText:{fontSize:9,color:c.muted},searchResults:{maxHeight:390},searchResult:{flexDirection:'row',alignItems:'center',gap:10,padding:11,borderBottomWidth:1,borderColor:c.line},searchResultTitle:{fontSize:12,color:c.text,fontWeight:'600'},searchResultMeta:{fontSize:10,color:c.muted,marginTop:3},searchHint:{fontSize:9,color:c.muted,padding:10},emptySearch:{fontSize:12,color:c.muted,padding:15},toast:{position:'absolute',bottom:20,alignSelf:'center',paddingHorizontal:16,paddingVertical:11,borderRadius:6,backgroundColor:c.text,elevation:5},toastText:{fontSize:12,color:c.surface},flexRow:{flexDirection:'row'},muted:{color:c.muted},
  });
  return base;
}

export default App;
