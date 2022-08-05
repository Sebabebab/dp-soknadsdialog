import React, { PropsWithChildren } from "react";
import styles from "./GeneratorFaktumCard.module.css";
import { Button, Detail } from "@navikt/ds-react";
import { WarningColored } from "@navikt/ds-icons";

interface Props {
  editFaktum?: () => void;
  deleteFaktum?: () => void;
  allFaktumAnswered?: boolean;
}

export function GeneratorFaktumCard(props: PropsWithChildren<Props>) {
  return (
    <div className={styles.card}>
      {props.children}

      <div className={styles.buttonContainer}>
        {props.editFaktum && props.allFaktumAnswered && (
          <Button size={"medium"} variant={"secondary"} onClick={props.editFaktum}>
            Endre svar
          </Button>
        )}

        {!props.allFaktumAnswered && (
          <>
            <Button size={"medium"} variant={"primary"} onClick={props.editFaktum}>
              Fyll ut
            </Button>

            <Detail uppercase>
              <WarningColored />
              Delvis utfylt
            </Detail>
          </>
        )}
      </div>
    </div>
  );
}
