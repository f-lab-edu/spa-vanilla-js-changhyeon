import createRouter from "./router";

const container: HTMLElement = document.querySelector("main") as HTMLElement;
const pages = {
  home: () => (container.innerText = "home page"),
  melon: () => (container.innerText = "melon page"),
};

const router = createRouter();

router.addRoute("#/", pages.home).addRoute("#/melon", pages.melon).start();

// window.addEventListener("click", (event: MouseEvent) => {
//   const target = event.target as HTMLElement;
//   console.log(target);
//   if (target.matches("[data-navigate]")) {
//     router.navigate(target.dataset.navigate as string);
//   }
// });
