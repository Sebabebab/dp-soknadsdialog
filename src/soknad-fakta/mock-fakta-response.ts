import { FaktumType, PrimitivFaktumType, ValgFaktumType } from "../types/faktum.types";

export type QuizFaktumSvar = string | string[] | boolean | number;

export interface QuizFaktum {
  id: string;
  type: FaktumType;
  beskrivendeId: string;
  svar?: QuizFaktumSvar | QuizFaktum[][];
  roller?: string[];
  gyldigeValg?: string[];
  templates?: GeneratorTemplate[];
}

interface GeneratorTemplate {
  id: string;
  type: PrimitivFaktumType | ValgFaktumType;
  beskrivendeId: string;
  roller: string[];
}

export const mockFakta: QuizFaktum[] = [
  {
    id: "1",
    type: "boolean",
    beskrivendeId: "faktum.hel-deltid",
    svar: true,
    roller: ["søker"],
  },
  {
    id: "2",
    type: "flervalg",
    beskrivendeId: "faktum.kun-deltid-aarsak",
    roller: ["søker"],
    gyldigeValg: [
      "faktum.kun-deltid-aarsak.svar.redusert-helse",
      "faktum.kun-deltid-aarsak.svar.omsorg-baby",
      "faktum.kun-deltid-aarsak.svar.eneansvar-barn",
      "faktum.kun-deltid-aarsak.svar.omsorg-barn-spesielle-behov",
      "faktum.kun-deltid-aarsak.svar.skift-turnus",
      "faktum.kun-deltid-aarsak.svar.annen-situasjon",
    ],
  },
  {
    id: "3",
    type: "int",
    beskrivendeId: "faktum.kun-deltid-aarsak-antall-timer",
    roller: ["søker"],
  },
  {
    id: "4",
    type: "boolean",
    beskrivendeId: "faktum.hele-norge",
    roller: ["søker"],
  },
  {
    id: "5",
    type: "flervalg",
    beskrivendeId: "faktum.ikke-hele-norge",
    roller: ["søker"],
    gyldigeValg: [
      "faktum.ikke-hele-norge.svar.redusert-helse",
      "faktum.ikke-hele-norge.svar.omsorg-baby",
      "faktum.ikke-hele-norge.svar.eneansvar-barn",
      "faktum.ikke-hele-norge.svar.omsorg-barn-spesielle-behov",
      "faktum.ikke-hele-norge.svar.utenfor-naeromraadet",
      "faktum.ikke-hele-norge.svar.annen-situasjon",
    ],
  },
  {
    id: "6",
    type: "boolean",
    beskrivendeId: "faktum.alle-typer-arbeid",
    roller: ["søker"],
  },
  {
    id: "7",
    type: "tekst",
    beskrivendeId: "faktum.ikke-denne-type-arbeid",
    roller: ["søker"],
  },
  {
    id: "8",
    type: "boolean",
    beskrivendeId: "faktum.ethvert-arbeid",
    roller: ["søker"],
  },
  {
    id: "2001",
    type: "envalg",
    beskrivendeId: "faktum.utdanning",
    roller: ["søker"],
    gyldigeValg: [
      "faktum.utdanning.svar.nei",
      "faktum.utdanning.svar.nei-men-siste-6-mnd",
      "faktum.utdanning.svar.ja",
    ],
  },
  {
    id: "3001",
    type: "boolean",
    beskrivendeId: "faktum.driver-du-egen-naering",
    roller: ["søker"],
  },
  {
    id: "3004",
    type: "double",
    beskrivendeId: "faktum.egen-naering-arbeidstimer",
    svar: "3.0",
    roller: ["søker"],
  },
  {
    id: "3005",
    type: "boolean",
    beskrivendeId: "faktum.driver-du-eget-gaardsbruk",
    roller: ["søker"],
  },
  {
    id: "3006",
    type: "int",
    beskrivendeId: "faktum-eget-gaardsbruk-organisasjonsnummer",
    roller: ["søker"],
  },
  {
    id: "3007",
    type: "flervalg",
    beskrivendeId: "faktum-eget-gaardsbruk-type-gaardsbruk",
    roller: ["søker"],
    gyldigeValg: [
      "faktum-eget-gaardsbruk-type-gaardsbruk.faktum.eget-gaardsbruk-type-gaardsbruk.svar.dyr",
      "faktum-eget-gaardsbruk-type-gaardsbruk.faktum.eget-gaardsbruk-type-gaardsbruk.svar.jord",
      "faktum-eget-gaardsbruk-type-gaardsbruk.faktum.eget-gaardsbruk-type-gaardsbruk.svar.skog",
      "faktum-eget-gaardsbruk-type-gaardsbruk.faktum.eget-gaardsbruk-type-gaardsbruk.svar.annet",
    ],
  },
  {
    id: "3008",
    type: "flervalg",
    beskrivendeId: "faktum-eget-gaardsbruk-hvem-eier",
    roller: ["søker"],
    gyldigeValg: [
      "faktum-eget-gaardsbruk-hvem-eier.faktum.eget-gaardsbruk-hvem-eier.svar.selv",
      "faktum-eget-gaardsbruk-hvem-eier.faktum.eget-gaardsbruk-hvem-eier.svar.ektefelle-samboer",
      "faktum-eget-gaardsbruk-hvem-eier.faktum.eget-gaardsbruk-hvem-eier.svar.andre",
    ],
  },
  {
    id: "3009",
    type: "double",
    beskrivendeId: "faktum-eget-gaardsbruk-arbeidstimer",
    roller: ["søker"],
  },
  {
    id: "3010",
    type: "envalg",
    beskrivendeId: "faktum-eget-gaardsbruk-arbeidsaar",
    roller: ["søker"],
    gyldigeValg: [
      "faktum-eget-gaardsbruk-arbeidsaar.svar.2022",
      "faktum-eget-gaardsbruk-arbeidsaar.svar.2021",
      "faktum-eget-gaardsbruk-arbeidsaar.svar.2020",
      "faktum-eget-gaardsbruk-arbeidsaar.svar.2019",
      "faktum-eget-gaardsbruk-arbeidsaar.svar.2018",
    ],
  },
  {
    id: "3011",
    type: "tekst",
    beskrivendeId: "faktum-eget-gaardsbruk-arbeidstimer-beregning",
    roller: ["søker"],
  },
  {
    id: "4001",
    type: "tekst",
    beskrivendeId: "faktum.tilleggsopplysninger",
    roller: ["søker"],
  },
  {
    id: "5001",
    type: "flervalg",
    beskrivendeId: "faktum.andre-ytelser",
    roller: ["søker"],
    gyldigeValg: [
      "faktum.andre-ytelser.svar.pensjon-offentlig-tjenestepensjon",
      "faktum.andre-ytelser.svar.arbeidsloshet-garantikassen -for-fiskere",
      "faktum.andre-ytelser.svar.garantilott-garantikassen -for-fiskere",
      "faktum.andre-ytelser.svar.etterlonn-arbeidsgiver",
      "faktum.andre-ytelser.svar.vartpenger",
      "faktum.andre-ytelser.svar.dagpenger-annet-eos-land",
      "faktum.andre-ytelser.svar.annen-ytelse",
      "faktum.andre-ytelser.svar.nei",
    ],
  },
  {
    id: "5002",
    type: "tekst",
    beskrivendeId: "faktum.tjenestepensjon-hvem-utbetaler-hvilken-periode",
    roller: ["søker"],
  },
  {
    id: "5003",
    type: "tekst",
    beskrivendeId: "faktum.arbeidsloshet-garantikassen -for-fiskere-periode",
    roller: ["søker"],
  },
  {
    id: "5004",
    type: "tekst",
    beskrivendeId: "faktum.garantilott-garantikassen -for-fiskere-periode",
    roller: ["søker"],
  },
  {
    id: "5005",
    type: "tekst",
    beskrivendeId: "faktum.etterlonn-hvem-utbetaler-hvilken-periode",
    roller: ["søker"],
  },
  {
    id: "5006",
    type: "tekst",
    beskrivendeId: "faktum.vartpenger-hvem-utbetaler-hvilken-periode",
    roller: ["søker"],
  },
  {
    id: "5007",
    type: "land",
    beskrivendeId: "faktum.dagpenger-annet-eos-land",
    roller: ["søker"],
  },
  {
    id: "5008",
    type: "tekst",
    beskrivendeId: "faktum.annen-ytelse-hvilken",
    roller: ["søker"],
  },
  {
    id: "5009",
    type: "tekst",
    beskrivendeId: "faktum.annen-ytelse-hvem-utebetaler-hvilken-periode",
    roller: ["søker"],
  },
  {
    id: "5010",
    type: "boolean",
    beskrivendeId: "faktum.utbetaling-okonomisk-gode-tidligere-arbeidsgiver",
    roller: ["søker"],
  },
  {
    id: "5011",
    type: "tekst",
    beskrivendeId: "faktum.okonomisk-gode-tidligere-arbeidsgiver-hva-omfatter-avtalen",
    roller: ["søker"],
  },
  {
    id: "6001",
    type: "land",
    beskrivendeId: "faktum.hvilket-land-bor-du-i",
    roller: ["søker"],
  },
  {
    id: "7001",
    type: "boolean",
    beskrivendeId: "faktum.avtjent-militaer-sivilforsvar-tjeneste-siste-12-mnd",
    roller: ["søker"],
  },
  {
    id: "8001",
    type: "localdate",
    beskrivendeId: "faktum.dagpenger-soknadsdato",
    svar: "2022-01-14T13:39Z",
    roller: ["søker"],
  },
  {
    id: "8002",
    type: "envalg",
    beskrivendeId: "faktum.fast-arbeidstid",
    roller: ["søker"],
    gyldigeValg: [
      "faktum.fast-arbeidstid.svar.ja-fast",
      "faktum.fast-arbeidstid.svar.nei-varierende",
      "faktum.fast-arbeidstid.svar.kombinasjon",
      "faktum.fast-arbeidstid.svar.ingen-passer",
    ],
  },
  {
    id: "9001",
    type: "boolean",
    beskrivendeId: "faktum.eos-arbeid-siste-36-mnd",
    roller: ["søker"],
  },
  {
    id: "10001",
    type: "boolean",
    beskrivendeId: "faktum.oppbrukt-dagpengeperiode",
    roller: ["søker"],
  },
  {
    id: "10002",
    type: "boolean",
    beskrivendeId: "faktum.onsker-fortsette-avsluttet-periode",
    roller: ["søker"],
  },
  {
    id: "1001",
    type: "generator",
    beskrivendeId: "faktum.barn-liste",
    roller: ["søker", "nav"],
    templates: [
      {
        id: "1002",
        type: "tekst",
        beskrivendeId: "faktum.barn-fornavn-mellomnavn",
        roller: ["søker", "nav"],
      },
      {
        id: "1003",
        type: "tekst",
        beskrivendeId: "faktum.barn-etternavn",
        roller: ["søker", "nav"],
      },
      {
        id: "1004",
        type: "localdate",
        beskrivendeId: "faktum.barn-foedselsdato",
        roller: ["søker", "nav"],
      },
      {
        id: "1005",
        type: "land",
        beskrivendeId: "faktum.barn-statsborgerskap",
        roller: ["søker", "nav"],
      },
      {
        id: "1006",
        type: "boolean",
        beskrivendeId: "faktum.forsoerger-du-barnet",
        roller: ["søker", "nav"],
      },
      {
        id: "1007",
        type: "boolean",
        beskrivendeId: "faktum.barn-aarsinntekt-over-1g",
        roller: ["søker", "nav"],
      },
      {
        id: "1008",
        type: "int",
        beskrivendeId: "faktum.barn-inntekt",
        roller: ["søker", "nav"],
      },
    ],
  },
  {
    id: "3002",
    type: "generator",
    beskrivendeId: "faktum.egen-naering-organisasjonsnummer-liste",
    roller: ["søker"],
    templates: [
      {
        id: "3003",
        type: "int",
        beskrivendeId: "faktum.egen-naering-organisasjonsnummer",
        roller: ["søker"],
      },
    ],
    svar: [
      [
        {
          id: "3003",
          beskrivendeId: "faktum.egen-naering-organisasjonsnummer",
          type: "int",
          svar: 123456,
        },
      ],
      [
        {
          id: "3003",
          beskrivendeId: "faktum.egen-naering-organisasjonsnummer",
          type: "int",
          svar: 98765,
        },
      ],
    ],
  },
  {
    id: "8003",
    type: "generator",
    beskrivendeId: "faktum.arbeidsforhold",
    roller: ["søker"],
    templates: [
      {
        id: "8004",
        type: "tekst",
        beskrivendeId: "faktum.navn-bedrift",
        roller: ["søker"],
      },
      {
        id: "8005",
        type: "land",
        beskrivendeId: "faktum.arbeidsforhold-land",
        roller: ["søker"],
      },
      {
        id: "8006",
        type: "envalg",
        beskrivendeId: "faktum.arbeidsforhold-aarsak",
        roller: ["søker"],
      },
      {
        id: "8007",
        type: "periode",
        beskrivendeId: "faktum.arbeidsforhold-varighet",
        roller: ["søker"],
      },
      {
        id: "8008",
        type: "flervalg",
        beskrivendeId: "faktum.arbeidsforhold-ekstra-opplysninger-laerlig",
        roller: ["søker"],
      },
      {
        id: "8009",
        type: "flervalg",
        beskrivendeId: "faktum.arbeidsforhold-ekstra-opplysninger-fiskeindustri",
        roller: ["søker"],
      },
      {
        id: "8010",
        type: "flervalg",
        beskrivendeId: "faktum.arbeidsforhold-ekstra-opplysninger-flere-arbeidsforhold",
        roller: ["søker"],
      },
      {
        id: "8011",
        type: "double",
        beskrivendeId: "faktum.arbeidsforhold-arbeidstid-timer-i-uken-alle-forhold",
        roller: ["søker"],
      },
      {
        id: "8012",
        type: "double",
        beskrivendeId: "faktum.arbeidsforhold-arbeidstid-timer-i-uken",
        roller: ["søker"],
      },
      {
        id: "8013",
        type: "tekst",
        beskrivendeId: "faktum.arbeidsforhold-aarsak-til-oppsigelse-fra-arbeidsgiver",
        roller: ["søker"],
      },
      {
        id: "8014",
        type: "tekst",
        beskrivendeId: "faktum.arbeidsforhold-aarsak-til-avskjedigelse-fra-arbeidsgiver",
        roller: ["søker"],
      },
      {
        id: "8015",
        type: "boolean",
        beskrivendeId: "faktum.tilbud-annen-stilling-annet-sted-samme-arbeidsgiver",
        roller: ["søker"],
      },
      {
        id: "8016",
        type: "boolean",
        beskrivendeId: "faktum.tilbud-forsette-samme-arbeidsgiver",
        roller: ["søker"],
      },
      {
        id: "8017",
        type: "envalg",
        beskrivendeId: "faktum.arbeids-skift-turnus-rotasjon",
        roller: ["søker"],
      },
      {
        id: "8018",
        type: "int",
        beskrivendeId: "faktum.arbeidsforhold-rotasjon-antall-arbeidsdager",
        roller: ["søker"],
      },
      {
        id: "8019",
        type: "int",
        beskrivendeId: "faktum.arbeidsforhold-rotasjon-antall-fridager",
        roller: ["søker"],
      },
      {
        id: "8020",
        type: "envalg",
        beskrivendeId: "faktum.midlertidig-arbeidsforhold-med-sluttdato",
        roller: ["søker"],
      },
      {
        id: "8021",
        type: "localdate",
        beskrivendeId: "faktum.midlertidig-arbeidsforhold-sluttdato",
        roller: ["søker"],
      },
      {
        id: "8022",
        type: "int",
        beskrivendeId: "faktum.arbeidsforhold-permitert",
        roller: ["søker"],
      },
      {
        id: "8023",
        type: "periode",
        beskrivendeId: "faktum.arbeidsforhold-lonnsplinkt-arbeidsgiver",
        roller: ["søker"],
      },
      {
        id: "8024",
        type: "tekst",
        beskrivendeId: "faktum.aarsak-til-sagt-opp-selv",
        roller: ["søker"],
      },
      {
        id: "8025",
        type: "tekst",
        beskrivendeId: "faktum.arbeidsforhold-arbeidsgiver-konkurs-navn-bostyrer",
        roller: ["søker"],
      },
      {
        id: "8026",
        type: "envalg",
        beskrivendeId: "faktum.arbeidsforhold-dagpenger-og-forskudd-lonnsgarantimidler",
        roller: ["søker"],
      },
      {
        id: "8027",
        type: "boolean",
        beskrivendeId: "faktum.arbeidsforhold-godta-nav-trekk-direkte-lonnsgaranti",
        roller: ["søker"],
      },
      {
        id: "8028",
        type: "envalg",
        beskrivendeId: "faktum.arbeidsforhold-sok-lonnsgarantimidler",
        roller: ["søker"],
      },
      {
        id: "8029",
        type: "envalg",
        beskrivendeId: "faktum.arbeidsforhold-lonnsgaranti-dekker-krav",
        roller: ["søker"],
      },
      {
        id: "8030",
        type: "boolean",
        beskrivendeId: "faktum.arbeidsforhold-godta-trekk-direkte-konkursbo",
        roller: ["søker"],
      },
      {
        id: "8031",
        type: "boolean",
        beskrivendeId: "faktum.arbeidsforhold-utbetalt-lonn-etter-konkurs",
        roller: ["søker"],
      },
      {
        id: "8032",
        type: "localdate",
        beskrivendeId: "faktum-arbeidsforhold-konkurs-siste-dag-lonn",
        roller: ["søker"],
      },
      {
        id: "8033",
        type: "tekst",
        beskrivendeId: "faktum.arbeidsforhold-tillegsinformasjon",
        roller: ["søker"],
      },
    ],
  },
  {
    id: "9002",
    type: "generator",
    beskrivendeId: "faktum.eos-arbeidsforhold",
    roller: ["søker"],
    templates: [
      {
        id: "9003",
        type: "tekst",
        beskrivendeId: "faktum.eos-arbeidsforhold-arbeidsgivernavn",
        roller: ["søker"],
      },
      {
        id: "9004",
        type: "land",
        beskrivendeId: "faktum.eos-arbeidsforhold-land",
        roller: ["søker"],
      },
      {
        id: "9005",
        type: "tekst",
        beskrivendeId: "faktum.eos-arbeidsforhold-personnummer",
        roller: ["søker"],
      },
      {
        id: "9006",
        type: "periode",
        beskrivendeId: "faktum.eos-arbeidsforhold-varighet",
        roller: ["søker"],
      },
    ],
  },
];
