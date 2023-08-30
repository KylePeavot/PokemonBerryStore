import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { GetLocationsListResponse } from '@pokemon-berry-store/shared/request-types';

@Injectable({
	providedIn: 'root',
})
export class LocationService {
	constructor(private http: HttpClient) {}

	getAllLocations(): Observable<string[]> {
		return this.http
			.get<GetLocationsListResponse>('http://localhost:3000/locations')
			.pipe(
				map((response) => {
					console.log(response.locationNames);

					return response.locationNames;
				}),
				catchError((error) => {
					console.error({
						message:
							'Encountered error in LocationService::getAllLocations',
						error,
					});

					return throwError(() => error);
				})
			);
	}
}
