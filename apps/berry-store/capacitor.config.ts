import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.kylepeavot.berrystore',
	appName: 'Prof. Oakazon',
	webDir: '../../dist/apps/berry-store',
	bundledWebRuntime: false,
	server: {
		androidScheme: 'https',
	},
};

export default config;
