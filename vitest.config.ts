import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    coverage: {
      provider: "v8", // "v8" também funciona, mas o c8 é mais estável com Prisma
      reportsDirectory: "./.coverage", // evita conflito com pasta "coverage"
      reporter: ["text", "html"], // mostra no console e gera HTML
      exclude: [
        "node_modules/**",
        "src/generated/**", // Prisma Client
      ],
    },
  },
})
