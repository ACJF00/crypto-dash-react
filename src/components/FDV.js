const isFDV = (SingleCoin) => {
  const FDV = SingleCoin?.value?.market_data?.fully_diluted_valuation?.usd;
  return FDV ? (
    <p>FDV : ${FDV.toLocaleString()}</p>
  ) : (
    <p className="undisplayed"></p>
  );
};

export default isFDV;
