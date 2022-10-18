/** @format */

export default function clear(time = 2000, type, setMsg, handleClear) {
	if (type === 'error') {
		setTimeout(() => {
			setMsg('')
		}, time)
	}
	if (type === 'success') {
		setTimeout(() => {
			handleClear()
		}, time)
	}
}
