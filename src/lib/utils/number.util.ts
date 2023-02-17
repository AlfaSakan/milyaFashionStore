export function formatNumberToRupiah(numb: number) {
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    style: "currency",
  }).format(numb);
}
