import fns from 'date-fns';

export default function carritoDTO(carrito) {
	const { products, userID } = carrito;
	return {
		id: carrito._id || carrito.id,
		userID,
		products,
		timestamp: fns.format(carrito.timestamp, 'dd/MM/yyyy'),
	};
}
