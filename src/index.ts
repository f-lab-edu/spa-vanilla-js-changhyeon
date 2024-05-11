import createRouter from "./router";
import { urlParamsType } from "./router";

const container: HTMLElement = document.querySelector("main") as HTMLElement;
const pages = {
  tech: () => (container.innerText = "tech page"),
  design: () => (container.innerText = "design page"),
  recruit: () => (container.innerText = "recruit page"),
  article: (params?: urlParamsType) =>
    (container.innerText = `${params?.title} `),
};

const router = createRouter();

router
  .addRoute("#/", pages.tech)
  .addRoute("#/design", pages.design)
  .addRoute("#/recruit", pages.recruit)
  .addRoute("#/article/:title", pages.article)
  .start();

window.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  console.log("url", target.dataset.navigate);
  if (target.matches("[data-navigate]")) {
    router.navigate(target.dataset.navigate as string);
  }
});
