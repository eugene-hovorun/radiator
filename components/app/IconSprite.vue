<template>
  <svg width="0" height="0" style="display: none">
    <defs>
      <symbol id="arrow-right" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m9 5l7 7l-7 7"
        ></path>
      </symbol>

      <symbol id="arrow-left" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m15 19l-7-7l7-7"
        ></path>
      </symbol>

      <symbol id="heart-outline" viewBox="0 0 512 512">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
          d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81c-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0 0 18 0c96.26-65.34 184.09-143.09 183-252.42c-.54-52.67-42.32-96.81-95.08-96.81"
        ></path>
      </symbol>

      <symbol id="heart" viewBox="0 0 512 512">
        <path
          fill="currentColor"
          d="M256 448a32 32 0 0 1-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8c-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 0 0 9.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64c.54 54.21-18.63 104.26-58.61 153c-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 0 1-18 5.56"
        ></path>
      </symbol>

      <symbol id="menu-alt-right" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z"
        ></path>
      </symbol>

      <symbol id="search" viewBox="0 0 512 512">
        <path
          fill="currentColor"
          d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0 0 34.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 0 0 327.3 362.6l94.09 94.09a25 25 0 0 0 35.3-35.3M97.92 222.72a124.8 124.8 0 1 1 124.8 124.8a124.95 124.95 0 0 1-124.8-124.8"
        ></path>
      </symbol>

      <symbol id="copy" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 9V6.2c0-1.12 0-1.68.218-2.108c.192-.377.497-.682.874-.874C10.52 3 11.08 3 12.2 3h5.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 4.52 21 5.08 21 6.2v5.6c0 1.12 0 1.68-.218 2.108a2.002 2.002 0 0 1-.874.874C19.48 15 18.92 15 17.803 15H15M9 9H6.2c-1.12 0-1.68 0-2.108.218a1.999 1.999 0 0 0-.874.874C3 10.52 3 11.08 3 12.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h5.607c1.117 0 1.676 0 2.104-.218a2 2 0 0 0 .874-.874c.218-.428.218-.987.218-2.105V15M9 9h2.8c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874c.218.427.218.987.218 2.105V15"
        ></path>
      </symbol>

      <symbol id="check" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m6 12l4.243 4.243l8.484-8.486"
        ></path>
      </symbol>

      <symbol id="share" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M5.5 15a3.478 3.478 0 0 0 2.357-.93l6.26 3.577a3.52 3.52 0 1 0 1.026-1.717l-6.26-3.577c.066-.25.102-.509.108-.768l6.15-3.515A3.489 3.489 0 1 0 14 5.5c.004.288.043.575.117.853L8.433 9.6A3.5 3.5 0 1 0 5.5 15Z"
        ></path>
      </symbol>

      <symbol id="shuffle" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m18 20l3-3m0 0l-3-3m3 3h-4a5 5 0 0 1-5-5a5 5 0 0 0-5-5H3m15-3l3 3m0 0l-3 3m3-3h-4a4.978 4.978 0 0 0-3 1M3 17h4a4.978 4.978 0 0 0 3-1"
        ></path>
      </symbol>

      <symbol id="close" viewBox="0 0 512 512">
        <path
          fill="currentColor"
          d="m289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34Z"
        ></path>
      </symbol>

      <symbol id="unavailable" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 20a8 8 0 0 1-8-8H2c0 5.523 4.477 10 10 10zm0-16a8 8 0 0 1 8 8h2c0-5.523-4.477-10-10-10zm-8 8a7.97 7.97 0 0 1 2.343-5.657L4.93 4.93A9.972 9.972 0 0 0 2 11.999zm2.343-5.657A7.972 7.972 0 0 1 12 4V2a9.972 9.972 0 0 0-7.071 2.929zm-1.414 0l12.728 12.728l1.414-1.414L6.343 4.929zM20 12a7.97 7.97 0 0 1-2.343 5.657l1.414 1.414A9.972 9.972 0 0 0 22 12zm-2.343 5.657A7.972 7.972 0 0 1 12 20v2a9.972 9.972 0 0 0 7.071-2.929z"
        ></path>
      </symbol>

      <symbol id="play" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M6.906 4.537A.6.6 0 0 0 6 5.053v13.894a.6.6 0 0 0 .906.516l11.723-6.947a.6.6 0 0 0 0-1.032z"
        ></path>
      </symbol>

      <symbol id="pause" viewBox="0 0 32 32">
        <path
          fill="currentColor"
          d="M12 6h-2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m10 0h-2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2"
        ></path>
      </symbol>

      <symbol id="loading" viewBox="0 0 42 42">
        <circle
          class="loading-circle"
          cx="21"
          cy="21"
          r="19"
          fill="none"
          stroke="currentColor"
          stroke-width="4"
          stroke-dasharray="10 5"
        ></circle>
      </symbol>

      <symbol id="swatch" viewBox="0 0 24 24">
        <path
          transform="translate(1 1)"
          d="M4.5 20H18.4706C18.763 20 19.0002 19.7631 19.0002 19.4707L19 13.5293M5.98047 19.6713L18.6421 13.7671C18.9071 13.6435 19.0217 13.3285 18.8981 13.0635L16.3872 7.6792C16.2636 7.41421 15.9486 7.29914 15.6836 7.42271L10.0303 10.0591M7.88182 17.4048C7.38152 19.2719 5.46235 20.38 3.59521 19.8797C1.72808 19.3794 0.619816 17.4604 1.12011 15.5933L4.73596 2.09863C4.81163 1.81621 5.10168 1.64855 5.3841 1.72422L11.1231 3.26171C11.4055 3.33738 11.5731 3.6276 11.4974 3.91002L7.88182 17.4048ZM4.5 16.6001H4.502L4.50195 16.6021L4.5 16.6021V16.6001Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </symbol>
    </defs>
  </svg>
</template>
