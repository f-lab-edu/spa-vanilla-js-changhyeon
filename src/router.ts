const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_REGEXP = "([^\\/]+)";

type routeType = {
  fragmentRegExp: RegExp;
  component: componentType;
  params: string[];
};

type componentType = ((params?: urlParamsType) => string) | (() => string);

export type urlParamsType = Record<string, string>;

export default function createRouter() {
  const routes: routeType[] = [];

  const router = {
    addRoute(fragment: string, component: componentType) {
      const params: string[] = [];
      const parsedFragment = fragment
        .replace(ROUTE_PARAMETER_REGEXP, (_, paramName) => {
          params.push(paramName);
          return URL_REGEXP;
        })
        .replace(/\//g, "\\/");

      routes.push({
        fragmentRegExp: new RegExp(`^${parsedFragment}$`),
        component,
        params,
      });
      return this;
    },

    start() {
      const getUrlParams = (route: routeType, hash: string): urlParamsType => {
        const params: urlParamsType = {};
        const matches = hash.match(route.fragmentRegExp) as RegExpMatchArray;

        matches.shift();
        matches.forEach((paramValue, index) => {
          const paramName = route.params[index];
          params[paramName] = paramValue;
        });
        return params;
      };
      const checkRoutes = () => {
        const currentRoute = routes.find((route) =>
          route.fragmentRegExp.test(window.location.hash)
        ) as routeType;

        if (currentRoute.params.length) {
          const urlParams = getUrlParams(currentRoute, window.location.hash);
          currentRoute.component(urlParams);
        } else {
          currentRoute.component();
        }
      };

      window.addEventListener("hashchange", checkRoutes);
      checkRoutes();
    },
    navigate(fragment: string) {
      window.location.hash = fragment;
    },
  };

  return router;
}
