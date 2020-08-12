import { ReactNode } from "react";
import { TrackerType } from "../../store/DataContext";
import FormFieldBoolean from "./FormFieldBoolean";
import FormFieldNumber from "./FormFieldNumber";
import FormFieldSlider from "./FormFieldSlider";
import FormFieldText from "./FormFieldText";

export interface FormFieldProps {
  title: ReactNode;
  highlight?: string;
  value: any;
  onSave: Function;
}

const trackerComponents = {
  boolean: FormFieldBoolean,
  slider: FormFieldSlider,
  number: FormFieldNumber,
  text: FormFieldText,
};

export const getTrackerComponent = (type: TrackerType) =>
  trackerComponents[type];
