import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { GetLocationsListResponse } from '@pokemon-berry-store/shared/request-types';
import {
	initCapAllWords,
	removeKebabCase,
} from '@pokemon-berry-store/mobile/util';
import LocalLocationsList from './localLocationsList.json';

@Injectable({
	providedIn: 'root',
})
export class LocationService {
	constructor(private http: HttpClient) {}

	getAllLocations(
		dataSource: 'api' | 'localFile' = 'localFile'
	): Observable<string[]> {
		let dataObservable: Observable<GetLocationsListResponse>;

		if (dataSource === 'api') {
			dataObservable = this.http.get<GetLocationsListResponse>(
				'http://localhost:3000/locations'
			);
		} else {
			dataObservable = new Observable<GetLocationsListResponse>(
				(observer) => {
					const response =
						LocalLocationsList as GetLocationsListResponse;

					observer.next(response);
				}
			);
		}

		return dataObservable.pipe(
			map((response) =>
				response.locationNames.map((name) =>
					initCapAllWords(removeKebabCase(name))
				)
			),
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
