export class BerryController {
    getBerries(req, res, next) {
        console.log('/berries hit')
        return res.status(200).json({test: []}).end();
    }

}