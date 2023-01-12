import Image, { ImageProps } from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface ProjectCardImageProps
  extends Omit<ImageProps, "placeholder" | "placeholderURL" | "src"> {
  placeholderElement?: React.ReactElement;
  src?: string;
  alt: string;
}

function ProjectCardImage(props: ProjectCardImageProps) {
  const [loaded, setLoaded] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);
  const { placeholderElement, alt, ...originalImageProps } = props;

  const handleLoad = () => setLoaded(true);

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) handleLoad();
  }, []);

  if (!props.src) return <div>{placeholderElement}</div>;

  return (
    <>
      <div hidden={loaded}>{placeholderElement}</div>
      <Image
        alt={alt}
        ref={imageRef}
        src={props.src}
        {...originalImageProps}
        hidden={!loaded}
        onLoadingComplete={handleLoad}
      />
    </>
  );
}

export default ProjectCardImage;
