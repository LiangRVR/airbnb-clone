"use client";

import { IconType } from "react-icons";
import Heading from "../../heading/heading.component";
import CategoryInput from "../../inputs/category.input.component";
import { categories } from "../../navbar/categories.component";

interface CategoryStepProps {
  setCustomValue: (id: string, value: any) => void;
  categorySelected: string;
}

const CategoryStep: React.FC<CategoryStepProps> = ({
  setCustomValue,
  categorySelected,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(categoryId) =>
                setCustomValue("category", categoryId)
              }
              selected={categorySelected === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryStep;
