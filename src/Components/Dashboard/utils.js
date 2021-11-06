export const dashboardValues = (journals) => {
  const closedJournals = journals.filter((journal) => journal.tradeStatus === "Closed");
  const openedJournals = journals.filter((journal) => journal.tradeStatus === "Open");

  let profit = 0;
  let loss = 0;
  let openTrades = 0;
  let profitLossSum = 0;

  // array of months
  const riskValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const rewardValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const profitLossValues = [];

  for (const closedJournal of closedJournals) {
    profitLossSum += Math.abs(closedJournal.profitLoss);

    if (closedJournal.profitLoss > 0) {
      profit += closedJournal.profitLoss || 0;
    } else {
      loss += closedJournal.profitLoss || 0;
    }
    const month = new Date(closedJournal.createdAt).getMonth();
    riskValues[month] += closedJournal.tradeRisk || 0;
    rewardValues[month] += closedJournal.tradeReward;

    profitLossValues.push(closedJournal.profitLoss || 0);

  }
  for (const openedJournal of openedJournals) {
    openTrades += openedJournal.buyPrice * openedJournal.quantity;
  }

  return {
    profitLossSum,
    profit,
    loss,
    openTrades,
    riskValues,
    rewardValues,
    profitLossValues,
  };
};
