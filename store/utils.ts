export function pickRandomItem<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export const setMediaSessionAction = (
  event: MediaSessionAction,
  callback: () => void,
) => {
  if (!("mediaSession" in navigator)) {
    return;
  }
  navigator.mediaSession.setActionHandler(event, callback);
};

export const setMediaSessionData = (
  state: "playing" | "loading" | "failed",
  options?: {
    title?: string;
    artist?: string;
    countryCode?: string;
  },
) => {
  if (!("mediaSession" in navigator)) {
    return;
  }

  let { title = "", artist = "" } = options || {};
  let artwork: MediaImage[] = [];

  if (state === "loading") {
    title = "Loading";
    artist = "random channel";
    artwork = [
      {
        src: "https://www.pngall.com/wp-content/uploads/14/Loading-PNG-Pic.png",
        type: "image/png",
        sizes: "333x250",
      },
    ];
  }

  if (state === "failed") {
    title = "Failed to load";
    artwork = [
      {
        src: "https://www.iconpacks.net/icons/1/free-error-icon-905-thumb.png",
        type: "image/png",
        sizes: "333x250",
      },
    ];
  }

  if (state === "playing") {
    artwork = [
      {
        src: `https://raw.githubusercontent.com/hampusborgos/country-flags/main/png250px/${options?.countryCode}.png`,
        type: "image/png",
        sizes: "333x250",
      },
    ];
  }

  navigator.mediaSession.metadata = new MediaMetadata({
    title,
    artist,
    artwork,
  });
};
