import { AppDataSource } from "./data-source";

let initialized = false;

export async function initDB() {
  if (!initialized) {
    await AppDataSource.initialize();
    initialized = true;
  }
}
