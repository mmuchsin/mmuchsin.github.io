import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Hero from './Hero.svelte';

describe('Hero', () => {
	it('renders the name from copy prop', () => {
		render(Hero, {
			copy: {
				name: 'Muchsin',
				tagline: 'Software Engineer',
				sub: 'Building things for the web',
				cta_projects: 'View Projects',
				cta_contact: 'Contact Me'
			}
		});
		expect(screen.getByText('Muchsin')).toBeTruthy();
	});

	it('renders the tagline from copy prop', () => {
		render(Hero, {
			copy: {
				name: 'Muchsin',
				tagline: 'Full-Stack Developer',
				sub: 'Building things for the web',
				cta_projects: 'View Projects',
				cta_contact: 'Contact Me'
			}
		});
		expect(screen.getByText('Full-Stack Developer')).toBeTruthy();
	});

	it('renders the sub text from copy prop', () => {
		render(Hero, {
			copy: {
				name: 'Muchsin',
				tagline: 'Software Engineer',
				sub: 'Building things for the web',
				cta_projects: 'View Projects',
				cta_contact: 'Contact Me'
			}
		});
		expect(screen.getByText('Building things for the web')).toBeTruthy();
	});

	it('renders CTA buttons with correct text', () => {
		render(Hero, {
			copy: {
				name: 'Muchsin',
				tagline: 'Software Engineer',
				sub: 'Building things for the web',
				cta_projects: 'View Projects',
				cta_contact: 'Contact Me'
			}
		});
		expect(screen.getByText('View Projects')).toBeTruthy();
		expect(screen.getByText('Contact Me')).toBeTruthy();
	});

	it('renders hero section with aria-labelledby', () => {
		render(Hero, {
			copy: {
				name: 'Muchsin',
				tagline: 'Software Engineer',
				sub: 'Building things for the web',
				cta_projects: 'View Projects',
				cta_contact: 'Contact Me'
			}
		});
		const section = screen.getByRole('region');
		expect(section.getAttribute('aria-labelledby')).toBe('hero-title');
	});

	it('renders the Arabic script element', () => {
		render(Hero, {
			copy: {
				name: 'Muchsin',
				tagline: 'Software Engineer',
				sub: 'Building things for the web',
				cta_projects: 'View Projects',
				cta_contact: 'Contact Me'
			}
		});
		expect(screen.getByText('السلام عليكم')).toBeTruthy();
	});

	it('renders Latin script element', () => {
		render(Hero, {
			copy: {
				name: 'Muchsin',
				tagline: 'Software Engineer',
				sub: 'Building things for the web',
				cta_projects: 'View Projects',
				cta_contact: 'Contact Me'
			}
		});
		const latinEl = document.querySelector('.script-latin');
		expect(latinEl).toBeTruthy();
		expect(latinEl?.textContent).toContain('assalamu');
	});

	it('renders CTA links with correct hrefs', () => {
		render(Hero, {
			copy: {
				name: 'Muchsin',
				tagline: 'Software Engineer',
				sub: 'Building things for the web',
				cta_projects: 'View Projects',
				cta_contact: 'Contact Me'
			}
		});
		const links = document.querySelectorAll('.hero a.btn');
		expect(links.length).toBe(2);
		const hrefs = Array.from(links).map(a => a.getAttribute('href'));
		expect(hrefs).toContain('#projects');
		expect(hrefs).toContain('#contact');
	});
});
