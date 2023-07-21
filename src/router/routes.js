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
      { path: "", component: () => import("pages/FranquearAcessoInfo.vue") },
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
    path: "/denunciasarquivadas",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/DenunciasArquivadas.vue") },
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
