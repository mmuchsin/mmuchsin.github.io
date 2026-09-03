import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
	testDir: 'e2e',
	timeout: 10000,
	expect: {
		timeout: 5000
	},
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	// Capped locally: the dev machine has limited RAM and 6-way parallel
	// Chromium instances can get renderers killed (CDP "session closed"
	// flakiness in the 404 tests). CI already runs with 1 worker.
	workers: process.env.CI ? 1 : 3,
	reporter: 'html',
	use: {
		baseURL: 'http://localhost:4173',
		trace: 'on-first-retry'
	},
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				// Hardening for constrained/WSL environments (small /dev/shm);
				// harmless elsewhere. Reduces renderer crashes under load.
				launchOptions: { args: ['--disable-dev-shm-usage'] }
			}
		}
	],
	webServer: {
		command: 'bun run build && bun run preview',
		port: 4173,
		stdout: 'pipe',
		stderr: 'pipe',
		env: {
			PORT: '4173'
		}
	}
};

export default config;
