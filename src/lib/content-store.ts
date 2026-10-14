import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import { defaultSiteContent, SiteContent } from './site-content';

const dataDirectory = path.join(process.cwd(), 'data');
const contentPath = path.join(dataDirectory, 'site-content.json');
const backupDirectory = path.join(dataDirectory, 'backups');

export async function readSiteContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(contentPath, 'utf8');
    return JSON.parse(raw) as SiteContent;
  } catch (error: any) {
    if (error?.code === 'ENOENT') return defaultSiteContent;
    throw error;
  }
}

export async function writeSiteContent(content: SiteContent) {
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
