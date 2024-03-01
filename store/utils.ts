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

export function highlightMatchedText(searchResult: string, query: string) {
  const lowerCasedSearchResult = searchResult.toLowerCase();
  const lowerCasedQuery = query.toLowerCase();

  const startIndex = lowerCasedSearchResult.indexOf(lowerCasedQuery);

  if (startIndex !== -1) {
    const matchedText = searchResult.substring(
      startIndex,
      startIndex + query.length,
    );
    const highlightedLabel = searchResult.replace(
      matchedText,
      `<span class="search-result">${matchedText}</span>`,
    );
    return highlightedLabel;
  }

  return searchResult;
}

export function hasTouchScreen() {
  return "maxTouchPoints" in navigator && navigator.maxTouchPoints > 0;
}

export function isIos() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
  );
}

export function isMac() {
  return /Mac/.test(navigator.platform);
}

export function addGestureListeners(
  gestureZone: HTMLElement,
  {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap,
  }: {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
    onTap?: () => void;
  },
) {
  if (!hasTouchScreen() || !gestureZone) {
    return;
  }

  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;

  gestureZone.ontouchstart = function (event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  };

  gestureZone.ontouchend = function (event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
  };

  function handleGesture() {
    if (onSwipeLeft && touchendX < touchstartX) {
      onSwipeLeft();
    }

    if (onSwipeRight && touchendX > touchstartX) {
      onSwipeRight();
    }

    if (onSwipeUp && touchendY < touchstartY) {
      onSwipeUp();
    }

    if (onSwipeDown && touchendY > touchstartY) {
      onSwipeDown();
    }

    if (onTap && touchendY === touchstartY) {
      onTap();
    }
  }
}
