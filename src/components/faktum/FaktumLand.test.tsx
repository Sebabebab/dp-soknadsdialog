import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { FaktumLand } from "./FaktumLand";
import { SanityProvider } from "../../context/sanity-context";
import { IQuizGeneratorFaktum, IQuizSeksjon, QuizFaktum } from "../../types/quiz.types";
import { QuizProvider } from "../../context/quiz-context";
import { IQuizState } from "../../localhost-data/quiz-state-response";
import fetch from "jest-fetch-mock";
import userEvent from "@testing-library/user-event";
import { sanityMocks } from "../../__mocks__/sanity.mocks";
import { getCountryName } from "../../country.utils";

const faktumMockData: QuizFaktum | IQuizGeneratorFaktum = {
  id: "6001",
  svar: "BEL",
  type: "land",
  grupper: [
    {
      land: [
        "AUT",
        "HUN",
        "DEU",
        "CZE",
        "SWE",
        "CHE",
        "ESP",
        "SVN",
        "SVK",
        "ROU",
        "PRT",
        "BGR",
        "BEL",
      ],
      gruppeId: "faktum.hvilket-land-bor-du-i.gruppe.eøs",
    },
    {
      land: ["SJM", "NOR"],
      gruppeId: "faktum.hvilket-land-bor-du-i.gruppe.norge-jan-mayen",
    },
    {
      land: ["IMN", "JEY", "GBR"],
      gruppeId: "faktum.hvilket-land-bor-du-i.gruppe.storbritannia",
    },
  ],
  readOnly: false,
  gyldigeLand: [
    "AUT",
    "HUN",
    "DEU",
    "CZE",
    "SWE",
    "CHE",
    "ESP",
    "SVN",
    "SVK",
    "ROU",
    "PRT",
    "BGR",
    "BEL",
    "SJM",
    "NOR",
    "IMN",
    "JEY",
    "GBR",
  ],
  beskrivendeId: "faktum.hvilket-land-bor-du-i",
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

describe("FaktumLand", () => {
  // Undo any answer after each test
  beforeEach(() => (faktumMockData.svar = undefined));

  test("Should show faktum question and answers", async () => {
    render(
      <SanityProvider initialState={sanityMocks}>
        <QuizProvider initialState={soknadStateMockData}>
          <FaktumLand faktum={faktumMockData} />
        </QuizProvider>
      </SanityProvider>
    );

    const option1 = getCountryName(faktumMockData.gyldigeLand[0], "no");
    const option2 = getCountryName(faktumMockData.gyldigeLand[1], "no");
    const option3 = getCountryName(faktumMockData.gyldigeLand[2], "no");

    await waitFor(() => {
      expect(screen.queryByText(faktumMockData.beskrivendeId)).toBeInTheDocument();
      expect(screen.queryByText(option1)).toBeInTheDocument();
      expect(screen.queryByText(option2)).toBeInTheDocument();
      expect(screen.queryByText(option3)).toBeInTheDocument();
    });
  });

  test("Should show preselected faktum answer if it's already selected", async () => {
    const svar = faktumMockData.gyldigeLand[2];
    faktumMockData.svar = svar;

    render(
      <SanityProvider initialState={sanityMocks}>
        <QuizProvider initialState={soknadStateMockData}>
          <FaktumLand faktum={faktumMockData} />
        </QuizProvider>
      </SanityProvider>
    );

    // Casting it to access the value attribute
    const selectedOption = screen.getByRole("option", { selected: true }) as HTMLInputElement;
    const selectedOptionText = getCountryName(selectedOption.value, "no");

    await waitFor(() => {
      expect(selectedOption.value).toBe(svar);
      expect(selectedOption.textContent).toBe(selectedOptionText);
    });
  });

  describe("When user selects an answer", () => {
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
      const svar = faktumMockData.gyldigeLand[0];

      render(
        <SanityProvider initialState={sanityMocks}>
          <QuizProvider initialState={soknadStateMockData}>
            <FaktumLand faktum={faktumMockData} />
          </QuizProvider>
        </SanityProvider>
      );

      const selectedOptionText = getCountryName(svar, "no");

      user.selectOptions(screen.getByLabelText(faktumMockData.beskrivendeId), selectedOptionText);

      await waitFor(() => {
        const selectedOption = screen.getByRole("option", { selected: true }) as HTMLInputElement;
        expect(selectedOption.value).toEqual(svar);
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
