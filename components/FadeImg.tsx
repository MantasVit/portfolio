import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export function FadeImg(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  const onLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      setLoaded(true);
    }
  }, []);

  const className = `${props.className} ${loaded ? "loaded" : "loading"}`;

  return <img loading={"lazy"} {...props} ref={ref} onLoad={onLoad} className={className} />;
}
