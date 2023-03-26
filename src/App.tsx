import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import CustomTable from "./components/CustomTable";
import { ActionListType, ActionType, InventoryType } from "./components/types";
import { db } from "./firebase";

const ACTIONS_HEADERS = ["Time", "Food Item", "Date Bought", "In or Out"];
const INVENTORY_HEADERS = ["Food Item", "Date Bought", "Expires In (days)"];

const OUT_OF_FRIDGE_TIME = 5; // In minutes

function App() {
  const [actionsList, setActionsList] = useState<ActionListType>({});
  const [inventoryList, setInventoryList] = useState<InventoryType>({});

  const actionsListRef = useRef<ActionListType>();
  const inventoryListRef = useRef<InventoryType>();

  actionsListRef.current = actionsList;
  inventoryListRef.current = inventoryList;

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "fridge-items"), (snap) => {
      let newActionsList: ActionListType = { ...actionsListRef.current };
      let newInventory: InventoryType = { ...inventoryListRef.current };
      let updated = false;
      // Sort changes by oldest first
      snap
        .docChanges()
        .sort((a, b) => parseInt(a.doc.id) - parseInt(b.doc.id))
        .forEach((change) => {
          const id = change.doc.id;
          if (change.type === "added" && id !== "test") {
            updated = true;
            const { timeAction, itemName, intoFridge, dateBought } = {
              ...(change.doc.data() as ActionType),
              timeAction: change.doc.data().timeAction.toDate(),
              dateBought: change.doc.data().dateBought?.toDate(),
            };
            // Check if the same food item had been taken out in the last 5 minutes
            // The last time the same item had the opposite action
            let newDateBought = dateBought;
            console.log(!newDateBought);

            const itemLastActionKey = Object.keys(newActionsList).find(
              (key) =>
                newActionsList[key].itemName === itemName &&
                newActionsList[key].intoFridge !== intoFridge
            );
            if (intoFridge) {
              if (!newDateBought) {
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
              }
              newInventory[id] = { itemName, dateBought: newDateBought };
            } else {
              if (!newDateBought) {
                newDateBought = itemLastActionKey
                  ? newActionsList[itemLastActionKey]?.dateBought
                  : timeAction;
                updateDoc(doc(db, "fridge-items", id), {
                  dateBought: newDateBought,
                });
              }
              itemLastActionKey && delete newInventory[itemLastActionKey];
            }
            newActionsList[id] = {
              timeAction,
              itemName,
              intoFridge,
              dateBought: newDateBought,
            };
          }
        });
      if (updated) {
        setActionsList(newActionsList);
        setInventoryList(newInventory);
      }
    });
    return unsub;
  }, []);

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
