import { atomWithStorage } from "jotai/utils";

type SelectedList = string | null;
export const selectedListAtom = atomWithStorage<SelectedList>("selectedList", null);
