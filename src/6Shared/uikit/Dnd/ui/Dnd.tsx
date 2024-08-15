// import clsx from "clsx";

import Category from "@/4Features/Tasks/Category";

import s from "./Dnd.module.scss";
import { DndComponentType } from "./Dnd.types";
import { DragEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import useDebaunce from "@/6Shared/hooks/uiHooks/useDebaunce";

// type ItemType = {
//   id: number;
//   title: string;
// };

// type BoardType = ItemType & {
//   items: Array<ItemType>;
// };

// const data: Array<BoardType> = [
//   {
//     id: 1,
//     title: "Сделать",
//     items: [
//       { id: 1, title: "Пойти в магазин" },
//       { id: 2, title: "Выкинуть мусор" },
//       { id: 3, title: "Помыть пол" },
//     ],
//   },
//   {
//     id: 2,
//     title: "в процессе",
//     items: [
//       { id: 4, title: "Готовка еды" },
//       { id: 5, title: "Уборка" },
//     ],
//   },
//   {
//     id: 3,
//     title: "Готово",
//     items: [
//       { id: 6, title: "Выгул кота" },
//       { id: 7, title: "Уборка за котом" },
//     ],
//   },
// ];

// const Dnd: DndComponentType = (props) => {
//   const { className = "" } = props;

//   const [boards, setBoards] = useState<BoardType[]>(data);

//   const [currentBoard, setCurrentBoard] = useState<BoardType>();

//   const [currentItem, setCurrentItem] = useState<ItemType>();

//   const onDragStart = (e: DragEvent, board: BoardType, item: ItemType) => {
//     setCurrentBoard(board);
//     setCurrentItem(item);
//   };

//   const onDragOver = (e: DragEvent) => {
//     e.preventDefault();
//     if (
//       e.currentTarget.className === s.item ||
//       e.currentTarget.className === s.board
//     ) {
//       e.currentTarget.classList.add(s.item_shadow);
//     }
//   };

//   const onDragLeave = (e: DragEvent) => {
//     e.currentTarget.classList.remove(s.item_shadow);
//   };

//   const onDrop = (e: DragEvent, board?: BoardType, item?: ItemType) => {
//     e.preventDefault();
//     e.stopPropagation();
//     e.currentTarget.classList.remove(s.item_shadow);

//     const currentIndex = currentBoard?.items.indexOf(currentItem!);

//     if (board && item) {
//       currentBoard?.items.splice(currentIndex!, 1);
//       const dropIndex = board.items.indexOf(item);
//       board.items.splice(dropIndex + 1, 0, currentItem!);
//     } else if (board && !item) {
//       currentBoard?.items.splice(currentIndex!, 1);
//       board.items.push(currentItem!);
//     }

//     setBoards(
//       boards.map((b) => {
//         if (b.id === board.id) {
//           return board;
//         }
//         if (b.id === currentBoard.id) {
//           return currentBoard;
//         }
//         return b;
//       })
//     );
//   };

//   return (
//     <div className={clsx(s.CardList_wrapper, className)}>
//       {boards.map((board) => (
//         <div
//           key={board.id}
//           draggable={false}
//           onDragOver={onDragOver}
//           onDragLeave={onDragLeave}
//           onDrop={(e) => onDrop(e, board)}
//           className={s.board}
//         >
//           <div className={s.board_title}>{board.title}</div>
//           {board.items.map((item) => (
//             <div
//               draggable
//               onDragStart={(e) => onDragStart(e, board, item)}
//               onDragOver={onDragOver}
//               onDragLeave={onDragLeave}
//               onDrop={(e) => onDrop(e, board, item)}
//               className={s.item}
//               key={item.id}
//             >
//               {item.title}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Dnd;

type CardType = { name: string; id: string; order: number };
const cats = [
  { name: "Работа0", id: "clzmd1bym0000e9dlc2szkfgb1", order: 0 },
  { name: "Покупки1", id: "clzmd1bym0000e9dlc2szkfgb2", order: 1 },
  { name: "Лес5", id: "clzmd1bym0000e9dlc2szkfgb6", order: 5 },
  { name: "Дом2", id: "clzmd1bym0000e9dlc2szkfgb3", order: 2 },
  { name: "Улица3", id: "clzmd1bym0000e9dlc2szkfgb4", order: 3 },
  { name: "Занятия4", id: "clzmd1bym0000e9dlc2szkfgb5", order: 4 },
];

type StyleType = "default" | "stretch" | "hidden";
const getStyle = (
  node: HTMLDivElement,
  type: StyleType,
  direction?: "paddingLeft" | "paddingRight"
) => {
  if (type === "default") {
    node.style.padding = "0px 10px";
    node.style.width = "212px";
    node.style.transform = "scale(1)";
    node.style.opacity = "1";
  } else if (type === "stretch" && direction) {
    node.style.padding = "0px 10px";
    node.style[direction] = "200px";
    node.style.width = "412px";
    node.style.transform = "scale(1)";
    node.style.opacity = "1";
  } else if (type === "hidden") {
    node.style.transform = "scale(0)";
    node.style.padding = "0";
    node.style.width = "10";
    // node.style.opacity = "0";
  }
};

const setTransition = (node: HTMLDivElement, transition: string = "0.3s") => {
  node.style.transition = transition;
};
const sortFn = (a: CardType, b: CardType) => a.order - b.order;

const Dnd: DndComponentType = (props) => {
  const getStyleDeb = useDebaunce(getStyle, 1000);
  const setTransitionDeb = useDebaunce(setTransition);
  const refff = useRef<null | HTMLDivElement>(null);

  const [currentCard, setCurrentCard] = useState<null | CardType>(null);
  const [currentCardNode, setCurrentCardNode] = useState<null | HTMLDivElement>(
    null
  );
  const [lastTargetCardNode, setLastTargetCardNode] =
    useState<null | HTMLDivElement>(null);

  const [cards, setCards] = useState<CardType[]>(cats.sort(sortFn));

  // элемент который взяли
  const onDragStart = (e: DragEvent, card: CardType) => {
    setCurrentCard(card);
    setCurrentCardNode(e.currentTarget as HTMLDivElement);
    refff.current = e.currentTarget as HTMLDivElement;
  };

  // элемент содержащий овер
  const onDragOver = (e: DragEvent, card?: CardType) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLDivElement;
    const currentTarget = e.currentTarget as HTMLDivElement;
    const dragEl = target.closest(`.${s.dndItem}`);
    getStyle(refff.current as HTMLDivElement, "hidden");

    // Если элемент есть и элемент в таргете являеца драгИтемом и взятый элемент не являеца тем на кого смотрим
    if (currentCardNode && dragEl && currentCardNode !== dragEl) {
      // когда уходим с элемента возвращяем ему паддинги
      if (dragEl !== lastTargetCardNode && lastTargetCardNode) {
        getStyle(lastTargetCardNode, "default");
      }
      setLastTargetCardNode(target.closest(`.${s.dndItem}`) as HTMLDivElement);

      const middleElem =
        currentTarget.getBoundingClientRect().width / 2 +
        currentTarget.getBoundingClientRect().x;
      const cursorX = e.clientX;

      const isPadding = cursorX > middleElem ? "paddingRight" : "paddingLeft";
      getStyle(currentTarget, "stretch", isPadding);
    }
  };

  const onDrop = (e: DragEvent, card: CardType) => {
    e.preventDefault();

    const target = e.target as HTMLDivElement;
    const currentTarget = e.currentTarget as HTMLDivElement;
    // currentTarget.style.transition = "none";
    // currentCardNode!.style.transition = "0.01s";
    // setTimeout(() => {
    //   currentTarget.style.transition = "0.3s";
    //   currentCardNode!.style.transition = "0.3s";
    // }, 1300);
    const dragEl = target.closest(`.${s.dndItem}`);
    if (dragEl !== currentCardNode) {
      if (currentTarget.closest(`.${s.dndItem}`)) {
        const middleElem =
          currentTarget.getBoundingClientRect().width / 2 +
          currentTarget.getBoundingClientRect().x;
        const cursorX = e.clientX;

        const cardOrder = cursorX > middleElem ? 0.1 : -0.1;

        setCards(
          cards
            .map((cardPrev) => {
              if (cardPrev.id === currentCard?.id) {
                return { ...cardPrev, order: card.order + cardOrder };
              }
              return cardPrev;
            })
            .sort(sortFn)
        );

        getStyle(currentTarget, "default");

        if (currentCardNode) {
          getStyle(currentCardNode, "default");
        }
      }
    } else {
      getStyle(currentCardNode!, "default");
    }
  };
  const onDragOverContainer = (e: DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    const dragEl = target.closest(`.${s.dndItem}`);
    if (!dragEl) {
      if (lastTargetCardNode) {
        getStyle(lastTargetCardNode, "default");
      }
    }
  };

  const onDropDocument = (e: DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    const dragEl = target.closest(`.${s.dndItem}`);
    if (!dragEl && currentCardNode) {
      getStyle(currentCardNode, "default");
    }
  };

  // useEffect(() => {
  //   document.addEventListener("dragover", onDragOverContainer);
  //   return () => {
  //     document.removeEventListener("dragover", onDragOverContainer);
  //   };
  // }, [lastTargetCardNode]);

  // useEffect(() => {
  //   document.addEventListener("drop", onDropDocument);
  //   return () => {
  //     document.removeEventListener("drop", onDropDocument);
  //   };
  // }, [currentCardNode]);

  const onDragLeave = (e: DragEvent, card?: CardType) => {
    const target = e.target as HTMLDivElement;
    const currentTarget = e.currentTarget as HTMLDivElement;
    if (!target.closest(`.${s.dndItem}`)) {
      currentTarget.style.padding = "0px 10px";
      currentTarget.style.width = "212px";
      if (currentCardNode) {
        currentCardNode.classList.add(s.hidden);
      }
    }
  };

  const onDragEnd = (e: DragEvent) => {
    getStyle(e.currentTarget as HTMLDivElement, "default");
  };

  return (
    <div className={s.dndWrapper}>
      {cards.map((card) => (
        <div
          key={card.id}
          onDragStart={(e) => onDragStart(e, card)}
          onDragOver={(e) => onDragOver(e, card)}
          onDragEnd={onDragEnd}
          // onDragLeave={(e) => onDragLeave(e, card)}
          onDrop={(e) => onDrop(e, card)}
          className={s.dndItem}
          draggable
        >
          <Category
            id={card.id}
            isActive={false}
            name={card.name}
            onClick={() => {}}
          />
        </div>
      ))}
    </div>
  );
};
export default Dnd;
