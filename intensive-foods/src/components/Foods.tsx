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

// Koppla bilder till rätt produkt

// Vi behöver göra fyra saker som är kopplad till vårt full stack projekt.

// Första är att lägga till property i vår food modell på backend.

// Andra är att vi behöver justera mina PUT och POST endpoints för att ta emot en ny URL från frontend.

// Tredje är att vi behöver lägga till en input i min formulär där vi kan skriva in URL:n och spara den.

// Fjärde och de sista är att vi behöver använde de sparade URL:n för att rendera rätt bild för rätt produkt.

// Öppna vår backend för intensive foods och sedan öppan vår schema.prisma fil och skriv i vår Food model med "imageUrl String" alltså såhär i helhet:

// model Food {
//  id String @id @default(cuid())
//  name String
//  numberInStock Int
//  price Float
//  imageUrl String
//  category Category @relation(fields: [categoryId], references: [id])
//  categoryId String
// }

// Spara och sedan för applicera detta på databasen så öppnar man terminalen och gör en migration med "npx prisma migrate dev -n added_imageurl_to_food" och sedan "npx prisma generate".

// Vi kommer få en error i terminalen och för att lösa detta så gör vi om vår imageUrl med default med en tom string "imageUrl String @default("")" och så kommer det att lyckas när man gör en migrate sedan tar man bort default och vår tomma string "imageUrl String"  gör en sista migrate och då kommer den att fungera korrekt.

// Sedan öppnar vi mappen schemas där vi har filen Foods.ts och gör att den kan ta emot vår imageUrl som typen string alltså såhär:

// imageUrl: z.string().min(1, { message: "Image is required" }),

// Nästa steg är att gå till vår PUT och POST endpoints som finns i routes mappen i foods.ts filen där vi fyller i vår const food = await prisma med detta "imageUrl: req.body.imageUrl," alltså såhär i helhet:

// const food = await prisma.food.create({
//    data: {
//      name: req.body.name,
//      numberInStock: req.body.numberInStock,
//      price: req.body.price,
//      categoryId: req.body.categoryId,
//      imageUrl: req.body.imageUrl,
//    },
//  });

//   const updatedFood = await prisma.food.update({
//    where: { id },
//    data: {
//      name: req.body.name,
//      numberInStock: req.body.numberInStock,
//      price: req.body.price,
//      categoryId: req.body.categoryId,
//      imageUrl: req.body.imageUrl,
//    },
//  });

// Nu är vi klara med första och andra.

// Tredje är att gå tillbaka till vår frontend projekt där vi har vårt food formulär alltså filen FoodForm.tsx där vi lägger till ett nytt fält för imageUrl längst ner under vår price alltså såhär:

// <_Input
//          {...register("imageUrl")}
//          label="image"
//          error={errors.imageUrl}
//        />

// Vi kommer få en error pga vår FormData inte matchar så vi behöver ändra i vår backend projekt så öppna mappen schemas med filen Food.ts där vi kopierar denna rad som vi skapade "imageUrl: z.string().min(1, { message: "Image is required" })" sedan klistrar vi in den i vår frontend FoodForm.tsx under const schema alltså såhär i helhet:

// const schema = z.object({
//  id: z.string().optional(),
//  name: z.string().min(1, { message: "Name is required" }),
//  categoryId: z.string().min(1, { message: "You must select a category" }),
//  numberInStock: z
//    .number()
//    .min(1, { message: "Stock must be at least 1" })
//    .max(100, { message: "Stock cannot exceed 100" }),
//  price: z
//    .number()
//    .min(1, { message: "Price must be at least 1" })
//    .max(20, { message: "Price cannot exceed 20" }),
//  imageUrl: z.string().min(1, { message: "Image is required" }),
// });

// Vi kommer få en error men vi löser det med ChatGPT

// Fjärde och sista steget var att rendera rätt image url för rätt food så öppna FoodsTable.tsx och gör om detta kod till det här alltså såhär:

//  {
//      key: "image",
//      content: (food) => (
//        <img src={food.imageUrl} alt="product image" width={40} />
//      ),
//    },

// Spara och sedan gå till vår hemsida så ser vi att alla våra bilder i vår databas inte hittas eftersom vi hade en tom string men öppna varje food som vi har och skriv i rätt image url för rätt produkt så får vi de bilderna som vi vill ha för rätt produkt.

// Det som man kan göra nu i min food lista är att skapa en ny kateogri som är banana och googla på banan sedan kopiera bildadressen och klistra in den i vår URL fält sedan tryck Save så ser vi att vi får bilden direkt i rätt produkt utan att behöva ladda ner en ny bild.

// Detta betyder att vi har byggt vår kod på ett skalbart sätt som är en förutsättning för att kunna spara våra bilder på cloud för sedan länka till den externa länken som finns på cloud.

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

    //  setFoods(newFoods);
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
