"use client";

import { useState } from "react";
import { useMutation } from "@/hooks/use-mutation";
import { CreateCarrera } from "@/types/carrera";
import { useRouter } from 'next/navigation';

interface CreateFormProps {
  carrera?: {
    id: number;
    nombre: string;
    descripcion: string;
    areaConocimiento: string; 
    duracionEstimada: string;
    demandaLaboral: string;
    salarioPromedio: string;
    competenciasClave: string;
  };
  action: "CREATE" | "UPDATE";
}

export const CreateForm = ({ carrera, action }: CreateFormProps) => {
  const { mutate, loading, error } = useMutation<CreateCarrera, null>(
    `/api/carreras${carrera ? `/${carrera.id}` : ""}`
  );

  const router = useRouter();

  const [form, setForm] = useState({
    nombre: carrera?.nombre || "",
    descripcion: carrera?.descripcion || "",
    areaConocimiento: carrera?.areaConocimiento || "",
    duracionEstimada: carrera?.duracionEstimada || "",
    demandaLaboral: carrera?.demandaLaboral || "",
    salarioPromedio: carrera?.salarioPromedio || "",
    competenciasClave: carrera?.competenciasClave || "",
  });

  console.log(form)

  const message = action === "CREATE" ? "Crear carrera" : "Actualizar carrera";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  console.log(error)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (action === "CREATE") {
        await mutate(form, "POST", () => {
          router.push("/admin/carreras");
        });
      } else {
        await mutate(form, "PUT", () => {
          router.push("/admin/carreras");
        });
      }
    } catch (err) {
      console.error("Error al procesar el formulario:", err);
    }
  }; 

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Nombre */}
        <div className="sm:col-span-2">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre de la Carrera
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        {/* Descripción */}
        <div className="sm:col-span-2">
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border resize-none"
          />
        </div>

        {/* Área de Conocimiento */}
        <div>
          <label htmlFor="areaConocimiento" className="block text-sm font-medium text-gray-700">
            Área de Conocimiento
          </label>
          <select
            id="areaConocimiento"
            name="areaConocimiento"
            value={form.areaConocimiento}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          >
            <option value="">Seleccione un área...</option>
            <option value="Ciencias Exactas">Ciencias Exactas</option>
            <option value="Ciencias Sociales">Ciencias Sociales</option>
            <option value="Ciencias de la Salud">Ciencias de la Salud</option>
            <option value="Ingenierías">Ingenierías</option>
            <option value="Artes y Humanidades">Artes y Humanidades</option>
          </select>
        </div>

        {/* Duración Estimada */}
        <div>
          <label htmlFor="duracionEstimada" className="block text-sm font-medium text-gray-700">
            Duración Estimada (años)
          </label>
          <select
            id="duracionEstimada"
            name="duracionEstimada"
            value={form.duracionEstimada}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          >
            <option value="">Seleccione duración...</option>
            <option value="2">2 años</option>
            <option value="3">3 años</option>
            <option value="4">4 años</option>
            <option value="5">5 años</option>
            <option value="6+">Más de 5 años</option>
          </select>
        </div>

        {/* Demanda Laboral */}
        <div>
          <label htmlFor="demandaLaboral" className="block text-sm font-medium text-gray-700">
            Demanda Laboral
          </label>
          <select
            id="demandaLaboral"
            name="demandaLaboral"
            value={form.demandaLaboral}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          >
            <option value="">Seleccione demanda...</option>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </div>

        {/* Salario Promedio */}
        <div>
          <label htmlFor="salarioPromedio" className="block text-sm font-medium text-gray-700">
            Salario Promedio (USD)
          </label>
          <select
            id="salarioPromedio"
            name="salarioPromedio"
            value={form.salarioPromedio}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          >
            <option value="">Seleccione rango...</option>
            <option value="Menos de 20,000">Menos de $20,000</option>
            <option value="20,000 - 40,000">$20,000 - $40,000</option>
            <option value="40,000 - 60,000">$40,000 - $60,000</option>
            <option value="60,000 - 80,000">$60,000 - $80,000</option>
            <option value="Más de 80,000">Más de $80,000</option>
          </select>
        </div>

        {/* Competencias Clave */}
        <div className="sm:col-span-2">
          <label htmlFor="competenciasClave" className="block text-sm font-medium text-gray-700">
            Competencias Clave (separadas por comas)
          </label>
          <textarea
            id="competenciasClave"
            name="competenciasClave"
            value={form.competenciasClave}
            onChange={handleChange}
            required
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border resize-none"
            placeholder="Ej: Trabajo en equipo, Pensamiento crítico, Resolución de problemas"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Procesando..." : message}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
          <p>Error: {error.message}</p>
        </div>
      )}
    </form>
  );
};