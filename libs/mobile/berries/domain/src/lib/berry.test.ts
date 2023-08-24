import { Berry, BerryProps } from './berry';

describe('Berry', () => {
	const DEFAULT_BERRY_PROPS: BerryProps = {
		id: 1,
		name: 'name',
		spriteUrl: 'the-spriteUrl',
		firmness: 'super-hard',
		flavorPotencyMap: {
			spicy: 10,
			dry: 20,
			sweet: 30,
			bitter: 40,
			sour: 50,
		},
		priceInPence: 5000,
	};

	it('should create an instance', () => {
		//When
		const berry = new Berry(DEFAULT_BERRY_PROPS);

		//Then
		expect(berry.id).toStrictEqual(1);
		expect(berry.name).toStrictEqual('name');
		expect(berry.spriteUrl).toStrictEqual('the-spriteUrl');
		expect(berry.firmness).toStrictEqual('super-hard');
		expect(berry.flavorPotencyMap).toStrictEqual({
			spicy: 10,
			dry: 20,
			sweet: 30,
			bitter: 40,
			sour: 50,
		});
		expect(berry.priceInPence).toStrictEqual(5000);
	});

	it('should pretty print the name', () => {
		//Given
		const berry = new Berry(DEFAULT_BERRY_PROPS);

		//When/Then
		expect(berry.prettyPrintName()).toStrictEqual('Name');
	});

	it('should pretty print the firmness', () => {
		//Given
		const berry = new Berry(DEFAULT_BERRY_PROPS);

		//When/Then
		expect(berry.prettyPrintFirmness()).toStrictEqual('Super hard');
	});

	it('should pretty print the flavor potency maps', () => {
		//Given
		const berry = new Berry(DEFAULT_BERRY_PROPS);

		//When/Then
		expect(berry.prettyPrintFlavorPotencyMap()).toStrictEqual(
			'Spicy: 10, Dry: 20, Sweet: 30, Bitter: 40, Sour: 50'
		);
	});
});
