function reorderSuggestion(items) {
  return items
    .filter(i => i.qty < 20)
    .map(i => ({
      name: i.name,
      reorderQty: 50 - i.qty
    }));
}

module.exports = reorderSuggestion;
