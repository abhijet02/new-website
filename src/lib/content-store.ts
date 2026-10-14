import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import { defaultSiteContent, SiteContent } from './site-content';

const dataDirectory = path.join(process.cwd(), 'data');
const contentPath = path.join(dataDirectory, 'site-content.json');
const backupDirectory = path.join(dataDirectory, 'backups');
const contentKey = 'site-content';
const backupKey = 'site-content:previous';

type ContentStore = {
  get(key: string): Promise<string | null>;
  get<T>(key: string, type: 'json'): Promise<T | null>;
  put(key: string, value: string): Promise<void>;
};

async function getContentStore(): Promise<ContentStore | null> {
  try {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare');
    const { env } = await getCloudflareContext({ async: true });
    return (env as CloudflareEnv & { SITE_CONTENT?: ContentStore }).SITE_CONTENT ?? null;
  } catch {
    // `next dev` and `next start` do not provide Cloudflare bindings. Keep the
    // file-backed store for local development and tests.
    return null;
  }
}

export async function readSiteContent(): Promise<SiteContent> {
  const store = await getContentStore();
  if (store) {
    const content = await store.get<SiteContent>(contentKey, 'json');
    return content ?? defaultSiteContent;
  }

  try {
    const raw = await fs.readFile(contentPath, 'utf8');
    return JSON.parse(raw) as SiteContent;
  } catch (error: any) {
    if (error?.code === 'ENOENT') return defaultSiteContent;
    throw error;
  }
}

export async function writeSiteContent(content: SiteContent) {
  const store = await getContentStore();
  if (store) {
    const serialized = JSON.stringify(content);
    const existing = await store.get(contentKey);
    if (existing) await store.put(backupKey, existing);
    await store.put(contentKey, serialized);
    return;
  }

  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.mkdir(backupDirectory, { recursive: true });

  try {
    const existing = await fs.readFile(contentPath, 'utf8');
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    await fs.writeFile(path.join(backupDirectory, `site-content-${stamp}.json`), existing, 'utf8');
  } catch (error: any) {
    if (error?.code !== 'ENOENT') throw error;
  }

  const temporaryPath = contentPath + '.tmp';
  await fs.writeFile(temporaryPath, JSON.stringify(content, null, 2) + '\n', 'utf8');
  await fs.rename(temporaryPath, contentPath);

  const backups = (await fs.readdir(backupDirectory))
    .filter(file => file.endsWith('.json'))
    .sort()
    .reverse();
  await Promise.all(backups.slice(20).map(file => fs.unlink(path.join(backupDirectory, file))));
}

export function validateSiteContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== 'object') return false;
  const content = value as SiteContent;
  return Boolean(
    content.hero?.title &&
    content.about?.title &&
    Array.isArray(content.services) &&
    Array.isArray(content.skills) &&
    Array.isArray(content.certifications) &&
    Array.isArray(content.experience) &&
    content.education?.title &&
    content.contact?.email &&
    content.links
  );
}
