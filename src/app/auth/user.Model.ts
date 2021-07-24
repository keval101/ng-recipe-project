export class User {
    constructor(
        public email: string,
        public id: string,
        private _token : string,
        private _tokenExpritaionDate : Date
    ){}

    get token() {
        if(!this._tokenExpritaionDate || new Date() > this._tokenExpritaionDate){
            return null;
        }
        return this._token;
    }
}