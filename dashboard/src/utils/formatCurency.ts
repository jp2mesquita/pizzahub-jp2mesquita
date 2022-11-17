export function formatCurrency(priceToCovert: number){
  const price = new Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL' }).format(priceToCovert);

  return price;
}
