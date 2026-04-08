import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export {
  collectionItems,
  galleryItems,
  messageBlocks,
  timelineMoments,
  videoItems,
} from '@/lib/content';
export { galleryItems as imageData, videoItems as videoData } from '@/lib/content';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
