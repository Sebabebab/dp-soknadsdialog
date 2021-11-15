export namespace Quiz {
  export interface Seksjon {
    readonly søknad_uuid: string;
    readonly seksjon_navn: string;
    readonly fakta: Faktum[];
    readonly subsumsjoner: Subsumsjon[];
  }

  export enum Rolle {
    SØKER = "søker",
    NAV = "nav",
    SAKSBEHANDLER = "saksbehandler",
  }

  export enum DataType {
    BOOLEAN = "boolean",
    INT = "int",
    DOUBLE = "double",
    STRING = "string",
    LOCALDATE = "localdate",
    DOKUMENT = "dokument",
  }

  export interface Faktum {
    readonly navn: string;
    readonly id: string;
    readonly roller: Rolle[];
    readonly dataType?: DataType;
    readonly clazz?: DataType; // Denne SKAL FJERNES. Erstattes av dataType.
    readonly godkjenner?: any[]; // Referanse til en annen node i regeltreet.
  }

  export interface Subsumsjon {
    readonly lokalt_resultat?: boolean;
    readonly navn: string;
    readonly subsumsjoner?: Subsumsjon[];
    fakta?: string[];
  }
}
