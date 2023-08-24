import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetBerriesListResponse } from '@pokemon-berry-store/shared/request-types';
import { Berry } from '@pokemon-berry-store/mobile/berries/domain';

export interface BerryList {
	berries: Berry[];
}

@Injectable({
	providedIn: 'root',
})
export class BerryService {
	constructor(private http: HttpClient) {}

	getAllBerries(): Observable<BerryList> {
		return this.http
			.get<GetBerriesListResponse>('http://localhost:3000/berries')
			.pipe(
				map((response) => ({
					berries: response.berries.map(
						(berry): Berry =>
							new Berry({
								id: berry.id,
								name: berry.name,
								firmness: berry.firmness,
								spriteUrl: berry.spriteUrl,
								flavorPotencyMap: berry.flavorPotencyMap,
								priceInPence: berry.priceInPence,
							})
					),
				})),
				catchError((error) => {
					console.error({
						message:
							'Encountered error in BerryService::getAllBerries',
						error,
					});

					return throwError(() => error);
				})
			);
	}
}
