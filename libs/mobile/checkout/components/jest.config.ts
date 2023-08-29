/* eslint-disable */
export default {
	displayName: 'mobile-checkout-components',
	preset: '../../../../jest.preset.js',
	testEnvironment: 'node',
	transform: {
		'^.+\\.[tj]s$': [
			'ts-jest',
			{ tsconfig: '<rootDir>/tsconfig.spec.json' },
		],
	},
	moduleFileExtensions: ['ts', 'js', 'html'],
	coverageDirectory: '../../../../coverage/libs/mobile/checkout/components',
};
