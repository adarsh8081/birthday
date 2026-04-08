export async function GET() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="cake" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f2b37d" />
          <stop offset="50%" stop-color="#d889b7" />
          <stop offset="100%" stop-color="#91c9d8" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="18" fill="#fff7f2" />
      <path d="M18 40h28v8H18z" fill="url(#cake)" />
      <path d="M22 28h20v12H22z" fill="#f7e7cf" />
      <path d="M31 16h2v12h-2z" fill="#8b6f76" />
      <path d="M32 10c4 4 4 7 0 10-4-3-4-6 0-10Z" fill="#f28ca8" />
    </svg>
  `.trim();

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
