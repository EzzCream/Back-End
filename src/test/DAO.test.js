import assert from 'assert';
import axios from 'axios';

describe('Test DAO', () => {
	it('Deberia de ser igual al numoer de productos que hay', async () => {
		const response = await axios.get('http://localhost:8080/api/producto');
		const res = response.data.length;
		assert.strictEqual(res, 11);
	});
	it('Deberia de ser igual al objeto', async () => {
		const response = await axios.get(
			'http://localhost:8080/api/producto/62b8dcc8f9d489a78b58fbfb',
		);
		assert.deepStrictEqual(response.data, {
			_id: '62b8dcc8f9d489a78b58fbfb',
			name: 'Alimento Hills',
			price: 600,
			stock: 24,
			img: 'https://m.media-amazon.com/images/I/71KAf6vWfbL._AC_SX679_.jpg',
			description: 'Alimento para gato Hills Indoor, seco',
			category: 'Alimento',
			timestamp: 'Sun, 26 Jun 2022 22:25:12 GMT',
			__v: 0,
		});
	});
	it('Deberia de agregar 1', async () => {
		const dataAxios = {
			name: 'Nombre 1',
			price: 50,
			stock: 50,
			img: 'img link',
			description: 'Descripcion 1',
			category: 'Categoria 1',
			timestamp: 'Hoy',
		};
		await axios.post('http://localhost:8080/api/producto', dataAxios);
		const response = await axios.get('http://localhost:8080/api/producto');
		const res = response.data.length;
		assert.strictEqual(res, 11);
	});
	it('Deberia de eliminar 1', async () => {
		await axios.delete(
			'http://localhost:8080/api/producto/62d4bab5e20ee1e6062b2549',
		);
		const response = await axios.get('http://localhost:8080/api/producto');
		const res = response.data.length;
		assert.strictEqual(res, 10);
	});
	it('Deberia de actualizarlo y ser igual', async () => {
		const dataUpdateAxios = {
			name: 'Nombre 1 act',
			price: 50,
			stock: 50,
			img: 'img link act',
			description: 'Descripcion 1 act',
			category: 'Categoria 1 act',
			timestamp: 'Hoy act',
		};
		await axios.put(
			'http://localhost:8080/api/producto/62d4baf20f94271c8efc4bf1',
			dataUpdateAxios,
		);
		const response = await axios.get(
			'http://localhost:8080/api/producto/62d4baf20f94271c8efc4bf1',
		);
		assert.deepStrictEqual(response.data, {
			_id: '62d4baf20f94271c8efc4bf1',
			name: 'Alimento Hills',
			price: 600,
			stock: 24,
			img: 'https://m.media-amazon.com/images/I/71KAf6vWfbL._AC_SX679_.jpg',
			description: 'Alimento para gato Hills Indoor, seco',
			category: 'Alimento',
			timestamp: 'Sun, 26 Jun 2022 22:25:12 GMT',
			__v: 0,
		});
	});
});
