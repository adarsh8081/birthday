export type AccentTone = 'rose' | 'peach' | 'gold' | 'sky';

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  caption: string;
  date?: string;
  accent: AccentTone;
}

export interface VideoItem {
  id: number;
  src: string;
  poster: string;
  title: string;
  caption: string;
  date?: string;
  accent: AccentTone;
}

export interface MessageBlock {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
}

export interface TimelineMoment {
  id: string;
  title: string;
  date: string;
  body: string;
  accent: AccentTone;
}

export type CollectionItem =
  | ({ kind: 'image' } & GalleryItem)
  | ({ kind: 'video' } & VideoItem);

const galleryFiles = [
  'img1.jpg',
  'img2.jpg',
  'img3.jpg',
  'img4.jpg',
  'img5.jpg',
  'img6.jpg',
  'img7.jpg',
  'img8.jpg',
  'img9.jpg',
  'img10.jpg',
  'img11.jpg',
  'img12.jpg',
  'img13.jpg',
  'img14.jpg',
  'img15.jpg',
  'img16.jpg',
  'img17.jpg',
  'img18.jpg',
  'img19.webp',
  'img20.webp',
  'img21.webp',
  'img22.jpg',
  'img23.webp',
  'img24.jpg',
  'img25.webp',
  'img26.jpg',
  'img27.webp',
  'img28.jpg',
  'img29.webp',
  'img30.webp',
  'img31.webp',
  'img32.webp',
  'img33.webp',
  'img34.webp',
  'img35.jpg',
  'img36.webp',
  'img37.webp',
  'img38.jpg',
  'img39.jpg',
  'img40.jpg',
  'img41.jpg',
  'img42.jpg',
  'img43.jpg',
  'img44.jpg',
  'img45.webp',
  'img46.jpg',
  'img47.jpg',
  'img48.jpg',
  'img49.jpg',
  'img50.jpg',
  'img51.jpg',
  'img52.jpg',
  'img53.jpg',
] as const;

