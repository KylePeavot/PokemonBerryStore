import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface BerryList {
	count: number;
	berries: {
		id: number;
		name: string;
		spriteUrl: string | null;
	}[];
}

@Injectable({
	providedIn: 'root',
})
export class BerryService {
	constructor(private http: HttpClient) {}

	getAllBerries(): Observable<BerryList> {
		return this.http.get<BerryList>('http://localhost:3000/berries').pipe(
			tap((berries) => berries),
			catchError((error) => {
				console.error({
					message: 'Encountered error in BerryService::getAllBerries',
					error,
				});

				return throwError(() => error);
			})
		);
	}
}
