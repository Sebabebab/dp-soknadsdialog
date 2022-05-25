import { TypedObject } from "@portabletext/types";

export interface SanityHelpText {
  title?: string;
  body: TypedObject | TypedObject[];
}

export interface SanityAlertText {
  title?: string;
  type: "info" | "warning" | "error" | "success";
  body: TypedObject | TypedObject[];
}

export interface SanityFaktum {
  textId: string;
  text: string;
  description?: TypedObject | TypedObject[];
  helpText?: SanityHelpText;
  unit?: string;
}

export interface SanitySeksjon {
  textId: string;
  title: string;
  description?: TypedObject | TypedObject[];
  helpText?: SanityHelpText;
}

export interface SanitySvaralternativ {
  textId: string;
  text: string;
  alertText?: SanityAlertText;
}

export interface SanityTexts {
  fakta: SanityFaktum[];
  seksjoner: SanitySeksjon[];
  svaralternativer: SanitySvaralternativ[];
}