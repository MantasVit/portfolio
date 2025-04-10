/* eslint-disable react/no-unescaped-entities */
import "./style.scss";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "@fontsource/abel";
import "@fontsource/quicksand/300.css";
import "@fontsource/nunito";
import "@fontsource/nunito/300.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import imgLevelEditor from "../assets/ft_leveleditor.jpg";
import imgBillboarders from "../assets/billboarders.png";
import imgHighwayCrash from "../assets/highway-crash.png";
import videoBillboarders from "../assets/billboarders-video.mp4";
import posterBillboarders from "../assets/billboarders-video-poster.jpg";
import gifBillboardersBehaviourTree from "../assets/billboarders-behaviour-tree.gif";
import { FadeImg } from "../components/FadeImg";
import { HighlightItem } from "../components/HighlightItem";
import { EmailLink } from "../components/EmailLink";
import { LazyVideo } from "../components/LazyVideo";

config.autoAddCss = false;

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  const [focusedTocItem, setFocusedTocItem] = useState("");
  const [clickedTocItem, setClickedTocItem] = useState<string | null>(null);
  const [scrolling, setScrolling] = useState(false);
  const activeTocItem = clickedTocItem ?? focusedTocItem;

  const isActiveToc = (id: string) => (id === activeTocItem ? "active" : "");

  const tocEntries = useMemo<Record<string, { name: string; wrap?: boolean; indent?: number }>>(
    () => ({
      "about-me": {
        name: "About me",
      },
      billboarders: {
        name: "Billboarders",
      },
      "billboarders-behaviour-tree": {
        name: "Behaviour Tree",
        indent: 1,
      },
      "billboarders-game-object-pool": {
        name: "Game Object pooling",
        indent: 1,
      },
      "billboarders-event-bus": {
        name: "Event Bus",
        indent: 1,
      },
      "billboarders-game-systems": {
        name: "Game Systems",
        indent: 1,
      },
      "billboarders-navmesh-solution": {
        name: "NavMesh solution",
        indent: 1,
      },
      "billboarders-3d-depth-effect": {
        name: "3D Depth effect",
        indent: 1,
      },
      "highway-crash": {
        name: "Highway Crash",
      },
      "planetary-exploration": {
        name: "Planetary Exploration",
      },
      "conquered-lands": {
        name: "Conquered lands",
      },
    }),
    [],
  );

  const visibleTocEntries = useRef<Record<string, boolean>>({});

  const onHashChange = useCallback(() => {
    if (!window.location.hash) {
      setClickedTocItem(null);
      return;
    }

    const id = window.location.hash.substring(1);
    if (!(id in tocEntries)) {
      setClickedTocItem(null);
      return;
    }

    setClickedTocItem(id);
  }, [tocEntries]);

  const tocItem = (id: string) => {
    const item = tocEntries[id];
    const { name, indent } = item;
    const wrap = item.wrap ?? false;

    return (
      <li key={id} className={`${wrap ? "" : "nowrap"} ${indent ? `indent-${indent}` : ""} ${isActiveToc(id)}`}>
        <a
          href={`#${id}`}
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = "#" + id;
            // call onHashChange explicitly in case the hash was already set to this value
            onHashChange();
          }}
        >
          {name}
        </a>
      </li>
    );
  };

  const revalidateClickedItem = useCallback(() => {
    setClickedTocItem((prevClickedTocItem) => {
      if (prevClickedTocItem == null) {
        return null;
      }
      if (!visibleTocEntries.current[prevClickedTocItem]) {
        return null;
      }

      return prevClickedTocItem;
    });
  }, []);

  const onVisibleChange = useCallback(
    (entry: IntersectionObserverEntry) => {
      const id = entry.target.id;
      if (id == null || !(id in tocEntries)) {
        return;
      }

      visibleTocEntries.current[id] = entry.isIntersecting;

      let visibleTocEntry = null;
      for (const key of Object.keys(tocEntries)) {
        const visible = visibleTocEntries.current[key] ?? false;
        if (visible) {
          visibleTocEntry = key;
          break;
        }
      }

      if (visibleTocEntry != null) {
        setFocusedTocItem(visibleTocEntry);
      }

      if (!scrolling) {
        revalidateClickedItem();
      }
    },
    [revalidateClickedItem, scrolling, tocEntries],
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => onVisibleChange(entry));
    }, options);

    for (const key of Object.keys(tocEntries)) {
      const elem = document.querySelector("#" + key);
      if (elem != null) {
        observer.observe(elem);
      }
    }

    const onScroll = () => {
      setScrolling(true);
    };

    const onScrollEnd = () => {
      setScrolling(false);
      revalidateClickedItem();
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("scrollend", onScrollEnd);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHashChange);
      window.addEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, [onHashChange, onVisibleChange, revalidateClickedItem, tocEntries]);

  return (
    <div>
      {/*<div className={"topbar"}>*/}
      {/*  <div className={"logo"}>Mantas Vitkevicius</div>*/}
      {/*  <div className={"item"}>*/}
      {/*    <FontAwesomeIcon icon={faLightbulb} /> Wassup*/}
      {/*  </div>*/}
      {/*  <div className={"item"}>*/}
      {/*    <FontAwesomeIcon icon={faUsers} /> More stuff*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div id={"page-content"}>
        <div id={"intro-section"}>
          <div className={"slide-image-container"}>
            <FadeImg src={posterBillboarders} className={"slide-image"} />
            <div className={"slide-image-overlay"} />
          </div>

          <div className={"intro"}>
            <div className={"text"}>
              <h1>Mantas Vitkevicius</h1>
            </div>
            <div className={"highlights"}>
              <div className={"row"}>
                <div className={"col"}>
                  <div className={"block"} onClick={(e) => (window.location.hash = "#billboarders")}>
                    <FadeImg className={"image"} src={imgBillboarders} alt={"Billboarders"} />
                    <div className={"content"}>
                      <h2>Billboarders</h2>
                      <HighlightItem>C#</HighlightItem>
                      <HighlightItem>Unity</HighlightItem>
                      <HighlightItem>Team project</HighlightItem>
                      <HighlightItem>Published</HighlightItem>
                    </div>
                  </div>
                </div>
                <div className={"col"}>
                  <div className={"block"} onClick={(e) => (window.location.hash = "#highway-crash")}>
                    <FadeImg className={"image"} src={imgHighwayCrash} alt={"Highway Crash"} />
                    <div className={"content"}>
                      <h2>Highway Crash</h2>
                      <HighlightItem>C#</HighlightItem>
                      <HighlightItem>Unity</HighlightItem>
                      <HighlightItem>Published</HighlightItem>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"row"}>
                <div className={"col"}>
                  <div className={"block"} onClick={(e) => (window.location.hash = "#planetary-exploration")}>
                    <FadeImg className={"image"} src={imgLevelEditor} alt={"Planetary Exploration"} />
                    <div className={"content"}>
                      <h2>Planetary Exploration Nanobot</h2>
                      <HighlightItem>C++</HighlightItem>
                      <HighlightItem>Unreal Engine</HighlightItem>
                      <HighlightItem>Team project</HighlightItem>
                    </div>
                  </div>
                </div>
                <div className={"col"}>
                  <div className={"block"}>
                    <FadeImg className={"image"} src={imgLevelEditor} alt={"Level editor"} />
                    <div className={"content"}>
                      <h2>Vehicle system</h2>
                      <HighlightItem>C#</HighlightItem>
                      <HighlightItem>Unity</HighlightItem>
                      <HighlightItem>Research project</HighlightItem>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={"background-section"} id={"about-me"}>
          <h1 className={"heading"}>About me</h1>
          <div className={"text"}>
            <p>
              Hi, I'm Mantas Vitkevicius — a game developer with hands-on experience shipping games and a strong focus
              on gameplay programming and systems design.
            </p>

            <p>
              I've worked on both solo and collaborative projects using Unity (C#) and Unreal Engine (C++), including
              commercially released mobile titles with 4,000+ downloads and 4.5★ ratings. I've built everything from
              behaviour trees and procedural generation systems to multiplayer networking and in-game economies — always
              writing clean, modular code and learning fast along the way.
            </p>

            <p>
              I'm excited about creating engaging and well-designed games, and I'm looking for new opportunities to grow
              and contribute to a team. If you're looking for someone who's eager to learn and make an impact, I'd love
              to connect: <EmailLink />
            </p>
          </div>
        </div>

        <div className={"main-section"}>
          <div className={"content"}>
            <div id={"billboarders"}>
              <h1 className={"heading"}>Billboarders</h1>
              <div>
                <LazyVideo
                  src={videoBillboarders}
                  poster={posterBillboarders}
                  style={{
                    width: "100%",
                    aspectRatio: 1920 / 1080,
                  }}
                />
              </div>
              <div>
                <strong>Platform(s):</strong> Mobile/WebGL
              </div>
              <div>
                <strong>Team Size:</strong> 3
              </div>
              <div>
                <strong>Primary role(s):</strong> Gameplay programming/design
              </div>
              <p>
                Billboarders is a commercially released project developed alongside two artists. It is an idle game with
                a unique blend of 2D and 3D features.
              </p>
            </div>

            <div id={"billboarders-behaviour-tree"}>
              <h2 className={"heading"}>Behaviour Tree</h2>
              <p>
                <FadeImg
                  src={gifBillboardersBehaviourTree}
                  style={{
                    width: "100%",
                    aspectRatio: 818 / 447,
                  }}
                />
              </p>
              <p>
                I implemented a behaviour tree system that can be applied to any object that requires specific
                behaviours. Essentially it is a list of nodes that is being processed in order. Some of the features the
                tree includes:
              </p>
              <div>
                <ul>
                  <li>
                    <strong>Behaviour strategies:</strong> behaviour strategies can be customly designed. It could be a
                    condition that processes a boolean, returning success or failure. It could be a movement strategy
                    that takes a Vector3 position of the destination and a NavMeshAgent on which the movement will be
                    processed. There are many possibilities depending on what behaviours are required.
                  </li>
                  <li>
                    <strong>Leaf:</strong> Leafs take one strategy argument per leaf to define what behaviour will be
                    processed.
                  </li>
                  <li>
                    <strong>Sequence:</strong> Used to define a sequence of behaviours. As an example you may want a
                    behaviour where a boolean is checked, before moving a character to position, in this case the
                    boolean has to return success before moving to the movement strategy.
                  </li>
                  <li>
                    <strong>Priority selector:</strong> Allows setting priorities on behaviours using an int value as
                    certain behaviours may be more urgent than others.
                  </li>
                </ul>
              </div>
            </div>

            <div id={"billboarders-game-object-pooling"}>
              <h2 className={"heading"}>Game Object pooling</h2>
            </div>

            <div id={"billboarders-event-bus"}>
              <h2 className={"heading"}>Event Bus</h2>
            </div>

            <div id={"billboarders-game-systems"}>
              <h2 className={"heading"}>Game Systems</h2>
            </div>

            <div id={"billboarders-navmesh-solution"}>
              <h2 className={"heading"}>NavMesh solution</h2>
            </div>

            <div id={"billboarders-3d-depth-effect"}>
              <h2 className={"heading"}>3D Depth effect</h2>
            </div>

            <div id={"highway-crash"}>
              <h2 className={"heading"}>Highway Crash</h2>
              <p>
                Nullam sed lorem leo. Morbi dictum elit eu tincidunt sagittis. Nulla gravida, leo in aliquam maximus,
                lorem nibh tincidunt dui, vel imperdiet augue ante eu lacus. Donec suscipit nec diam vel accumsan. Sed
                pretium, arcu eget blandit posuere, lorem velit placerat sapien, sed dictum lacus tortor ut enim.
                Praesent in quam semper, laoreet felis nec, euismod ipsum. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Nulla eleifend egestas nisl at molestie. In sem nisl, pretium
                non elit id, ornare feugiat massa. Quisque maximus nibh ac rutrum mattis. Curabitur quis vestibulum
                nibh.
              </p>
              <p>
                Integer elementum vitae nulla eu elementum. Integer convallis tellus pellentesque nisl accumsan
                ullamcorper. Sed porttitor sollicitudin dui, nec ultricies lorem efficitur accumsan. Nam vitae tortor
                elit. Proin vestibulum malesuada scelerisque. Aliquam tristique mi diam, dignissim aliquam elit ultrices
                quis. Aliquam erat volutpat.
              </p>
              <p>
                Integer elementum vitae nulla eu elementum. Integer convallis tellus pellentesque nisl accumsan
                ullamcorper. Sed porttitor sollicitudin dui, nec ultricies lorem efficitur accumsan. Nam vitae tortor
                elit. Proin vestibulum malesuada scelerisque. Aliquam tristique mi diam, dignissim aliquam elit ultrices
                quis. Aliquam erat volutpat.
              </p>
              <p>
                Integer elementum vitae nulla eu elementum. Integer convallis tellus pellentesque nisl accumsan
                ullamcorper. Sed porttitor sollicitudin dui, nec ultricies lorem efficitur accumsan. Nam vitae tortor
                elit. Proin vestibulum malesuada scelerisque. Aliquam tristique mi diam, dignissim aliquam elit ultrices
                quis. Aliquam erat volutpat.
              </p>
              <p>
                Integer elementum vitae nulla eu elementum. Integer convallis tellus pellentesque nisl accumsan
                ullamcorper. Sed porttitor sollicitudin dui, nec ultricies lorem efficitur accumsan. Nam vitae tortor
                elit. Proin vestibulum malesuada scelerisque. Aliquam tristique mi diam, dignissim aliquam elit ultrices
                quis. Aliquam erat volutpat.
              </p>
              <p>
                Integer elementum vitae nulla eu elementum. Integer convallis tellus pellentesque nisl accumsan
                ullamcorper. Sed porttitor sollicitudin dui, nec ultricies lorem efficitur accumsan. Nam vitae tortor
                elit. Proin vestibulum malesuada scelerisque. Aliquam tristique mi diam, dignissim aliquam elit ultrices
                quis. Aliquam erat volutpat.
              </p>
              <p>
                Integer elementum vitae nulla eu elementum. Integer convallis tellus pellentesque nisl accumsan
                ullamcorper. Sed porttitor sollicitudin dui, nec ultricies lorem efficitur accumsan. Nam vitae tortor
                elit. Proin vestibulum malesuada scelerisque. Aliquam tristique mi diam, dignissim aliquam elit ultrices
                quis. Aliquam erat volutpat.
              </p>
              <p>
                Integer elementum vitae nulla eu elementum. Integer convallis tellus pellentesque nisl accumsan
                ullamcorper. Sed porttitor sollicitudin dui, nec ultricies lorem efficitur accumsan. Nam vitae tortor
                elit. Proin vestibulum malesuada scelerisque. Aliquam tristique mi diam, dignissim aliquam elit ultrices
                quis. Aliquam erat volutpat.
              </p>
            </div>

            <div id={"planetary-exploration"}>
              <h2 className={"heading"}>Planetary Exploration</h2>
              <p>
                Nullam sed lorem leo. Morbi dictum elit eu tincidunt sagittis. Nulla gravida, leo in aliquam maximus,
                lorem nibh tincidunt dui, vel imperdiet augue ante eu lacus. Donec suscipit nec diam vel accumsan. Sed
                pretium, arcu eget blandit posuere, lorem velit placerat sapien, sed dictum lacus tortor ut enim.
                Praesent in quam semper, laoreet felis nec, euismod ipsum. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Nulla eleifend egestas nisl at molestie. In sem nisl, pretium
                non elit id, ornare feugiat massa. Quisque maximus nibh ac rutrum mattis. Curabitur quis vestibulum
                nibh.
              </p>
              <p>
                Integer elementum vitae nulla eu elementum. Integer convallis tellus pellentesque nisl accumsan
                ullamcorper. Sed porttitor sollicitudin dui, nec ultricies lorem efficitur accumsan. Nam vitae tortor
                elit. Proin vestibulum malesuada scelerisque. Aliquam tristique mi diam, dignissim aliquam elit ultrices
                quis. Aliquam erat volutpat.
              </p>
              <p>
                Integer elementum vitae nulla eu elementum. Integer convallis tellus pellentesque nisl accumsan
                ullamcorper. Sed porttitor sollicitudin dui, nec ultricies lorem efficitur accumsan. Nam vitae tortor
                elit. Proin vestibulum malesuada scelerisque. Aliquam tristique mi diam, dignissim aliquam elit ultrices
                quis. Aliquam erat volutpat.
              </p>
              <p>
                Integer elementum vitae nulla eu elementum. Integer convallis tellus pellentesque nisl accumsan
                ullamcorper. Sed porttitor sollicitudin dui, nec ultricies lorem efficitur accumsan. Nam vitae tortor
                elit. Proin vestibulum malesuada scelerisque. Aliquam tristique mi diam, dignissim aliquam elit ultrices
                quis. Aliquam erat volutpat.
              </p>
              <p>
                Integer elementum vitae nulla eu elementum. Integer convallis tellus pellentesque nisl accumsan
                ullamcorper. Sed porttitor sollicitudin dui, nec ultricies lorem efficitur accumsan. Nam vitae tortor
                elit. Proin vestibulum malesuada scelerisque. Aliquam tristique mi diam, dignissim aliquam elit ultrices
                quis. Aliquam erat volutpat.
              </p>
              <p>
                Integer elementum vitae nulla eu elementum. Integer convallis tellus pellentesque nisl accumsan
                ullamcorper. Sed porttitor sollicitudin dui, nec ultricies lorem efficitur accumsan. Nam vitae tortor
                elit. Proin vestibulum malesuada scelerisque. Aliquam tristique mi diam, dignissim aliquam elit ultrices
                quis. Aliquam erat volutpat.
              </p>
              <p>
                Integer elementum vitae nulla eu elementum. Integer convallis tellus pellentesque nisl accumsan
                ullamcorper. Sed porttitor sollicitudin dui, nec ultricies lorem efficitur accumsan. Nam vitae tortor
                elit. Proin vestibulum malesuada scelerisque. Aliquam tristique mi diam, dignissim aliquam elit ultrices
                quis. Aliquam erat volutpat.
              </p>
              <p>
                Integer elementum vitae nulla eu elementum. Integer convallis tellus pellentesque nisl accumsan
                ullamcorper. Sed porttitor sollicitudin dui, nec ultricies lorem efficitur accumsan. Nam vitae tortor
                elit. Proin vestibulum malesuada scelerisque. Aliquam tristique mi diam, dignissim aliquam elit ultrices
                quis. Aliquam erat volutpat.
              </p>
            </div>

            <div id={"conquered-lands"}>
              <h2 className={"heading"}>Conquered Lands</h2>
              <p>
                Nullam sed lorem leo. Morbi dictum elit eu tincidunt sagittis. Nulla gravida, leo in aliquam maximus,
                lorem nibh tincidunt dui, vel imperdiet augue ante eu lacus. Donec suscipit nec diam vel accumsan. Sed
                pretium, arcu eget blandit posuere, lorem velit placerat sapien, sed dictum lacus tortor ut enim.
                Praesent in quam semper, laoreet felis nec, euismod ipsum. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Nulla eleifend egestas nisl at molestie. In sem nisl, pretium
                non elit id, ornare feugiat massa. Quisque maximus nibh ac rutrum mattis. Curabitur quis vestibulum
                nibh.
              </p>
              <p>
                Integer elementum vitae nulla eu elementum. Integer convallis tellus pellentesque nisl accumsan
                ullamcorper. Sed porttitor sollicitudin dui, nec ultricies lorem efficitur accumsan. Nam vitae tortor
                elit. Proin vestibulum malesuada scelerisque. Aliquam tristique mi diam, dignissim aliquam elit ultrices
                quis. Aliquam erat volutpat.
              </p>
            </div>
          </div>
          <div className={"toc"}>
            <h5>CONTENTS</h5>
            <div className={"list-wrapper"}>
              <ol>{Object.keys(tocEntries).map(tocItem)}</ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
