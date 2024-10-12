import { atomWithStorage } from "jotai/utils";

type SelectedList = string | undefined;
export const selectedListAtom = atomWithStorage<SelectedList>(
  "selectedList",
  undefined,
);
