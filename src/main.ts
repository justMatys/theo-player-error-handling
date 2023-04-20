import "./style.css";
import { ChromelessPlayer } from "theoplayer";

const element = document.querySelector("#player") as HTMLElement;
const playButtonElement = document.querySelector(
  "#play-button"
) as HTMLButtonElement;
const errorsElement = document.querySelector("#errors") as HTMLButtonElement;

const player = new ChromelessPlayer(element, {
  libraryLocation: "/node_modules/theoplayer/",
});

const displayError = ({
  type,
  code,
  message,
}: {
  type: string;
  code?: number;
  message: string;
}) => {
  const errorElement = document.createElement("div");
  errorElement.className = "error";
  errorElement.innerHTML = `${new Date().toLocaleTimeString()} | ${type}${
    code ? ":" + code : ""
  } | ${message}`;
  errorsElement.append(errorElement);
};

player.addEventListener("error", (event) => {
  displayError({
    type: event.type,
    code: event.errorObject.code,
    message: event.errorObject.message,
  });
});

player.network.addEventListener("offline", (event) => {
  displayError({
    type: event.type,
    message: "You are offline.",
  });
});

player.ads?.addEventListener("aderror", (event) => {
  displayError({
    type: event.type,
    code: (event as any).code,
    message: (event as any).message,
  });
});

player.source = {
  sources: [
    {
      src: "//cdn.theoplayer.com/video/NOT_EXISTING_PATH/index.m3u8",
      type: "application/x-mpegurl",
    },
    // {
    //   src: "//cdn.theoplayer.com/video/star_wars_episode_vii-the_force_awakens_official_comic-con_2015_reel_(2015)/index.m3u8",
    //   type: "application/x-mpegurl",
    // },
  ],
  ads: [
    // {
    //   sources: "//cdn.theoplayer.com/demos/ads/vast/NOT_EXISTING_PATH.xml",
    //   timeOffset: "start",
    // },
    {
      sources: "//cdn.theoplayer.com/demos/ads/vast/vast.xml",
      timeOffset: "start",
    },
  ],
  blockContentIfAdError: true,
};

element.addEventListener("click", () => {
  if (player.paused) {
    playButtonElement.innerHTML = "PAUSE";
    player.play();
    return;
  }

  playButtonElement.innerHTML = "PLAY";
  player.pause();
});
