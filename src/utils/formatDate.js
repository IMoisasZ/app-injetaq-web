/** @format */

function formatDate(date) {
	const dt = new Date(date)
	const day =
		dt.getDate() > 9
			? (dt.getDate() + 1).toString().padStart(2, '0')
			: dt.getDate() + 1
	const month = dt.getMonth() + 1
	const year = dt.getFullYear()
	const newDt = `${year.toString()}-${month.toString()}-${day.toString()}`
	return newDt.toString()
}

export default formatDate
