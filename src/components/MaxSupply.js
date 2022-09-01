const isMaxSupply = (SingleCoin) => {
  const maximumSupply = SingleCoin?.value?.market_data?.max_supply;
  return maximumSupply ? (
    <p>
      Max supply : {maximumSupply.toLocaleString()}{" "}
      <span className="symbol">{SingleCoin.value.symbol}</span>
    </p>
  ) : (
    <p>Max supply: Infinite supply</p>
  );
};

export default isMaxSupply;
