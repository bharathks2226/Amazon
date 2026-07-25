import type { Locator, Page } from '@playwright/test';

export type LocatorCandidate = {
  name: string;
  locator: () => Locator;
};

export async function resolveLocatorAtRuntime(page: Page, candidates: LocatorCandidate[]): Promise<Locator> {
  const deadline = Date.now() + 5000;

  while (Date.now() < deadline) {
    for (const candidate of candidates) {
      const locator = candidate.locator();

      try {
        const visible = await locator.first().isVisible().catch(() => false);
        if (visible) {
          return locator;
        }
      } catch {
        // Ignore and try the next candidate.
      }
    }

    await page.waitForTimeout(200);
  }

  throw new Error(`No runtime locator matched. Tried: ${candidates.map((item) => item.name).join(', ')}`);
}
