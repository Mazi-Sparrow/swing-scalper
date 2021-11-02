export const dashboardValues = (journals) => {
  const closedJournals = journals.filter((journal) => journal.tradeStatus == "Closed");
  const openedJournals = journals.filter((journal) => journal.tradeStatus == "Open");

  let profit = 0;
  let loss = 0;
  let openTrades = 0;

  // array of months
  const riskValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const rewardValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (const closedJournal of closedJournals) {
    if (closedJournal.profitLoss > 0) {
      profit += closedJournal.profitLoss || 0;
    } else {
      loss += closedJournal.profitLoss || 0;
    }
  }
  for (const openedJournal of openedJournals) {
    openTrades += openedJournal.buyPrice * openedJournal.quantity;

    const month = new Date(openedJournal.createdAt).getMonth();

    riskValues[month] += openedJournal.tradeRisk || 0;
    rewardValues[month] += openedJournal.tradeReward;
  }

  return {
    profit,
    loss,
    openTrades,
    riskValues,
    rewardValues,
  };
};
