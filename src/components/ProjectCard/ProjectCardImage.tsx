import Image, { ImageProps } from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface ProjectCardImageProps
  extends Omit<ImageProps, "placeholder" | "placeholderURL" | "src"> {
  placeholderElement?: React.ReactElement;
  src?: string;
  alt: string;
}

function ProjectCardImage(props: ProjectCardImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const { placeholderElement, alt, src, ...originalImageProps } = props;

  const handleLoad = () => setLoaded(true);

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) handleLoad();
  }, []);

  if (!src) return <div>{placeholderElement}</div>;
  return (
    <>
      {!loaded && <div>{placeholderElement}</div>}
      <div className={loaded ? "visible" : "collapse"}>
        <Image
          alt={alt}
          ref={imageRef}
          src={src}
          {...originalImageProps}
          loading={"eager"}
          onLoadingComplete={handleLoad}
        />
      </div>
    </>
  );
}

export default ProjectCardImage;
