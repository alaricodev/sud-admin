const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/sudmaisinfo/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/sudCaso.vue") }],
  },
  {
    path: "/disquedenunciamaisinfo/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/DisqueDCaso.vue") },
    ],
  },
  {
    path: "/whatsappmaisinfo/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/WhatsappCaso.vue") }],
  },
  {
    path: "/sosescolapmaisinfo/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/SosEscolaCaso.vue") },
    ],
  },
  {
    path: "/franquearacessoinfo/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/FranquearAcessoCaso.vue") },
    ],
  },
  {
    path: "/cadwhatsapp",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CadWhatsappDenuncia.vue") },
    ],
  },
  {
    path: "/version",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/ControleVersao.vue") },
    ],
  },
  {
    path: "/denunciasarquivadas",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/DenunciasArquivadas.vue") },
    ],
  },
  {
    path: "/estatisticas",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/SudEstatisticas.vue") },
    ],
  },
  {
    path: "/configsud",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ConfigSud.vue") }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
