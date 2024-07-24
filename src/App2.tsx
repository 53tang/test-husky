import { FC, useState } from "react";
import PageHeader from "./component/PageHeader";
import Sidebar from "./component/Sidebar";
import CategoryPills from "./component/CategoryPills";
import { categories } from "./data/home";

const App: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="max-h-screen h-screen flex flex-col">
      <PageHeader />

      {/** grid-cols-[auto,1fr] fractional unit 占据剩余空间*/}
      <div className="grid grid-cols-[auto,1fr] flex-grow overflow-auto">
        {/**sidebar*/}
        <Sidebar />

        <div className="overflow-x-hidden px-8 pb-4">
          {/**tag list*/}
          <div className="sticky top-0 bg-white z-10 pb-4">
            <CategoryPills
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          {/**content list*/}
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default App;
