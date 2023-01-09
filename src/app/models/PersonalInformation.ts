export default class PersonalInformation {
    userID:number;
    age:number;
    homeTown:string;
    currentResidence:string;
    biography:string;

    constructor(userID:number, age:number, homeTown:string, currentResedence:string, biography:string){
        this.userID = userID;
        this.age = age;
        this.homeTown = homeTown;
        this.currentResidence = currentResedence;
        this.biography = biography;
    }

}