const galleryMeta: Omit<GalleryItem, 'id' | 'src'>[] = [
  { alt: 'Ishika smiling softly in warm morning light', caption: 'Soft smile, slow morning, instant glow.', date: 'March 2024', accent: 'rose' },
  { alt: 'Ishika framed by a candid blush-toned portrait', caption: 'A candid that feels like a little celebration already.', date: 'March 2024', accent: 'peach' },
  { alt: 'Ishika in a playful portrait with bright expression', caption: 'The kind of laugh that changes a whole room.', date: 'April 2024', accent: 'gold' },
  { alt: 'Ishika caught in a quiet reflective birthday-style pose', caption: 'Grace in the pauses, sparkle in the details.', date: 'April 2024', accent: 'sky' },
  { alt: 'Ishika glowing in a close-up portrait', caption: 'A golden-hour moment that looks made for her.', date: 'May 2024', accent: 'rose' },
  { alt: 'Ishika in a relaxed portrait with gentle expression', caption: 'Easy, elegant, and impossible not to admire.', date: 'May 2024', accent: 'peach' },
  { alt: 'Ishika sharing a bright smile in a candid frame', caption: 'One glance, and the whole page feels lighter.', date: 'June 2024', accent: 'gold' },
  { alt: 'Ishika in a sweet portrait with festive energy', caption: 'A soft little frame with big birthday energy.', date: 'June 2024', accent: 'sky' },
  { alt: 'Ishika looking radiant in a polished portrait', caption: 'Radiance that never needs to try too hard.', date: 'July 2024', accent: 'rose' },
  { alt: 'Ishika in a cheerful portrait captured mid-moment', caption: 'Caught between a smile and a story.', date: 'July 2024', accent: 'peach' },
  { alt: 'Ishika posing with a calm and confident expression', caption: 'Calm confidence with a hint of mischief.', date: 'August 2024', accent: 'gold' },
  { alt: 'Ishika in a joyful vertical portrait', caption: 'The kind of joy that looks good from every angle.', date: 'August 2024', accent: 'sky' },
  { alt: 'Ishika in an intimate close portrait', caption: 'A quiet frame that still steals the spotlight.', date: 'September 2024', accent: 'rose' },
  { alt: 'Ishika sharing a warm expression in a candid photo', caption: 'Warmth that reaches the screen before the words do.', date: 'September 2024', accent: 'peach' },
  { alt: 'Ishika in a crisp portrait with birthday styling', caption: 'Sharp lines, soft mood, perfect balance.', date: 'October 2024', accent: 'gold' },
  { alt: 'Ishika in a natural portrait with festive softness', caption: 'A little blush, a little shine, a lot of charm.', date: 'October 2024', accent: 'sky' },
  { alt: 'Ishika smiling in a bright candid image', caption: 'A bright memory wrapped in rose-gold light.', date: 'October 2024', accent: 'rose' },
  { alt: 'Ishika in a relaxed portrait during a happy moment', caption: 'This one feels like comfort dressed up nicely.', date: 'November 2024', accent: 'peach' },
  { alt: 'Ishika in a square portrait with playful styling', caption: 'Playful edges, polished mood, all heart.', date: 'November 2024', accent: 'gold' },
  { alt: 'Ishika looking radiant in a square memory frame', caption: 'Proof that sweetness can look cinematic.', date: 'November 2024', accent: 'sky' },
  { alt: 'Ishika in a polished portrait with glowing makeup', caption: 'A frame that glows before it even loads.', date: 'December 2024', accent: 'rose' },
  { alt: 'Ishika smiling in a close portrait with festive warmth', caption: 'A festive little pause captured perfectly.', date: 'December 2024', accent: 'peach' },
  { alt: 'Ishika in a candid web portrait with joyful expression', caption: 'Pure joy, saved in one neat square.', date: 'December 2024', accent: 'gold' },
  { alt: 'Ishika in a bright portrait that feels celebratory', caption: 'The mood board for a beautiful birthday.', date: 'January 2025', accent: 'sky' },
  { alt: 'Ishika in a sweet portrait with soft focus background', caption: 'Soft focus, strong presence, lovely result.', date: 'January 2025', accent: 'rose' },
  { alt: 'Ishika captured in a classic portrait with warm tones', caption: 'Classic energy with a modern little sparkle.', date: 'January 2025', accent: 'peach' },
  { alt: 'Ishika in a vibrant portrait with bold styling', caption: 'A bright memory with birthday-card energy.', date: 'January 2025', accent: 'gold' },
  { alt: 'Ishika in a polished portrait with subtle elegance', caption: 'Elegance that feels effortless every single time.', date: 'February 2025', accent: 'sky' },
  { alt: 'Ishika smiling in a rich-toned portrait', caption: 'A smile worthy of confetti and a standing ovation.', date: 'February 2025', accent: 'rose' },
  { alt: 'Ishika in a glowing portrait with playful warmth', caption: 'Playful warmth, wrapped in champagne light.', date: 'February 2025', accent: 'peach' },
  { alt: 'Ishika in a soft portrait with charming expression', caption: 'The kind of frame that quietly becomes a favorite.', date: 'February 2025', accent: 'gold' },
  { alt: 'Ishika in a portrait with glossy celebratory styling', caption: 'Glossy, glowing, and very birthday-ready.', date: 'March 2025', accent: 'sky' },
  { alt: 'Ishika smiling in a warm-toned portrait', caption: 'A warm-toned memory that feels full of music.', date: 'March 2025', accent: 'rose' },
  { alt: 'Ishika in a lively portrait with bright light', caption: 'Bright light, brighter energy, best combination.', date: 'March 2025', accent: 'peach' },
  { alt: 'Ishika in a soft candid portrait with gentle color palette', caption: 'A soft candid that still lands like fireworks.', date: 'March 2025', accent: 'gold' },
  { alt: 'Ishika in a portrait with rich textures and warm styling', caption: 'Textured, tender, and a little bit dreamy.', date: 'April 2025', accent: 'sky' },
  { alt: 'Ishika in a polished portrait with a subtle smile', caption: 'A subtle smile with unforgettable timing.', date: 'April 2025', accent: 'rose' },
  { alt: 'Ishika in a bright portrait with festive elegance', caption: 'Festive without trying, elegant without effort.', date: 'April 2025', accent: 'peach' },
  { alt: 'Ishika captured in a joyful birthday-inspired portrait', caption: 'This one feels like cake, flowers, and applause.', date: 'May 2025', accent: 'gold' },
  { alt: 'Ishika in a portrait with calm poise and soft light', caption: 'Poise, softness, and a little birthday magic.', date: 'May 2025', accent: 'sky' },
  { alt: 'Ishika in a delicate portrait with warm eye contact', caption: 'A delicate frame with an unmistakable spark.', date: 'May 2025', accent: 'rose' },
  { alt: 'Ishika smiling naturally in a bright portrait', caption: 'Natural joy always photographs the best.', date: 'June 2025', accent: 'peach' },
  { alt: 'Ishika in a polished close portrait with a soft glow', caption: 'A soft glow and a full heart in one shot.', date: 'June 2025', accent: 'gold' },
  { alt: 'Ishika in a celebratory portrait with a playful mood', caption: 'Playful enough for balloons, polished enough for a frame.', date: 'June 2025', accent: 'sky' },
  { alt: 'Ishika in a dreamy portrait with rose-gold tones', caption: 'Rose-gold tones for a rose-gold kind of presence.', date: 'July 2025', accent: 'rose' },
  { alt: 'Ishika in a portrait with a calm confident smile', caption: 'The calm confidence of someone easy to celebrate.', date: 'July 2025', accent: 'peach' },
  { alt: 'Ishika in a joyful portrait with bright highlights', caption: 'A little brighter, a little bolder, still all grace.', date: 'July 2025', accent: 'gold' },
  { alt: 'Ishika in a portrait with warm shadows and festive color', caption: 'Warm shadows, sweet color, unforgettable frame.', date: 'August 2025', accent: 'sky' },
  { alt: 'Ishika looking radiant in a relaxed portrait', caption: 'Relaxed, radiant, and quietly iconic.', date: 'August 2025', accent: 'rose' },
  { alt: 'Ishika smiling in a portrait with a gentle pastel palette', caption: 'Pastel palette, full personality, perfect finish.', date: 'August 2025', accent: 'peach' },
  { alt: 'Ishika in a portrait with celebratory softness and light', caption: 'A frame that feels like birthday wishes taking shape.', date: 'September 2025', accent: 'gold' },
  { alt: 'Ishika in a portrait with a graceful expression and glow', caption: 'Grace, glow, and one last lovely memory for the page.', date: 'September 2025', accent: 'sky' },
];

