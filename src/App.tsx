import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import CustomTable from "./components/CustomTable";
import { ActionListType, ActionType, InventoryType } from "./utils/types";
import { db } from "./firebase";

const ACTIONS_HEADERS = [
  "Time",
  "Image",
  "Food Item",
  "In or Out",
  "Same or New",
  "",
];
const INVENTORY_HEADERS = ["Icon", "Food Item", "Expires In (days)"];

const OUT_OF_FRIDGE_TIME = 5; // In minutes

function App() {
  const [actionsList, setActionsList] = useState<ActionListType>({});
  const [inventoryList, setInventoryList] = useState<InventoryType>({});

  const actionsListRef = useRef<ActionListType>();
  actionsListRef.current = actionsList;

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "fridge-items"), (snap) => {
      let newActionsList: ActionListType = { ...actionsListRef.current };
      let updated = false;
      // Sort changes by oldest first
      snap
        .docChanges()
        .sort((a, b) => parseInt(a.doc.id) - parseInt(b.doc.id))
        .forEach((change) => {
          const id = change.doc.id;
          if (change.type === "added" && id !== "test") {
            updated = true;
            const { timeAction, itemName, intoFridge, imageUrl, dateBought } = {
              ...(change.doc.data() as ActionType),
              timeAction: change.doc.data().timeAction.toDate(),
              dateBought: change.doc.data().dateBought?.toDate(),
            };
            // Check if the same food item had been taken out in the last 5 minutes
            // The last time the same item had the opposite action
            let newDateBought = dateBought;

            if (!newDateBought) {
              const itemLastActionKey = Object.keys(newActionsList).find(
                (key) =>
                  newActionsList[key].itemName === itemName &&
                  newActionsList[key].intoFridge !== intoFridge
              );
              if (intoFridge) {
                let lowerBoundTime = new Date();
                lowerBoundTime.setMinutes(
                  lowerBoundTime.getMinutes() - OUT_OF_FRIDGE_TIME
                );
                newDateBought =
                  itemLastActionKey &&
                  newActionsList[itemLastActionKey].timeAction > lowerBoundTime
                    ? newActionsList[itemLastActionKey].dateBought
                    : timeAction;
                updateDoc(doc(db, "fridge-items", id), {
                  dateBought: newDateBought,
                });
              } else {
                newDateBought = itemLastActionKey
                  ? newActionsList[itemLastActionKey]?.dateBought
                  : timeAction;
                updateDoc(doc(db, "fridge-items", id), {
                  dateBought: newDateBought,
                });
              }
            }
            newActionsList[id] = {
              timeAction,
              itemName,
              intoFridge,
              imageUrl,
              dateBought: newDateBought,
            };
          }
        });
      if (updated) {
        setActionsList(newActionsList);
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    let newInventoryList: InventoryType = {};
    Object.keys(actionsList)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .forEach((id) => {
        const { itemName, dateBought } = actionsList[id];
        if (actionsList[id].intoFridge) {
          newInventoryList[id] = { itemName, dateBought };
        } else {
          const removeId = Object.keys(newInventoryList).find(
            (curId) => newInventoryList[curId].itemName === itemName
          );
          removeId && delete newInventoryList[removeId];
        }
      });
    setInventoryList(newInventoryList);
  }, [actionsList]);

  return (
    <div className="container">
      <CustomTable
        title="Fridge Inventory"
        headers={INVENTORY_HEADERS}
        items={inventoryList}
      />
      <CustomTable
        title="Actions List"
        headers={ACTIONS_HEADERS}
        items={actionsList}
      />
    </div>
  );
}

export default App;
