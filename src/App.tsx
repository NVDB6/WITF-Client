import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import CustomTable from "./components/CustomTable";
import { ActionListType, ActionType, InventoryType } from "./utils/types";
import { db } from "./utils/firebase";

const ACTIONS_HEADERS = [
  "Time",
  "Image",
  "Food Item",
  "In or Out",
  "Same or New",
  "Action UID",
  "Food Confidence",
  "IIH Confidence",
  "",
];
const INVENTORY_HEADERS = ["Icon", "Food Item", "Expires In (days)"];

const OUT_OF_FRIDGE_TIME = 300_000; // In milliseconds

function App() {
  const [actionsList, setActionsList] = useState<ActionListType>({});
  const [inventoryList, setInventoryList] = useState<InventoryType>({});

  const actionsListRef = useRef<ActionListType>();
  actionsListRef.current = actionsList;

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "fridge-items"), (snap) => {
      let newActionsList: ActionListType = { ...actionsListRef.current };
      let updated = false;
      // Sort changes by oldest to newest
      snap
        .docChanges()
        .sort((a, b) => parseInt(a.doc.id) - parseInt(b.doc.id))
        .forEach((change) => {
          const id = change.doc.id;
          if (change.type === "added" && id !== "test") {
            updated = true;
            const {
              timeAction,
              itemName,
              intoFridge,
              imageUrl,
              dateBought,
              actionUid,
              foodConfidence,
              iihConfidence,
            } = {
              ...(change.doc.data() as ActionType),
              timeAction: change.doc.data().timeAction.toDate(),
              dateBought: change.doc.data().dateBought?.toDate(),
            };
            // Check if the same food item had been taken out in the last 5 minutes
            // The last time the same item had the opposite action
            let newDateBought = dateBought;

            if (!newDateBought) {
              // Most recent entry with opposite action, that happened before action but after isNew time threshold
              const itemLastActionKey = Object.keys(newActionsList)
                .sort((a, b) => parseInt(b) - parseInt(a))
                .find(
                  (key) =>
                    newActionsList[key].itemName === itemName &&
                    newActionsList[key].intoFridge !== intoFridge &&
                    newActionsList[key].timeAction < timeAction
                );
              const lowerBoundTime = new Date(
                new Date().getTime() - OUT_OF_FRIDGE_TIME
              );
              if (intoFridge) {
                newDateBought =
                  itemLastActionKey &&
                  newActionsList[itemLastActionKey].timeAction > lowerBoundTime
                    ? newActionsList[itemLastActionKey].dateBought
                    : timeAction;
              } else
                newDateBought = itemLastActionKey
                  ? newActionsList[itemLastActionKey].dateBought
                  : timeAction;
              // TODO: Might have to move this out of this if statement
              // Ordered from oldest to newest
              let futureItemActionKeys = [
                id,
                ...Object.keys(newActionsList).filter(
                  (key) =>
                    newActionsList[key].itemName === itemName &&
                    newActionsList[key].timeAction > timeAction
                ),
              ];
              futureItemActionKeys.forEach((key, i) => {
                if (
                  i > 0 &&
                  parseInt(key) - parseInt(futureItemActionKeys[i - 1]) >
                    OUT_OF_FRIDGE_TIME
                ) {
                  newActionsList[key].dateBought =
                    i === 1
                      ? newDateBought
                      : newActionsList[futureItemActionKeys[i - 1]].dateBought;
                  updateDoc(doc(db, "fridge-items", key), {
                    dateBought: newActionsList[key].dateBought,
                  });
                }
              });
              updateDoc(doc(db, "fridge-items", id), {
                dateBought: newDateBought,
              });
            }
            newActionsList[id] = {
              timeAction,
              itemName,
              intoFridge,
              imageUrl,
              actionUid,
              foodConfidence,
              iihConfidence,
              dateBought: newDateBought,
            };
          } else if (change.type === "removed") {
            updated = true;
            delete newActionsList[id];
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
        style={{ width: "40%" }}
      />
      <CustomTable
        title="Actions List"
        headers={ACTIONS_HEADERS}
        items={actionsList}
        style={{ width: "60%" }}
      />
    </div>
  );
}

export default App;
