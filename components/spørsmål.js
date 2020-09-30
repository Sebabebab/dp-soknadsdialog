import { useState } from "react";
import { debounce } from "lodash";
import InputSpørsmål from "./input-spørsmål";
import DatoSpørsmål from "./dato-spørsmål";

const mapping = {
  localdate: DatoSpørsmål,
};
export default function Spørsmål({ type, håndterEndring, ...rest }) {
  const [tilstand, settTilstand] = useState("uendret");

  const getOnChange = debounce((value) => {
    settTilstand("pending");
    setTimeout(async () => {
      if (await håndterEndring(rest.id, type, value)) {
        settTilstand("lagret");
      } else {
        settTilstand("feilet");
      }
    }, 1500);
  }, 400);

  const Komponent = mapping[type] || InputSpørsmål;
  return (
    <>
      <div className={tilstand} data-testid={`spørsmål-${rest.id}`}>
        <Komponent type={type} {...rest} handleChange={getOnChange} />
      </div>
      <style jsx>{`
        div {
          background-color: white;
        }
        .pending {
          background-color: yellow;
        }
        .feilet {
          background-color: red;
        }
        .lagret {
          background-color: green;
        }
      `}</style>
    </>
  );
}
