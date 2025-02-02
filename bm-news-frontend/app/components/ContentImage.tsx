import SanityImageWrapper from "./SanityImageWrapper";

export default function ContentImage({ image, sanityProjectId, sanityDataset, ...rest }) {
  return (
    <figure>
      <SanityImageWrapper image={image} sanityProjectId={sanityProjectId} sanityDataset={sanityDataset} {...rest} />
      <figcaption><small>{image.caption}</small></figcaption>
    </figure>
  )
}

