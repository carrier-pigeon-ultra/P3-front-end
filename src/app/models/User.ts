export default class User {
    id: number
    email: string
    firstName: string
    lastName: string
    birthday: Date
    hometown:string
    currentResidence:string
    biography: string

    constructor (id: number, email: string, firstName: string, lastName: string, 
        birthday:Date, hometown:string, currentResidence:string, biography:string) {
        this.id = id
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
        this.birthday = birthday
        this.hometown = hometown
        this.currentResidence = currentResidence
        this.biography = biography
    }
}