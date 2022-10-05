import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SanityProvider } from "../../context/sanity-context";
import { sanityMocks } from "../../__mocks__/sanity.mocks";
import { mockDokumentkravList } from "../../localhost-data/dokumentkrav-list";
import fetch from "jest-fetch-mock";
import { DokumentkravBundleErrorModal } from "./DokumentkravBundleErrorModal";
import { Modal } from "@navikt/ds-react";
import { IDokumentkrav } from "../../types/documentation.types";

describe("DokumentkravBundleErrorModal", () => {
  beforeAll(() => {
    const app = document.createElement("div");
    app.id = "__next";

    document.getElementsByTagName("body").item(0)?.appendChild(app);

    // @ts-ignore:next-line
    Modal.setAppElement("#__next");
  });

  beforeEach(() => {
    fetch.enableMocks();
  });

  afterEach(() => {
    fetch.mockReset();
  });

  test("Should show which dokumentkrav has bundle errors", async () => {
    const bundleErrorList: IDokumentkrav[] = [mockDokumentkravList.krav[0]];

    render(
      <SanityProvider initialState={sanityMocks}>
        <DokumentkravBundleErrorModal
          dokumentkravList={bundleErrorList}
          isOpen={true}
          toggleVisibility={() => ""}
        />
      </SanityProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(mockDokumentkravList.krav[0].beskrivendeId, {
          exact: false,
        })
      ).toBeInTheDocument();
    });
  });

  test("Should post answer 'send later' if the user agrees to the fallback solution", async () => {
    const user = userEvent.setup();
    const bundleErrorList = [mockDokumentkravList.krav[0]];

    // Post answer "send later"
    fetch.mockResponseOnce(
      JSON.stringify({
        ok: true,
      })
    );

    render(
      <SanityProvider initialState={sanityMocks}>
        <DokumentkravBundleErrorModal
          dokumentkravList={bundleErrorList}
          isOpen={true}
          toggleVisibility={() => ""}
        />{" "}
      </SanityProvider>
    );

    await user.click(screen.getByText("dokumentkrav.bundle-error.send.senere"));

    const deleteRequestBody = fetch.mock.calls[0][1]?.body as string;
    const requestJson = JSON.parse(deleteRequestBody);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][1]?.method).toEqual("PUT");
    expect(fetch.mock.calls[0][0]).toContain("api/documentation/localhost-uuid/5678/svar");

    expect(requestJson.svar).toBe("dokumentkrav.svar.send.senere");
    expect(requestJson.begrunnelse).toBe("Teknisk feil på innsending av filer");
  });
});