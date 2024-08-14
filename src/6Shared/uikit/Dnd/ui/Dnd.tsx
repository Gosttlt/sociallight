// import clsx from "clsx";

import Category from "@/4Features/Tasks/Category";

import s from "./Dnd.module.scss";
import { DndComponentType } from "./Dnd.types";
import { DragEvent, useEffect, useRef, useState } from "react";
import clsx from "clsx";

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

//   console.log(boards);

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

const sortFn = (a: CardType, b: CardType) => a.order - b.order;

const Dnd: DndComponentType = (props) => {
  const [currentCard, setCurrentCard] = useState<null | CardType>(null);
  const currentCardRef = useRef<null | HTMLDivElement>(null);
  const lastTargetCardRef = useRef<null | HTMLDivElement>(null);

  const defoltWidthRef = useRef<null | number>(null);

  const [cards, setCards] = useState<CardType[]>(cats.sort(sortFn));

  // элемент который взяли
  const onDragStart = (e: DragEvent, card: CardType) => {
    setCurrentCard(card);
    currentCardRef.current = e.currentTarget as HTMLDivElement;
    defoltWidthRef.current = currentCardRef.current.scrollWidth;
    currentCardRef.current.classList.add(s.hidden);
  };
  // элемент содержащий овер
  const onDragOver = (e: DragEvent, card?: CardType) => {
    e.preventDefault();
    const target = e.target as HTMLDialogElement;
    const currentTarget = e.currentTarget as HTMLDialogElement;
    const dragEl = target.closest(`.${s.dndItem}`);
    if (dragEl) {
      if (dragEl !== lastTargetCardRef.current && lastTargetCardRef.current) {
        lastTargetCardRef.current.style.padding = "0px";
        lastTargetCardRef.current.style.width = "212px";
      }
      lastTargetCardRef.current = target.closest(
        `.${s.dndItem}`
      ) as HTMLDivElement;
    }
    const middleElem =
      currentTarget.getBoundingClientRect().width / 2 +
      currentTarget.getBoundingClientRect().x;
    const cursorX = e.clientX;
    const cardOrder = cursorX > middleElem ? 0.1 : -0.1;
    const isPadding = cursorX > middleElem ? "paddingRight" : "paddingLeft";
    currentTarget.style.padding = "0px";
    currentTarget.style[isPadding] = "200px";
    currentTarget.style.width = "412px";
    // setCards(
    //   cards
    //     .map((cardPrev) => {
    //       if (cardPrev.id === currentCard?.id) {
    //         return { ...cardPrev, order: card.order + cardOrder };
    //       }
    //       return cardPrev;
    //     })
    //     .sort(sortFn)
    // );
    // if (currentCardRef.current) {
    //   currentCardRef.current.style.width = "192px";
    //   currentCardRef.current.style.height = "32px";
    //   currentCardRef.current.style.opacity = "1";
    // }
  };

  const onDragLeave = (e: DragEvent, card?: CardType) => {
    const target = e.target as HTMLDivElement;
    const currentTarget = e.currentTarget as HTMLDivElement;
    console.log("live", e.target);
    if (!target.closest(`.${s.dndItem}`)) {
      console.log("livegood");
      currentTarget.style.padding = "0px";
      currentTarget.style.width = "212px";
      if (currentCardRef.current) {
        currentCardRef.current.classList.add(s.hidden);
      }
    }
  };

  const onDrop = (e: DragEvent, card: CardType) => {
    e.preventDefault();
    setCards(
      cards
        .map((cardPrev) => {
          if (cardPrev.id === currentCard?.id) {
            return { ...cardPrev, order: card.order + 0.1 };
          }
          return cardPrev;
        })
        .sort(sortFn)
    );
    if (currentCardRef.current) {
      currentCardRef.current.classList.remove(s.hidden);
    }
  };

  const onDragOverContainer = (e: DragEvent) => {
    const target = e.target as HTMLDialogElement;
    const dragEl = target.closest(`.${s.dndItem}`);

    if (!dragEl) {
      if (lastTargetCardRef.current) {
        lastTargetCardRef.current.style.padding = "0px";
        lastTargetCardRef.current.style.width = "212px";
      }
    }
  };

  useEffect(() => {
    document.addEventListener("dragover", onDragOverContainer);
  }, [lastTargetCardRef.current]);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen((prev) => !prev)}>Open/Close</button>
      {cards.map((card) => (
        <div
          ref={currentCardRef}
          key={card.id}
          onDragStart={(e) => onDragStart(e, card)}
          onDragOver={(e) => onDragOver(e, card)}
          // onDragLeave={(e) => onDragLeave(e, card)}
          // onDrop={(e) => onDrop(e, card)}
          draggable
          className={clsx(s.testParent, { [s.hide]: open })}
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
    // <div className={s.dndWrapper}>
    //   {cards.map((card) => (
    //     <div
    //       ref={currentCardRef}
    //       key={card.id}
    //       onDragStart={(e) => onDragStart(e, card)}
    //       onDragOver={(e) => onDragOver(e, card)}
    //       // onDragLeave={(e) => onDragLeave(e, card)}
    //       // onDrop={(e) => onDrop(e, card)}
    //       className={s.dndItem}
    //       draggable
    //     >
    //       <Category
    //         id={card.id}
    //         isActive={false}
    //         name={card.name}
    //         onClick={() => {}}
    //       />
    //     </div>
    //   ))}
    // </div>
  );
};
export default Dnd;
