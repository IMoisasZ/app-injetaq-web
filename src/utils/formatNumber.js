/** @format */

export function formatNumberCurrency(number) {
	return Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
	}).format(number.replace(',', '.'))
}

export function formatNumberDecimal(number) {
	return Intl.NumberFormat('pt-BR', {
		style: 'decimal',
		minimumFractionDigits: 2,
		maximumFractionDigits: 4,
	}).format(number.replace(',', '.'))
}
