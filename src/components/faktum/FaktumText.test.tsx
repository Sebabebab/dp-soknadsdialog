import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { FaktumText } from "./FaktumText";
import { SanityProvider } from "../../context/sanity-context";
import { IQuizTekstFaktum, IQuizSeksjon } from "../../types/quiz.types";
import { QuizProvider } from "../../context/quiz-context";
import { IQuizState } from "../../localhost-data/quiz-state-response";
import fetch from "jest-fetch-mock";
import userEvent from "@testing-library/user-event";
import { sanityMocks } from "../../__mocks__/sanity.mocks";

const faktumMockData: IQuizTekstFaktum = {
  id: "8004.1",
  svar: "as",
  type: "tekst",
  readOnly: false,
  beskrivendeId: "faktum.arbeidsforhold.navn-bedrift",
  sannsynliggjoresAv: [],
  roller: [],
};

const lagreFaktumMock = { status: "ok", sistBesvart: "123" };

const nesteMockData = {
  ferdig: false,
  seksjoner: [
    {
      fakta: [faktumMockData],
      beskrivendeId: "gjenopptak",
      ferdig: true,
    },
  ],
};

const sectionMockData: IQuizSeksjon = {
  fakta: [faktumMockData],
  beskrivendeId: "gjenopptak",
  ferdig: true,
};

const soknadStateMockData: IQuizState = {
  ferdig: false,
  seksjoner: [sectionMockData],
};

describe("FaktumText", () => {
  // Undo any answer after each test
  beforeEach(() => (faktumMockData.svar = undefined));

  test("Should show faktum question and answers", async () => {
    render(
      <SanityProvider initialState={sanityMocks}>
        <QuizProvider initialState={soknadStateMockData}>
          <FaktumText faktum={faktumMockData} />
        </QuizProvider>
      </SanityProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText(faktumMockData.beskrivendeId)).toBeInTheDocument();
    });
  });

  test("Should show faktum answer if already answered", async () => {
    const svar = "Hei på du";
    faktumMockData.svar = svar;

    render(
      <SanityProvider initialState={sanityMocks}>
        <QuizProvider initialState={soknadStateMockData}>
          <FaktumText faktum={faktumMockData} />
        </QuizProvider>
      </SanityProvider>
    );

    // Casting it to access the value attribute
    const textInput = screen.getByLabelText(faktumMockData.beskrivendeId) as HTMLInputElement;

    await waitFor(() => {
      expect(textInput.value).toBe(svar);
    });
  });

  describe("When user inputs an answer", () => {
    beforeEach(() => {
      fetch.enableMocks();
    });

    afterEach(() => {
      fetch.mockReset();
    });

    test("Should post the answer to the server", async () => {
      // First save the answer
      fetch.mockResponseOnce(JSON.stringify(lagreFaktumMock));
      // Then get next question (if any)
      fetch.mockResponseOnce(JSON.stringify(nesteMockData));

      const user = userEvent.setup();
      const svar = "Hei på du";

      render(
        <SanityProvider initialState={sanityMocks}>
          <QuizProvider initialState={soknadStateMockData}>
            <FaktumText faktum={faktumMockData} />
          </QuizProvider>
        </SanityProvider>
      );

      const textInput = screen.getByLabelText(faktumMockData.beskrivendeId) as HTMLInputElement;
      await user.type(textInput, svar);

      await waitFor(() => {
        expect(textInput.value).toEqual(svar);
        expect(fetch.mock.calls.length).toEqual(2);

        // Does the first call save the faktum with the right answer?
        const putRequestBody = fetch.mock.calls[0][1]?.body as string;
        const requestJson = JSON.parse(putRequestBody);

        expect(requestJson.beskrivendeId).toBe(faktumMockData.beskrivendeId);
        expect(requestJson.svar).toBe(svar);
      });
    });
  });
});
