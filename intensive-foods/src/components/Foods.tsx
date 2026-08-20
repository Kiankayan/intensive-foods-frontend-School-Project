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

// Förberedelse för E-handel

// Öppna vår Cloudinary assets och töm alla bilder som finns genom att trycka på CTRL + A och sedan på sopptunnan.

// Sedan tar vi bort vår images mapp i vår frontend vscode eftersom alla bilder kommer laddas upp på cloudinary.

// I hemsidan så kan vi se att våra bilder har försvunnit eller visas inte längre eftersom vi tog bort images mappen.

// Låt oss rensa lite av våra produkter och spara de som är relevant sedan ladda ner en banan bild ta bort bakgrunden sedan skapa det till en banana.png fil sedan uppdaterar vi alla våra produkter till rätt bild i hemsidan.

// Refresha vår Cloudinary assets så får vi alla våra sparade bilder direkt i Cloudinary.

// En bra grej att göra är att strukturera och kategorisera våra ssets och ha alla bilder i en mapp i "Folders" i cloudinary men vi vill göra detta via vår kod istället.

// Öppna cloudinaryService.ts filen och skriv "formData.append("folder", "foods");" alltså såhär i helhet:

// async function saveImage(file: File) {
//  const formData = new FormData();
//  formData.append("file", file);
//  formData.append("folder", "foods");
//  formData.append("upload_preset", "intensive_foods");
//  const response = await axios.post(cloudinaryURL, formData, {
//    headers: { "x-auth-token": undefined },
//  });

//  return response.data.secure_url;
// }

// Spara sedan gå till Cloudinary och skapa en ny mapp via folders som heter "foods" och sedan flytta över alla 7 bilder i mappen sedan är det klart.

// Nu så kommer alla våra bilder sparas i mappen på vår Cloudinary sedan commitar vi koden.

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
