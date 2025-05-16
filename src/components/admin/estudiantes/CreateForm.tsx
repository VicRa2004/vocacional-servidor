"use client";

import { useState } from "react";
import { CrearEstudiante } from "@/types/usuarios";
import { useMutation } from "@/hooks/use-mutation";
import { redirect } from "next/navigation";

interface CreateFormProps {
    estudiante?: {
    nombre: string,
    correo: string,
    activo: boolean,
    contrasenaHash: string,
    genero:string,
    fechaRegistro: string,
    nivelAcademico: string,
    fechaNacimiento: string,
    id: number
  },
  action: "CREATE" | "UPDATE"
}

export const CreateForm = ({estudiante, action}: CreateFormProps) => {
  const { mutate, loading, error } = useMutation<CrearEstudiante, null>(
    `/api/usuarios${estudiante ? `/${estudiante.id}` : ""}`,
  );

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    activo: true,
    contrasenaHash: "",
    genero: "",
    fechaRegistro: "",
    nivelAcademico: "",
    fechaNacimiento: "",
    ...estudiante,
  });

  const message = action == "CREATE" ? "Crear Estudiante" : "Actualizar Estudiante";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (action == "CREATE") {
        await mutate(
        {
          ...form,
          rol: "estudiante",
          fechaNacimiento: new Date(form.fechaNacimiento),
          fechaRegistro: new Date(),
        },
        "POST"
      );
    } else {
        await mutate(
            {
            ...form,
            rol: "estudiante",
            fechaNacimiento: new Date(form.fechaNacimiento),
            fechaRegistro: new Date(form.fechaRegistro),
            },
            "PUT"
        );
    }
    
    console.log(error);

    if (!error) {
      redirect("/admin/estudiantes");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Nombre */}
        <div className="sm:col-span-2">
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre Completo
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

        {/* Correo */}
        <div className="sm:col-span-2">
          <label
            htmlFor="correo"
            className="block text-sm font-medium text-gray-700"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        {/* Contraseña */}
        <div>
          <label
            htmlFor="contrasenaHash"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="contrasenaHash"
            name="contrasenaHash"
            value={form.contrasenaHash}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        {/* Género */}
        <div>
          <label
            htmlFor="genero"
            className="block text-sm font-medium text-gray-700"
          >
            Género
          </label>
          <select
            id="genero"
            name="genero"
            value={form.genero}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          >
            <option value="">Seleccione...</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="nivelAcademico"
            className="block text-sm font-medium text-gray-700"
          >
            Nivel Academico
          </label>
          <input
            type="text"
            id="nivelAcademico"
            name="nivelAcademico"
            value={form.nivelAcademico}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        {/* Fecha de Nacimiento */}
        <div>
          <label
            htmlFor="fechaNacimiento"
            className="block text-sm font-medium text-gray-700"
          >
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>

        {/* Activo */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="activo"
            name="activo"
            checked={form.activo}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="activo" className="ml-2 block text-sm text-gray-700">
            Activo
          </label>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando datos..." : message}
        </button>
      </div>

      {error && (
        <div className="mt-4 text-red-600">
          <p>Error: {error.message}</p>
        </div>
      )}
    </form>
  );
};
