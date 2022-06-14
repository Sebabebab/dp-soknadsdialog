import { getSession } from "@navikt/dp-auth/server";
import { NextApiRequest, NextApiResponse } from "next";
import { audience } from "../../../api.utils";
import { getPaabegynt } from "../../../server-side/quiz-api";

async function getPaabegyntHandler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NEXT_PUBLIC_LOCALHOST) {
    return res.status(200).send("localhost-uuid-paabegynt");
  }

  const { token, apiToken } = await getSession({ req });
  let paabegynt;
  if (token && apiToken) {
    const onBehalfOfToken = await apiToken(audience);
    paabegynt = await getPaabegynt(onBehalfOfToken);
    return res.status(200).send(paabegynt);
  } else {
    return res.status(401).send({});
  }
}

export default getPaabegyntHandler;
