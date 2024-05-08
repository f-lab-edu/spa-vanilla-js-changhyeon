type routePair = { fragment: string; component: () => string };

export default function createRouter() {
  const routes: routePair[] = [];

  const router = {
    addRoute(fragment: string, component: () => string) {
      routes.push({ fragment, component });
      return this;
    },

    start() {
      const checkRoutes = () => {
        const currentRoute = routes.find(
          (route) => route.fragment === window.location.hash
        ) as routePair;
        currentRoute.component();
      };

      window.addEventListener("hashchange", checkRoutes);
      checkRoutes();
    },
    // navigate(fragment: string) {
    //   window.location.hash = fragment;
    // },
  };

  return router;
}
