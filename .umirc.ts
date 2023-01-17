import {defineConfig} from "umi";

export default defineConfig({
  npmClient: "npm",
  tailwindcss: {},
  plugins: [require.resolve('@umijs/plugins/dist/tailwindcss')],
  clickToComponent: {
    editor: "webstorm"
  },
  apiRoute:{
    platform:"vercel"
  },
  routes: [
    {
      path: "/",
      component: "index"
    }, {
      path: "/posts/create",
      component: "posts/create"
    }, {
      path: "/login",
      component: "login"
    }, {
      path: "posts/:postId",
      component: "posts/post"
    }
  ]
});
