'use client';

import { FormEvent, useEffect, useState } from 'react';
import type { SiteContent } from '@/lib/site-content';
import styles from './admin.module.css';

type Tab = 'general' | 'services' | 'skills' | 'certifications' | 'experience' | 'education' | 'links';
const tabs: { id: Tab; label: string }[] = [
  { id: 'general', label: 'Home & about' }, { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' }, { id: 'certifications', label: 'Certifications' },
  { id: 'experience', label: 'Experience' }, { id: 'education', label: 'Education & contact' },
  { id: 'links', label: 'Social links' },
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [content, setContent] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<Tab>('general');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const session = await fetch('/api/admin/session', { cache: 'no-store' });
      const status = session.ok ? await session.json() : { authenticated: false };
      if (!status.authenticated) { setContent(null); setAuthenticated(false); return; }
      const response = await fetch('/api/admin/content', { cache: 'no-store' });
      if (response.status === 401) { setContent(null); setAuthenticated(false); return; }
      if (!response.ok) throw new Error('Content request failed');
      setContent(await response.json());
      setAuthenticated(true);
      setMessage('');
    } catch {
      setAuthenticated(true);
      setMessage('Content could not be loaded. Check the server and retry.');
    }
  };
  useEffect(() => { load(); }, []);

  const login = async (event: FormEvent) => {
    event.preventDefault(); setMessage('Signing in…');
    const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (!response.ok) { setMessage(response.status === 503 ? 'Admin password is not configured.' : 'Incorrect password.'); return; }
    setPassword(''); setMessage(''); await load();
  };
  const save = async () => {
    if (!content) return; setSaving(true); setMessage('Saving…');
    const response = await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) });
    setSaving(false); setMessage(response.ok ? 'Saved and published.' : 'Could not save. Please review the fields.');
  };
  const logout = async () => { await fetch('/api/admin/logout', { method: 'POST' }); setContent(null); setAuthenticated(false); };
  const setSection = <K extends keyof SiteContent>(section: K, value: SiteContent[K]) => setContent(current => current ? ({ ...current, [section]: value }) : current);
  const field = (label: string, value: string, onChange: (value: string) => void, area = false) => <label><span>{label}</span>{area ? <textarea value={value} onChange={e => onChange(e.target.value)} /> : <input value={value} onChange={e => onChange(e.target.value)} />}</label>;

  if (authenticated === null) return <main className={styles.loading}>Loading secure console…</main>;
  if (!authenticated) return <main className={styles.login}><form onSubmit={login}><div className={styles.mark}>AA</div><p>Portfolio control room</p><h1>Welcome back.</h1><label><span>Admin password</span><input autoFocus type="password" value={password} onChange={e => setPassword(e.target.value)} /></label><button>Sign in securely</button>{message && <small>{message}</small>}<a href="/">← Return to website</a></form></main>;
  if (!content) return <main className={styles.loading}><div className={styles.loadError}><p>{message || 'Loading your content…'}</p>{message && <button onClick={load}>Retry</button>}</div></main>;

  return <main className={styles.shell}>
    <aside><a className={styles.brand} href="/"><b>AA</b><span>Content Studio</span></a><nav>{tabs.map(item => <button key={item.id} className={tab === item.id ? styles.active : ''} onClick={() => setTab(item.id)}>{item.label}</button>)}</nav><button className={styles.logout} onClick={logout}>Sign out</button></aside>
    <section className={styles.workspace}>
      <header><div><p>Website administration</p><h1>{tabs.find(item => item.id === tab)?.label}</h1></div><div className={styles.actions}><a href="/" target="_blank">Preview ↗</a><button onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button></div></header>
      {message && <div className={styles.notice}>{message}</div>}

      {tab === 'general' && <div className={styles.stack}>
        <Editor title="Hero section"><div className={styles.grid}>{Object.entries(content.hero).map(([key, value]) => field(key.replace(/([A-Z])/g, ' $1'), value, next => setSection('hero', { ...content.hero, [key]: next }), key === 'description'))}</div></Editor>
        <Editor title="About section"><div className={styles.grid}>{field('Headline', content.about.title, value => setSection('about', { ...content.about, title: value }))}{field('Accent word', content.about.accent, value => setSection('about', { ...content.about, accent: value }))}{field('Paragraph one', content.about.paragraphOne, value => setSection('about', { ...content.about, paragraphOne: value }), true)}{field('Paragraph two', content.about.paragraphTwo, value => setSection('about', { ...content.about, paragraphTwo: value }), true)}</div></Editor>
        <Editor title="Approach"><div className={styles.grid}>{field('Title', content.approach.title, value => setSection('approach', { ...content.approach, title: value }))}{field('Accent title', content.approach.accentTitle, value => setSection('approach', { ...content.approach, accentTitle: value }))}{field('Description', content.approach.description, value => setSection('approach', { ...content.approach, description: value }), true)}{field('Principles — one per line', content.approach.principles.join('\n'), value => setSection('approach', { ...content.approach, principles: value.split('\n').filter(Boolean) }), true)}</div></Editor>
      </div>}

      {tab === 'services' && <ListEditor items={content.services} setItems={items => setSection('services', items)} create={() => ({ number: String(content.services.length + 1).padStart(2, '0'), title: 'New service', copy: '', tags: '' })} render={(item, update) => <div className={styles.grid}>{field('Number', item.number, value => update({ ...item, number: value }))}{field('Title', item.title, value => update({ ...item, title: value }))}{field('Description', item.copy, value => update({ ...item, copy: value }), true)}{field('Tags', item.tags, value => update({ ...item, tags: value }))}</div>} />}
      {tab === 'skills' && <Editor title="Skills"><p className={styles.hint}>Enter one skill per line. Reorder the lines to change their order on the website.</p>{field('Skills', content.skills.join('\n'), value => setSection('skills', value.split('\n').filter(Boolean)), true)}</Editor>}
      {tab === 'certifications' && <ListEditor items={content.certifications} setItems={items => setSection('certifications', items)} create={() => ({ title: 'New certification', vendor: '', icon: 'microsoft' })} render={(item, update) => <div className={styles.grid}>{field('Certification', item.title, value => update({ ...item, title: value }))}{field('Company / vendor', item.vendor, value => update({ ...item, vendor: value }))}<label><span>Logo</span><select value={item.icon} onChange={e => update({ ...item, icon: e.target.value })}>{['microsoft','vmware','kubernetes','aws','redhat','linux','google','comptia'].map(icon => <option key={icon}>{icon}</option>)}</select></label></div>} />}
      {tab === 'experience' && <ListEditor items={content.experience} setItems={items => setSection('experience', items)} create={() => ({ date: 'DATE—PRESENT', role: 'New role', company: '', place: '', summary: '', details: [] })} render={(item, update) => <div className={styles.grid}>{field('Date', item.date, value => update({ ...item, date: value }))}{field('Role', item.role, value => update({ ...item, role: value }))}{field('Company', item.company, value => update({ ...item, company: value }))}{field('Location', item.place, value => update({ ...item, place: value }))}{field('Summary', item.summary, value => update({ ...item, summary: value }), true)}{field('Responsibilities — one per line', item.details.join('\n'), value => update({ ...item, details: value.split('\n').filter(Boolean) }), true)}</div>} />}
      {tab === 'education' && <div className={styles.stack}><Editor title="Education"><div className={styles.grid}>{Object.entries(content.education).map(([key, value]) => field(key, value, next => setSection('education', { ...content.education, [key]: next })))}</div></Editor><Editor title="Contact call-to-action"><div className={styles.grid}>{Object.entries(content.contact).map(([key, value]) => field(key, value, next => setSection('contact', { ...content.contact, [key]: next })))}</div></Editor></div>}
      {tab === 'links' && <Editor title="Social and credential links"><div className={styles.grid}>{Object.entries(content.links).map(([key, value]) => field(key.replace(/([A-Z])/g, ' $1'), value, next => setSection('links', { ...content.links, [key]: next })))}</div></Editor>}
    </section>
  </main>;
}

function Editor({ title, children }: { title: string; children: React.ReactNode }) { return <section className={styles.card}><div className={styles.cardHead}><h2>{title}</h2></div>{children}</section>; }
function ListEditor<T>({ items, setItems, create, render }: { items: T[]; setItems: (items: T[]) => void; create: () => T; render: (item: T, update: (item: T) => void) => React.ReactNode }) {
  return <div className={styles.stack}>{items.map((item, index) => <Editor key={index} title={`Item ${String(index + 1).padStart(2, '0')}`}><div className={styles.itemTools}><button disabled={index === 0} onClick={() => { const copy = [...items]; [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]]; setItems(copy); }}>↑ Move</button><button disabled={index === items.length - 1} onClick={() => { const copy = [...items]; [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]]; setItems(copy); }}>↓ Move</button><button className={styles.danger} onClick={() => setItems(items.filter((_, i) => i !== index))}>Remove</button></div>{render(item, value => setItems(items.map((old, i) => i === index ? value : old)))}</Editor>)}<button className={styles.add} onClick={() => setItems([...items, create()])}>+ Add new item</button></div>;
}
