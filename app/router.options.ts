import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  routes: (_routes) => [
    {
      path: "/",
      component: () =>
        import("../pages/countries.vue").then((r) => r.default || r),
      children: [
        {
          path: "/:country",
          component: () =>
            import("../pages/places.vue").then((r) => r.default || r),
          children: [
            {
              path: "/:country/:place",
              component: () =>
                import("../pages/channels.vue").then((r) => r.default || r),
              children: [
                {
                  path: "/:country/:place/:channel",
                  component: () =>
                    import("../pages/stub.vue").then((r) => r.default || r),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
