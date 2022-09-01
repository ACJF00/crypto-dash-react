const DaysSinceATH = (SingleCoin) => {
  const ATHDate = new Date(SingleCoin?.value.market_data?.ath_date?.usd);
  const todayDate = new Date();

  var Difference_In_Time = todayDate.getTime() - ATHDate.getTime();
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  return <p>Days since ATH: {Math.round(Difference_In_Days)}</p>;
};

export default DaysSinceATH;