export const galleryItems: GalleryItem[] = galleryFiles.map((file, index) => ({
  id: index + 1,
  src: `/images/${file}`,
  ...(galleryMeta[index] ?? {
    alt: 'Ishika in a cherished birthday memory',
    caption: 'A cherished birthday memory in full bloom.',
    date: 'September 2025',
    accent: 'rose' as const,
  }),
}));

const videoFiles = Array.from({ length: 20 }, (_, index) => `video${index + 1}.mp4`);
const videoPosterFiles = galleryFiles.slice(0, 20);

const videoMeta: Omit<VideoItem, 'id' | 'src' | 'poster'>[] = [
  { title: 'Birthday laughter reel', caption: 'A playful clip with the exact kind of energy birthdays deserve.', date: 'March 2024', accent: 'rose' },
  { title: 'Golden hour memory', caption: 'A warm moving moment that feels like confetti in slow motion.', date: 'April 2024', accent: 'peach' },
  { title: 'Sweet candid spark', caption: 'Small gestures, bright smile, instantly rewatchable.', date: 'May 2024', accent: 'gold' },
  { title: 'Soft smile loop', caption: 'A tiny clip that somehow keeps the whole mood glowing.', date: 'June 2024', accent: 'sky' },
  { title: 'Carefree little scene', caption: 'The kind of memory that makes the day feel lighter.', date: 'July 2024', accent: 'rose' },
  { title: 'Festival of smiles', caption: 'Bright motion, easy charm, and a perfect reason to press play.', date: 'August 2024', accent: 'peach' },
  { title: 'Birthday-card energy', caption: 'This one feels handpicked for a celebration page.', date: 'September 2024', accent: 'gold' },
  { title: 'Little burst of joy', caption: 'A cheerful scene that belongs beside balloons and cake.', date: 'October 2024', accent: 'sky' },
  { title: 'Warm memory in motion', caption: 'A moving snapshot with a calm and lovely glow.', date: 'November 2024', accent: 'rose' },
  { title: 'Playful highlight', caption: 'A quick burst of fun that keeps the page feeling alive.', date: 'December 2024', accent: 'peach' },
  { title: 'Shine and shimmer', caption: 'A sweet highlight with a polished birthday feel.', date: 'January 2025', accent: 'gold' },
  { title: 'A frame full of charm', caption: 'The motion version of a really good candid.', date: 'February 2025', accent: 'sky' },
  { title: 'Lighthearted loop', caption: 'Soft, bright, and easy to keep replaying.', date: 'March 2025', accent: 'rose' },
  { title: 'Champagne glow clip', caption: 'A little luxurious, a little playful, very memorable.', date: 'April 2025', accent: 'peach' },
  { title: 'Birthday breeze moment', caption: 'The kind of motion that makes the whole page feel breezier.', date: 'May 2025', accent: 'gold' },
  { title: 'Heartfelt little highlight', caption: 'Quietly charming and full of the right kind of warmth.', date: 'June 2025', accent: 'sky' },
  { title: 'Joy in motion', caption: 'A bright little reminder that celebration can be soft too.', date: 'July 2025', accent: 'rose' },
  { title: 'Rose-gold replay', caption: 'A polished memory with just enough sparkle to linger.', date: 'August 2025', accent: 'peach' },
  { title: 'Best-day energy', caption: 'One more clip that keeps the birthday mood turned all the way up.', date: 'September 2025', accent: 'gold' },
  { title: 'Final moving keepsake', caption: 'A closing little memory to round out the collection beautifully.', date: 'September 2025', accent: 'sky' },
];

