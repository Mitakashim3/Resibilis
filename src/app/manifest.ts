import { MetadataRoute } from 'next';

/**
 * Web App Manifest for PWA support
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Resibilis - Receipt Generator',
    short_name: 'Resibilis',
    description: 'Free, secure receipt generator for Filipino freelancers and small sellers',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    categories: ['business', 'finance', 'productivity'],
    lang: 'en-PH',
    orientation: 'portrait-primary',
  };
}
