import { FC, useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// categories 是配置常量，不应作为props
interface CategoryPillProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const translateValue_AMOUNT = 200;

const CategoryPills: FC<CategoryPillProps> = (props) => {
  const { categories, selectedCategory, onSelect } = props;

  const [translateValue, setTranslateValue] = useState(0); // 当前 translate 位移值
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 先判断容器ref
    if (containerRef.current == null) return;

    // 对比window.resize监听的是window
    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) return;

      // 位移>0 => 表示已经右移，显示left button
      setIsLeftVisible(translateValue > 0);

      // 位移+容器width < 真实width => 右边还有空间，显示right button
      setIsRightVisible(
        translateValue + container.clientWidth < container.scrollWidth
      );
    });

    // 监听容器的Resize
    observer.observe(containerRef.current);

    return () => {
      // disconnect
      observer.disconnect();
    };
  }, [categories, translateValue]);

  // 左侧位移
  const moveLeft = () => {
    setTranslateValue((translateValue) => {
      // left 减 translateValue_AMOUNT
      const newtranslateValue = translateValue - translateValue_AMOUNT;

      // left边界判断 => 0
      if (newtranslateValue <= 0) return 0;
      return newtranslateValue;
    });
  };

  // 右侧位移
  const moveRight = () => {
    setTranslateValue((translateValue) => {
      if (containerRef.current == null) {
        return translateValue;
      }
      // // right 加 translateValue_AMOUNT
      const newtranslateValue = translateValue + translateValue_AMOUNT;
      const edge = containerRef.current.scrollWidth;
      const width = containerRef.current.clientWidth;

      // right 边界判断 => edge
      if (newtranslateValue + width >= edge) {
        return edge - width;
      }

      return newtranslateValue;
    });
  };

  return (
    // 容器 x轴 overflow hidden，点击按钮位移
    // 容器relative，前后按钮绝对定位
    // whitespace-nowrap width: max-content 阻止文本在空白处换行？

    <div ref={containerRef} className="overflow-x-hidden relative">
      <div
        className="flex gap-3 whitespace-nowrap transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translateValue}px)` }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            className={`py-1 px-3 rounded-lg text-sm font-semibold whitespace-nowrap
              ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-100"
              }`}
            onClick={() => onSelect(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* left位移按钮  gradient样式 */}
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={moveLeft}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}

      {/* right位移按钮 */}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
            onClick={moveRight}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryPills;
