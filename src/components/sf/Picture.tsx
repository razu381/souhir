import type { Plate } from '@/content/seed';

/**
 * Picture — a Plate as an <img>, or as a <picture> when the plate carries an
 * art-directed handset crop (`plate.mobile`, the banner bands). The <picture>
 * renders `display: contents` (.sf-picture), so every existing `.x img` rule
 * keeps sizing the img against the same box it always has.
 */
export default function Picture({
  plate,
  className,
  loading = 'lazy',
}: {
  plate: Plate;
  className?: string;
  loading?: 'lazy' | 'eager';
}) {
  const img = (
    <img
      className={className}
      src={plate.src}
      srcSet={plate.srcSet}
      sizes={plate.sizes}
      alt={plate.alt}
      width={plate.width}
      height={plate.height}
      loading={loading}
      decoding="async"
    />
  );
  if (!plate.mobile) return img;
  return (
    <picture className="sf-picture">
      <source
        media="(max-width: 767px)"
        srcSet={plate.mobile.srcSet}
        sizes={plate.mobile.sizes}
        width={plate.mobile.width}
        height={plate.mobile.height}
      />
      {img}
    </picture>
  );
}
