export default function Subsumsjon({ subsumsjoner = [], gyldig, dybde = 0 }) {
  return (
    <div>
      {subsumsjoner.map(
        ({ navn, resultat = null, fakta = [], subsumsjoner, gyldig }) => (
          <div
            key={navn}
            data-testid="subsumsjon"
            style={{ paddingLeft: dybde * 15 }}
          >
            {resultat === true && "✅"}
            {resultat === false && "❌"}
            {resultat == null && "❓"}
            &nbsp;&nbsp;
            {navn}
            {!!fakta.length && (
              <ul>
                {fakta.map((faktum) => (
                  <li key={faktum.id} data-testid="faktum">
                    {faktum.svar !== undefined ? "✅" : "❓"}
                    &nbsp;&nbsp;
                    {faktum.navn}
                    <br />
                    <b>Svar:</b> {faktum.svar}
                    {faktum.svar === true && "✅"}
                    {faktum.svar === false && "❌"}
                  </li>
                ))}
              </ul>
            )}
            <Subsumsjon
              subsumsjoner={subsumsjoner}
              dybde={dybde + 1}
              gyldig={gyldig}
            />
          </div>
        )
      )}
      {gyldig && <Subsumsjon {...gyldig}></Subsumsjon>}
    </div>
  );
}
