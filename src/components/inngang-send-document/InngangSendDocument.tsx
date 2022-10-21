import { Button } from "@navikt/ds-react";
import Link from "next/link";
import { IMineSoknader } from "../../types/quiz.types";

export function InngangSendDocument({ innsendte }: IMineSoknader) {
  return (
    <>
      {innsendte?.map((soknad) => {
        return (
          <div key={soknad.soknadUuid}>
            Innsendt soknad : først innsendt {soknad.forstInnsendt}
            <Link href={`/${soknad.soknadUuid}/kvittering`} passHref>
              <Button as="a">Send inn dokumenter</Button>
            </Link>
          </div>
        );
      })}
    </>
  );
}
