import React from "react";
import { FaktumEnvalg } from "./FaktumEnvalg";
import { FaktumFlervalg } from "./FaktumFlervalg";
import styles from "./Faktum.module.css";
import {
  QuizFaktum,
  QuizFaktumSvarType,
  IQuizGeneratorFaktum,
  IQuizNumberFaktum,
} from "../../types/quiz.types";
import { FaktumText } from "./FaktumText";
import { FaktumNumber } from "./FaktumNumber";
import { FaktumDato } from "./FaktumDato";
import { FaktumPeriode } from "./FaktumPeriode";
import { FaktumEgetGaardsbrukArbeidsaar } from "./faktum-special-cases/FaktumEgetGaardsbrukArbeidsaar";
import { FaktumLand } from "./FaktumLand";
import { FaktumBoolean } from "./FaktumBoolean";
import { FaktumGenerator } from "./FaktumGenerator";
import { FileContent } from "@navikt/ds-icons";
import { useSanity } from "../../context/sanity-context";

export interface IFaktum<P> {
  faktum: P;
  onChange?: (faktum: QuizFaktum, value: QuizFaktumSvarType) => void;
  readonly?: boolean;
}

const FAKTUM_GAARDSBRUK_ARBAAR_FOR_TIMER = "faktum.eget-gaardsbruk-arbeidsaar-for-timer";

export function Faktum(props: IFaktum<QuizFaktum | IQuizGeneratorFaktum>) {
  const { getAppTekst, getDokumentkravTextById } = useSanity();

  const { faktum, readonly } = props;

  function renderFaktumType() {
    if (faktum.beskrivendeId === FAKTUM_GAARDSBRUK_ARBAAR_FOR_TIMER) {
      return (
        <FaktumEgetGaardsbrukArbeidsaar
          faktum={faktum as IQuizNumberFaktum}
          onChange={props.onChange}
        />
      );
    }

    switch (faktum.type) {
      case "boolean":
        return <FaktumBoolean faktum={faktum} onChange={props.onChange} readonly={readonly} />;

      case "envalg":
        return <FaktumEnvalg faktum={faktum} onChange={props.onChange} readonly={readonly} />;

      case "flervalg":
        return <FaktumFlervalg faktum={faktum} onChange={props.onChange} readonly={readonly} />;

      case "tekst":
        return <FaktumText faktum={faktum} onChange={props.onChange} readonly={readonly} />;

      case "double":
      case "int":
        return <FaktumNumber faktum={faktum} onChange={props.onChange} readonly={readonly} />;

      case "land":
        return <FaktumLand faktum={faktum} onChange={props.onChange} readonly={readonly} />;

      case "localdate":
        return <FaktumDato faktum={faktum} onChange={props.onChange} readonly={readonly} />;

      case "periode":
        return <FaktumPeriode faktum={faktum} onChange={props.onChange} readonly={readonly} />;

      case "generator":
        return <FaktumGenerator faktum={faktum as IQuizGeneratorFaktum} readonly={readonly} />;
    }
  }

  function renderDokumentkrav() {
    return props.faktum.sannsynliggjøresAv?.map((dokumentkrav) => {
      const dokumentkravText =
        getDokumentkravTextById(dokumentkrav.beskrivendeId) || dokumentkrav.beskrivendeId;

      return (
        <p key={dokumentkrav.beskrivendeId} className={styles.documentedBy}>
          <FileContent />
          {getAppTekst("faktum.ma.dokumenteres.del1")}
          {" " + dokumentkravText + ". "}
          {getAppTekst("faktum.ma.dokumenteres.del2")}
        </p>
      );
    });
  }

  return (
    <div className={styles.faktum} id={faktum.beskrivendeId}>
      {renderFaktumType()}
      {renderDokumentkrav()}
    </div>
  );
}
