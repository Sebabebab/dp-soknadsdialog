import React, { PropsWithChildren } from "react";
import { DokumentkravProvider } from "../context/dokumentkrav-context";
import { QuizProvider } from "../context/quiz-context";
import { SanityProvider } from "../context/sanity-context";
import { ValidationProvider } from "../context/validation-context";
import { IDokumentkrav, IDokumentkravList } from "../types/documentation.types";
import { IQuizSeksjon, IQuizState } from "../types/quiz.types";
import { sanityMocks } from "./sanity.mocks";

interface IProps {
  dokumentkrav?: IDokumentkrav[];
  soknadState?: IQuizState;
  quizSeksjoner?: IQuizSeksjon[];
}

export const mockSoknadState: IQuizState = {
  ferdig: false,
  antallSeksjoner: 11,
  seksjoner: [],
  versjon_navn: "Dagpenger",
  roller: [],
};

export const mockSection: IQuizSeksjon = {
  fakta: [],
  beskrivendeId: "din-situasjon",
  ferdig: true,
};

const mockDokumentkravList: IDokumentkravList = {
  soknad_uuid: "12345",
  krav: [],
};

export function MockContext(props: PropsWithChildren<IProps>) {
  const {
    children,
    dokumentkrav = [],
    quizSeksjoner = [mockSection],
    soknadState = mockSoknadState,
  } = props;

  return (
    <div id="__next">
      <SanityProvider initialState={sanityMocks}>
        <QuizProvider initialState={{ ...soknadState, seksjoner: quizSeksjoner }}>
          <DokumentkravProvider initialState={{ ...mockDokumentkravList, krav: dokumentkrav }}>
            <ValidationProvider>{children}</ValidationProvider>
          </DokumentkravProvider>
        </QuizProvider>
      </SanityProvider>
    </div>
  );
}