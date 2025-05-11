import { AppDataSource } from "./data-source";

let initialized = false;

export async function initDB() {
  if (!initialized) {
    try {
      console.log("Inicializando base de datos...");
      await AppDataSource.initialize();
      initialized = true;
      console.log("Base de datos inicializada correctamente");
    } catch (error) {
      console.error("Error al inicializar la base de datos:", error);
      throw error;
    }
  }
}
