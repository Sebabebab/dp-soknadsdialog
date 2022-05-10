import { getSession } from "@navikt/dp-auth/server";
import { NextApiRequest, NextApiResponse } from "next";
import { audience } from "../../../../api.utils";
import { completeSoknad } from "../../../../server-side/quiz-api";

async function completeHandler(req: NextApiRequest, res: NextApiResponse) {
  const { token, apiToken } = await getSession({ req });
  const uuid = req.query.uuid as string;

  if (process.env.NEXT_PUBLIC_LOCALHOST) {
    return res.status(201).json("Mock content");
  }

  if (token && apiToken) {
    const onBehalfOfToken = await apiToken(audience);
    try {
      await completeSoknad(uuid, onBehalfOfToken);
      return res.status(201).end();
    } catch (error: unknown) {
      return res.status(500).end();
    }
  }

  res.status(404).end();
}
export default completeHandler;