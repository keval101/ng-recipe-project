export class Recipes {
    public name: string;
    public description: string;
    public imagePath: string;

    constructor(name:string, desc:string, imagepath:string){
        this.name = name;
        this.description = desc;
        this.imagePath = imagepath;
    }
}