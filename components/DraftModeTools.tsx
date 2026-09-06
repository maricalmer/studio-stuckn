import { VisualEditing } from "next-sanity/visual-editing";

import DisableDraftMode from "@/components/DisableDraftMode";
import DraftModeRefresh from "@/components/DraftModeRefresh";

export default function DraftModeTools() {
  return (
    <>
      <DraftModeRefresh />
      <DisableDraftMode />
      <VisualEditing />
    </>
  );
}
