import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);
  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories.drinks);
  const fetchRecipies = useAppStore((state) => state.fetchRecipies);
  const showNotification = useAppStore((state) => state.showNotification);

  const [searchFilter, setSearchFilter] = useState({
    ingredient: "",
    category: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchFilter({
      ...searchFilter,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //TODO validacion
    if (Object.values(searchFilter).includes("")) {
      showNotification({
        text: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    //Consultar recetas
    fetchRecipies(searchFilter);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <header
      className={isHome ? "bg-header bg-cover bg-center" : "bg-slate-800"}
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="imagen logo" />
          </div>

          <nav className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Favoritos
            </NavLink>
            <NavLink
              to="/generate"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Generar Con IA
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="text-white uppercase font-extrabold text-lg"
              >
                Nombre o ingredientes
              </label>
              <input
                id="ingredient"
                type="text"
                name="ingredient"
                className="p-3 w-full rounded-lg focus:outline-none"
                placeholder="Nombre o ingrediente. Ej: Vodka,Tequila,Café"
                onChange={handleChange}
                value={searchFilter.ingredient}
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="category"
                className="text-white uppercase font-extrabold text-lg"
              >
                Categoria
              </label>
              <select
                id="category"
                name="category"
                className="p-3 w-full rounded-lg focus:outline-none"
                onChange={handleChange}
                value={searchFilter.category}
              >
                <option value="">-- Seleccione --</option>
                {categories.map((category) => (
                  <option
                    key={category.strCategory}
                    value={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Buscar Recetas"
              className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
            />
          </form>
        )}
      </div>
    </header>
  );
}
