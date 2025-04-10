import React, { CSSProperties, useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  src: string;
  poster: string;
  style?: CSSProperties | undefined;
  className?: string;
};

export function LazyVideo(props: LazyVideoProps) {
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [preload, setPreload] = useState("metadata");

  const divRef = useRef<HTMLImageElement>(null);

  const onMouseOver = () => {
    setPreload("auto");
    setVisible(true);
    setLoaded(true);
  };

  const onImageLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    if (!divRef.current) {
      setVisible(true);
      setLoaded(true);
      return;
    }

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // We only go visible, never back
          setVisible(true);
          setLoaded(true);
        }
      });
    }, options);

    observer.observe(divRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const className = `${props.className ?? ""} lazy-video ${loaded ? "loaded" : "loading"}`;

  return (
    <div className={className} style={props.style} ref={divRef}>
      {!visible ? (
        <img loading={"lazy"} onMouseOver={onMouseOver} src={props.poster} onLoad={onImageLoad} />
      ) : (
        <video preload={preload} controls={true} onMouseOver={onMouseOver} src={props.src} poster={props.poster} />
      )}
    </div>
  );
}
