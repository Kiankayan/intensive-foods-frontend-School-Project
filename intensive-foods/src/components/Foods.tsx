import { useState } from "react";
import _ from "lodash";
import { paginate } from "@/utils";
import { FoodsTable } from "@components";
import type { Category, Food, SortColumn } from "@/types";
import { ListGroup, Pagination } from "@/components/common";
import { getCategories, getFoods } from "@services";

// Root-relative imports

// Gå in i tsconfig.app.json och lägg till en konfiguration i "compilerOptions" som kallas för "paths".

// "paths" är ett objekt som kan skrivas med property namnet som en string såhär, "paths": { "@/*": ["./src/*"] }, glöm inte kommatecken på slutet.

// Med hjälp av paths konfigurationen så kan vi berätta för TypeScript hur den ska behandla våra importer.

// inom komponenten Tables.tsx där importen ändras till "import type { Column, Id, SortColumn } from "@types";" alltså att slutet av importen blir "@types" så kan man hålla in CTRL sen klicka för att se om "paths" funkar och hittar den filen i projekten alltså i det här fallet types.ts.

// Detta kallas för Root-relative imports alltså att alla importer utgår från roten det vill säga src mappen.

// Om man ändrar importen inom Table.tsx till "import { TableBody, TableHeader } from "@components/common";" och CTRL sen klicka på @components/common"; så tar den oss till index.ts som finns i common mappen.

// Viktigt att ändra alla importer i alla komponenter till Root-relative imports.

// Se till att skapa en index.ts fil för foods och foodsTable i common mappen samt ändra importerna i App.tsx filen.

// När man skriver npm run dev i terminalen så kommer det upp massa error pga vite inte vet hur den ska bygga dessa importerna. vi har berättat för TypeScript hur den ska hantera importerna med @ men inte för vite.

// För att lösa detta så skriver man i terminalen "npm i vite-tsconfig-paths" efter installationen så går vi in i vite.config.ts längst ner och inom plugins efter react så skriver man , sen tsconfigPaths sen anropa såhär, plugins: [react(), tsconfigPaths()],

//

const DEFAULT_CATEGORY: Category = {
  _id: "",
  name: "All Categories",
};
const DEFAULT_SORT_COLUMN: SortColumn = { path: "name", order: "asc" };

const PAGE_SIZE = 4;

export default function Foods() {
  const [foods, setFoods] = useState<Food[]>(getFoods());
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [sortColumn, setSortColumn] = useState(DEFAULT_SORT_COLUMN);

  function handleDelete(id: string) {
    const newFoods = foods.filter((food) => food._id !== id);

    setFoods(newFoods);
  }

  function handleFavor(id: string) {
    const newFoods = foods.map((food) => {
      if (food._id === id) {
        return {
          ...food,
          isFavorite: !food.isFavorite,
        };
      }

      return food;
    });

    setFoods(newFoods);
  }

  function handleCategorySelect(category: Category) {
    setSelectedCategory(category);
    setSelectedPage(1);
  }

  if (foods.length === 0) return <p>There are no foods in the database</p>;

  const filteredFoods = selectedCategory._id
    ? foods.filter((food) => food.category._id === selectedCategory._id)
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
            items={[DEFAULT_CATEGORY, ...getCategories()]}
            selectedItem={selectedCategory}
            onItemSelect={handleCategorySelect}
          />
        </div>

        <div className="col-9">
          {foods.length === 0 ? (
            <p>There are no foods in the database</p>
          ) : (
            <p>Showing {filteredFoods.length} foods in the database</p>
          )}

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
