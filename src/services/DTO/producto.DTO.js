import fns from 'date-fns';

export default function productoDTO(producto) {
	const { name, price, stock, img, description, category } = producto;
	return {
		id: producto._id || producto.id,
		name,
		price,
		stock,
		img,
		description,
		category,
		timestamp: fns.format(producto.timestamp, 'dd/MM/yyyy'),
	};
}
