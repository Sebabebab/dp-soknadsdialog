import React from "react";
import { Checkbox, CheckboxGroup } from "@navikt/ds-react";
import { IValgFaktum } from "../../types/faktum.types";
import { Faktum, FaktumProps } from "./Faktum";
import { PortableText } from "@portabletext/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styles from "./Faktum.module.css";

export function FaktumFlervalg(props: FaktumProps<IValgFaktum>) {
  const { faktum, onChange } = props;
  const answers = useSelector((state: RootState) => props.answers || state.answers);
  const currentAnswerIds =
    (answers.find((answer) => answer.faktumId === faktum.id)?.answer as string[]) ?? [];

  const onSelection = (value: string[]) => {
    onChange && onChange(faktum.id, value);
  };

  return (
    <div>
      {faktum.description && <PortableText value={faktum.description} />}
      {faktum.helpText && <p>{faktum.helpText}</p>}
      {faktum.alertText && <p>{faktum.alertText}</p>}

      <CheckboxGroup
        legend={faktum.title ? faktum.title : faktum.id}
        onChange={onSelection}
        value={currentAnswerIds}
      >
        {faktum.answerOptions.map((answer) => (
          <Checkbox key={answer.id} value={answer.id}>
            {answer.title ? answer.title : answer.id}
          </Checkbox>
        ))}
      </CheckboxGroup>

      {faktum.subFaktum && faktum.subFaktum.length > 0 && (
        <div className={styles["sub-faktum"]}>
          {faktum.subFaktum.map((faktum) => {
            if (faktum.requiredAnswerIds.find((a) => currentAnswerIds.includes(a.id))) {
              return (
                <Faktum
                  key={faktum.id}
                  faktum={faktum}
                  onChange={onChange}
                  answers={props.answers}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
