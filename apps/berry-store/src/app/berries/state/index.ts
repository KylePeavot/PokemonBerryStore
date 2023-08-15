import * as AppState from '../../state/app.state';
import { BerryState } from './berry.reducer';

export interface State extends AppState.State {
	berries: BerryState;
}
