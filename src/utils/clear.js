/** @format */

export default function clear(time = 2000, typeClear, setMsg, handleClear) {
	if (typeClear === 'error') {
		setTimeout(() => {
			setMsg('')
		}, time)
	}
}