export const videoItems: VideoItem[] = videoFiles.map((file, index) => ({
  id: index + 1,
  src: `/videos/${file}`,
  poster: `/images/${videoPosterFiles[index]}`,
  ...videoMeta[index],
}));

export const messageBlocks: MessageBlock[] = [
  {
    id: 'warmth',
    eyebrow: 'Birthday Wish',
    title: 'Happy Birthday, Ishika.',
    body:
      'May this year feel gentle in the best ways: more laughter, better surprises, calmer nights, brighter mornings, and the kind of happiness that stays.',
  },
  {
    id: 'presence',
    eyebrow: 'What Stays',
    title: 'You make ordinary moments feel lighter.',
    body:
      'There is a softness to your presence and a spark to your energy. Even in a quiet frame, you still manage to make everything feel a little more alive.',
  },
  {
    id: 'celebration',
    eyebrow: 'For Today',
    title: 'You deserve a celebration that feels as lovely as you are.',
    body:
      'Cake, candles, music, flowers, long compliments, and a whole page of affection feel like the minimum. This space is built to look back at you with joy.',
  },
  {
    id: 'heartfelt',
    eyebrow: 'From The Heart',
    title: 'Some people become memories. You became a favorite chapter.',
    body:
      'That is why the deeper words live later in the scroll. First comes the celebration. Then comes the part that says, quietly and honestly, how much your existence matters.',
  },
];

export const timelineMoments: TimelineMoment[] = [
  {
    id: 'hello',
    title: "That first 'Heyyy'",
    date: 'March 2024',
    body: 'A tiny beginning with unexpectedly big energy. It felt playful, direct, and memorable from the very start.',
    accent: 'rose',
  },
  {
    id: 'movie',
    title: 'The old movie conversation',
    date: 'March 2024',
    body: 'Humor showed up early. It made everything easier, lighter, and much more real.',
    accent: 'peach',
  },
  {
    id: 'truth',
    title: 'The honest moment',
    date: 'October 2024',
    body: 'The conversation that proved tenderness and truth can live in the same sentence.',
    accent: 'gold',
  },
  {
    id: 'wish',
    title: 'Your warm wish',
    date: 'October 2024',
    body: 'A simple blessing said with care. The kind of line that stays with someone longer than expected.',
    accent: 'sky',
  },
  {
    id: 'today',
    title: 'Today',
    date: 'Birthday season',
    body: 'A page, a celebration, and a reminder that some people are genuinely worth honoring beautifully.',
    accent: 'rose',
  },
];

export const collectionItems: CollectionItem[] = [
  ...galleryItems.map((item) => ({ kind: 'image' as const, ...item })),
  ...videoItems.map((item) => ({ kind: 'video' as const, ...item })),
];
