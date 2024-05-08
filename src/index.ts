import createRouter from "./router";
import { urlParamsType } from "./router";

const container: HTMLElement = document.querySelector("main") as HTMLElement;
const pages = {
  home: () => (container.innerText = "home page"),
  spotify: () => (container.innerText = "spotify page"),
  board: (params?: urlParamsType) =>
    (container.innerText = `${params?.name} ${params?.song}`),
};

const router = createRouter();

router
  .addRoute("#/", pages.home)
  .addRoute("#/spotify", pages.spotify)
  .addRoute("#/spotify/:name/:song", pages.board)
  .start();

window.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.matches("[data-navigate]")) {
    router.navigate(target.dataset.navigate as string);
  }
});
