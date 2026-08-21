import { useState } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import { paginate } from "@/utils";
import { FoodsTable } from "@components";
import type { Category, SortColumn } from "@/types";
import { ListGroup, Pagination, SearchBox } from "@/components/common";
import { auth } from "@services";
import { useDeleteFood, useGetFoods } from "@queries/foods";
import { useGetCategories } from "@queries/categories";

// Konfigurera projektet

// Använd Dribble hemsidan för inspiration på hur vår projekt ska se ut i olika vyn tex, Home eller desktop vy, Mobil vy, kassa vy osv.

// Låt oss börja med att installer och konfigurera vårt projekt genom att öppna terminalen och börja med att gå ut ur vår intensive-foods mappen innan vi skapar projektet med vite för annars kommer vårt projekt skapas som en undermapp och det vill vi inte så skriv "cd .." cd är change directory och första punkten pekar på nuvarande mapp och två punkter är föregående mapp.

// Nu kan vi skriva "npm create vite" med projektnamn "intensive-foods-ecommerce" och sedan väljer vi "React" och "typescript" sedan vill vi öppna en ny vscode ruta istället för att gå till cd intensive-foods-ecommerce så ändrar vi cd till "code" alltså såhär "code intensive-foods-ecommerce" och då öppnas en ny vscode med vår ecommerce projekt.

// Det absolut första vi vill göra i vår ecommerce projekt är att skriva i terminalen "npm install" och sedan "git init" för det viktigt att ha version hantering tidigt i projektet. Sedan skriver vi "npm run dev" för att öppna vår nya projekt i hemsida.

// Sedan vill vi rensa lite onödiga mappar och filer så ta bort assets mappen, och app.css. Töm index.css koden och töm även App.tsx koden. Skriv sedan i App.tsx filen för att se att allting funkar med denna kod:

// export default function App() {
//  return <h1>Intensive Foods Ecommerce</h1>;
// }

// ändra i main.tsx till denna import "import App from "./App";"

// Sedan öppnar man index.html och ändrar titeln samt ta bort faviconen alltså såhär i helhet:

// <!doctype html>
// <html lang="en">
//  <head>
//    <meta charset="UTF-8" />
//    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//    <title>Ecommerce - Intensive Foods</title>
//  </head>
//  <body>
//    <div id="root"></div>
//    <script type="module" src="/src/main.tsx"></script>
//  </body>
// </html>

const DEFAULT_CATEGORY: Category = {
  id: "",
  name: "All Categories",
};

const DEFAULT_SORT_COLUMN: SortColumn = {
  path: "name",
  order: "asc",
};

const PAGE_SIZE = 4;

export default function Foods() {
  const [selectedPage, setSelectedPage] = useState(1);
  const { data: foods = [] } = useGetFoods();
  const { mutate: handleDelete } = useDeleteFood();
  const { data: categories = [] } = useGetCategories();

  const [selectedCategory, setSelectedCategory] =
    useState<Category>(DEFAULT_CATEGORY);

  const [sortColumn, setSortColumn] = useState(DEFAULT_SORT_COLUMN);
  const [searchQuery, setSearchQuery] = useState("");

  const user = auth.getCurrentUser();

  function handleFavor(id: string) {
    const newFoods = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          isFavorite: !food.isFavorite,
        };
      }

      return food;
    });

    console.log(newFoods);

    // setFoods(newFoods);
  }

  function handleCategorySelect(category: Category) {
    setSelectedCategory(category);
    setSearchQuery("");
    setSelectedPage(1);
  }

  function handleSearch(query: string) {
    setSearchQuery(query);
    setSelectedCategory(DEFAULT_CATEGORY);
    setSelectedPage(1);
  }

  const filteredFoods = searchQuery
    ? foods.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : selectedCategory.id
      ? foods.filter((food) => food.category.id === selectedCategory.id)
      : foods;

  const sortedFoods = _.orderBy(
    filteredFoods,
    sortColumn.path,
    sortColumn.order,
  );

  const paginatedFoods = paginate(sortedFoods, PAGE_SIZE, selectedPage);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={[DEFAULT_CATEGORY, ...categories]}
            selectedItem={selectedCategory}
            onItemSelect={handleCategorySelect}
          />
        </div>

        <div className="col">
          {user && (
            <Link to="/foods/new" className="btn btn-primary mb-2">
              New Food
            </Link>
          )}

          <p>Showing {filteredFoods.length} foods in the database</p>

          <SearchBox searchQuery={searchQuery} onSearch={handleSearch} />

          <FoodsTable
            foods={paginatedFoods}
            sortColumn={sortColumn}
            onSort={setSortColumn}
            onDelete={handleDelete}
            onFavor={handleFavor}
          />

          <div className="mt-4">
            <Pagination
              totalCount={filteredFoods.length}
              pageSize={PAGE_SIZE}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
