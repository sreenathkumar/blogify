// =======================================================
// Custom hook which makes a list of loading cards
// Take the number of cards and the loading card component
// =======================================================
const useLoadingCards = (numCards, CardComponent) => {
  const CardList = () => {
    const cards = Array.from({ length: numCards }, (_, index) => index + 1);

    return (
      <div>
        {cards.map((cardNumber) => (
          <CardComponent key={cardNumber} cardNumber={cardNumber} />
        ))}
      </div>
    );
  };

  return CardList;
};

export default useLoadingCards;
