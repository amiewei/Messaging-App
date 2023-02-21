// import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

//You can load the app level env variables and add them to the Node level env variables:
//https://stackoverflow.com/questions/66389043/how-can-i-use-vite-env-variables-in-vite-config-js
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],

    server: {
      port: parseInt(process.env.VITE_PORT),
      proxy: {
        "/api": {
          target: `${process.env.VITE_BACKEND_URL}:${process.env.VITE_BACKEND_PORT}`,
          changeOrigin: true,
        },
      },
    },
  });
};
