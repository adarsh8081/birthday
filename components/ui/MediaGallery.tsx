/**
 * 🎨 PROFESSIONAL MEDIA GALLERY COMPONENT
 * ======================================
 * Displays optimized images and videos with:
 * - Responsive srcset for optimal loading
 * - Lazy loading for performance
 * - Lightbox/modal viewer
 * - Video playback with thumbnails
 * - Masonry/grid layout
 * - Smooth animations
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react';

/**
 * IMAGE GALLERY COMPONENT
 */
export const ImageGallery = ({ images = [], title = "Gallery" }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setSelectedImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-white"
        >
          {title}
        </motion.h2>

        {/* Decorative Line */}
        <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-12 rounded-full" />

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-gray-900 shadow-lg hover:shadow-2xl transition-shadow"
              onClick={() => openLightbox(idx)}
            >
              {/* Image Container */}
              <div className="relative w-full h-full">
                <Image
                  src={image.thumbnail}
                  alt={image.alt || `Gallery image ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%231a1a2e' width='400' height='300'/%3E%3C/svg%3E"
                />
              </div>

              {/* Overlay Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hover Info */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto">
                    <ChevronRight className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white text-sm mt-2">View</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main Image */}
              <Image
                src={images[selectedImageIndex].src || images[selectedImageIndex].thumbnail}
                alt={images[selectedImageIndex].alt || 'Gallery image'}
                fill
                className="object-cover"
                quality={90}
                priority
              />

              {/* Navigation Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/20 backdrop-blur rounded-full text-white text-sm">
                {selectedImageIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/**
 * VIDEO GALLERY COMPONENT
 */
export const VideoGallery = ({ videos = [], title = "Videos" }) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-white"
        >
          {title}
        </motion.h2>

        {/* Decorative Line */}
        <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-12 rounded-full" />

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Video Thumbnail */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative aspect-video rounded-xl overflow-hidden bg-gray-900 cursor-pointer group shadow-lg hover:shadow-2xl transition-shadow"
                onClick={() => setSelectedVideoIndex(idx)}
              >
                {/* Thumbnail Image */}
                {video.thumbnail && (
                  <Image
                    src={video.thumbnail}
                    alt={video.title || `Video ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 bg-white/30 backdrop-blur rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                </div>

                {/* Video Info */}
                {video.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white font-semibold">{video.title}</p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideoIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Player */}
              <video
                key={selectedVideoIndex}
                className="w-full h-full"
                controls
                autoPlay
                controlsList="nodownload"
              >
                <source
                  src={videos[selectedVideoIndex].src}
                  type={videos[selectedVideoIndex].type || 'video/mp4'}
                />
                Your browser does not support the video tag.
              </video>

              {/* Close Button */}
              <button
                onClick={() => setSelectedVideoIndex(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/**
 * COMBINED MEDIA GALLERY (Images + Videos)
 */
export const MediaGallery = ({ images = [], videos = [], imageSectionTitle = "Photos", videoSectionTitle = "Videos Moments" }) => {
  return (
    <div className="w-full">
      <ImageGallery images={images} title={imageSectionTitle} />
      {videos.length > 0 && <VideoGallery videos={videos} title={videoSectionTitle} />}
    </div>
  );
};

/**
 * USAGE EXAMPLE IN YOUR WEBSITE
 * =============================
 * 
 * import { MediaGallery } from '@/components/MediaGallery';
 * 
 * const GALLERY_DATA = {
 *   images: [
 *     {
 *       thumbnail: '/images/moment1-640w.webp',
 *       src: '/images/moment1-1920w.webp',
 *       alt: 'Birthday moment at canteen'
 *     },
 *     // ... more images from metadata.json
 *   ],
 *   videos: [
 *     {
 *       src: '/videos/birthday-dance.mp4',
 *       thumbnail: '/thumbnails/birthday-dance-thumb.jpg',
 *       title: 'Birthday Celebration',
 *       type: 'video/mp4'
 *     },
 *     // ... more videos
 *   ]
 * };
 * 
 * export default function MomentsPage() {
 *   return (
 *     <MediaGallery
 *       images={GALLERY_DATA.images}
 *       videos={GALLERY_DATA.videos}
 *       imageSectionTitle="Our Moments"
 *       videoSectionTitle="Captured Memories"
 *     />
 *   );
 * }
 */

export default MediaGallery;
