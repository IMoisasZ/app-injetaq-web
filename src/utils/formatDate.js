/** @format */

export function formatDate(date) {
	const dt = new Date(date)
	const day =
		dt.getDate() < 9
			? (dt.getDate() + 1).toString().padStart(2, '0')
			: dt.getDate() + 1
	const month =
		dt.getMonth() + 1 < 9 ? `0${dt.getMonth() + 1}` : dt.getMonth() + 1
	const year = dt.getFullYear()
	const newDt = `${year.toString()}-${month.toString()}-${day.toString()}`
	return newDt.toString()
}

export function formatDateBrWithHour(date) {
	const dt = new Date(date)
	const day = dt.getDate() < 9 ? `0${dt.getDate()}` : dt.getDate()
	const month =
		dt.getMonth() + 1 < 9 ? `0${dt.getMonth() + 1}` : dt.getMonth() + 1
	const year = dt.getFullYear()
	return `${day}/${month}/${year} - ${
		dt.getHours() < 9 ? `0${dt.getHours()}` : dt.getHours()
	}:${dt.getMinutes() < 9 ? `0${dt.getMinutes()}` : dt.getMinutes()}:${
		dt.getSeconds() < 9 ? `0${dt.getSeconds()}` : dt.getSeconds()
	}`
}

export function formatDateBr(date) {
	const dt = new Date(date)
	const day = dt.getDate() < 9 ? `0${dt.getDate()}` : dt.getDate()
	const month =
		dt.getMonth() + 1 < 9 ? `0${dt.getMonth() + 1}` : dt.getMonth() + 1
	const year = dt.getFullYear()
	return `${day}/${month}/${year}`
}
