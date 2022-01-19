import useSWR from "swr";
import { Quiz } from "../models/quiz";
import { Session } from "@navikt/dp-auth/dist/server";

export function api(endpoint: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH}/api${
    endpoint.startsWith("/") ? "" : "/"
  }${endpoint}`;
}

export const fetcher = (
  url: RequestInfo,
  options: RequestInit = {}
): Promise<Quiz.Seksjon> => fetch(url, options).then((r) => r.json());

export function getNextSeksjon(id: any): {
  seksjon: Quiz.Seksjon;
  isLoading: boolean;
  isError: boolean;
} {
  const { data, error } = useSWR<Quiz.Seksjon>(
    api(`/soknad/${id}/neste-seksjon`),
    fetcher
  );

  return {
    seksjon: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export async function saveFaktum(
  søknadId: string,
  faktumId: string,
  type: string,
  verdi: any
): Promise<boolean> {
  const response = await fetcher(
    api(`/soknad/${søknadId}/faktum/${faktumId}`),
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: type, svar: verdi }),
    }
  );
  return true;
}