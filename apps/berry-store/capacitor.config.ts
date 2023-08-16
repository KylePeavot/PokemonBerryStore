import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'berry-store',
  webDir: '../../dist/apps/berry-store',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
