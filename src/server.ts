import { app } from "./app";
import { prisma } from "./config/prisma";
const PORT = Number(process.env.PORT) || 3000;

async function start() {
  try {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

start();