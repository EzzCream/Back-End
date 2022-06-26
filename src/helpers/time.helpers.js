export const time = () => {
	const tiempoTranscurrido = Date.now();
	const hoy = new Date(tiempoTranscurrido);
	hoy.toUTCString();
	const timestamp = hoy.toUTCString();
	return timestamp;
};
