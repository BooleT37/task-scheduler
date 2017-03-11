export default class FileNotFoundViewModel {
    private filename : string;
    
    constructor(filename: string) {
        this.filename = filename;
    }

    public getFilename() {
        return this.filename;
    }
}