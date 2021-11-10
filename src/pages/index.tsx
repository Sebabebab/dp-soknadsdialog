import Head from "next/head";
import { Button, Heading } from "@navikt/ds-react";
import React from "react";
import { useRouter } from "next/router";
import {GetServerSideProps, NextPage} from "next";
import {ensureAuth, SessionProps} from "../lib/ensure-auth";
import {getSession} from "@navikt/dp-auth/server";
import {useSession} from "../lib/useSession";

export const getServerSideProps: GetServerSideProps = ensureAuth({
  enforceLogin: process.env.SERVERSIDE_LOGIN === "enabled",
})(async (context) => {
  const { token, apiToken } = await getSession(context);

  return {
    props: { },
  };
});

const Home: NextPage<SessionProps> = ({
  session: initialSession
}) =>{
  const router = useRouter();

  const { session } = useSession({ initialSession });

  // if(!session) {
  //   return <div>Laster.. ikke logga inn?</div>
  // }


  async function nySøknad(event) {
    try {
      event.preventDefault();
      const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/soknad`, {
        method: "POST",
      }).then((data) => {
        return data.json();
      });
      await router.push(`/soknad/${data.søknad_uuid}`);
    } catch (error) {
      console.log(error);
      throw new Error("Kunne ikke opprette søknad");
    }
  }

  return (
    <div className="root">
      <Head>
        <title>Dagpenger!</title>
      </Head>
      <main>
        <Heading level="1" size="xlarge">
          Viktig informasjon
        </Heading>

        <section>
          <h3>her skal det stå viktige ting... </h3>
          informasjon om dine viktige ting...
        </section>

        <Button key="start-søknad" onClick={nySøknad}>
          Start søknad
        </Button>
      </main>
    </div>
  );
};

export default Home;
