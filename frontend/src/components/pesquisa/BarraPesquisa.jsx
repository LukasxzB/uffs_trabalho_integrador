const BarraPesquisa = ({
  textoPlaceholder,
  textoFiltragem,
  setTextoFiltragem,
}) => {
  return (
    <input
      type="text"
      placeholder={textoPlaceholder}
      onChange={(e) => setTextoFiltragem(e.target.value)}
      required
      value={textoFiltragem}
      style={{ marginTop: 20 }}
    />
  );
};

export default BarraPesquisa;
