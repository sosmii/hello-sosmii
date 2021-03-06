/**
 * a class which handles user states by accessing firestore.
 */
export default class User {

  private _firestore: any; // Could be type Firestore, though importing that type increases dependencies D:
  private _uid: string;
  private _isUserAlreadySignedUp: boolean;
  private _isUserAuthorized: boolean;
  private _hasUserMadeAppointment: boolean;
  private _companyName: string;

  private constructor(firestore: any, uid: string) {
    this._firestore = firestore;
    this._uid = uid;
  }

  /**
   * factory method.
   * 
   * @param firestore an "authorized" instance of Firestore
   * @param uid UUID of the user
   * @return an instance of the class User
   */
  public static async create(firestore: any, uid: string): Promise<User> {
    const instance = new User(firestore, uid);
    await instance.initializeWithDbValue();

    return instance;
  }

  /**
   * retrieve data from firestore and initialize instance varibales with it.
   */
  private async initializeWithDbValue(): Promise<void> {
    if (!this._uid) {
      this._isUserAlreadySignedUp = false;
      this._isUserAuthorized = false;
      this._hasUserMadeAppointment = false;

      return;
    }

    const snapshot = await this._firestore.collection('user').doc(this._uid).get();

    if (!snapshot.exists) {
      this._isUserAlreadySignedUp = false;
      this._isUserAuthorized = false;
      this._hasUserMadeAppointment = false;

      return;
    }

    this._isUserAlreadySignedUp = true;
    this._isUserAuthorized = snapshot.data().isAuthorized;
    this._hasUserMadeAppointment = snapshot.data().isReserved;
    this._companyName = snapshot.data().companyName;
  }

  /**
   * @return whether the user is already registered with user table.
   */
  public getIsUserAlreadySignedUp(): boolean {
    return this._isUserAlreadySignedUp;
  }

  /**
   * @return whether the user is given the permission to access my personal data / appointment pages.
   */
  public getIsUserAuthorized(): boolean {
    return this._isUserAuthorized;
  }

  /**
   * @return whether the user has already made an appointment.
   */
  public getHasUserAlreadyMadeAppointment(): boolean {
    return this._hasUserMadeAppointment;
  }

  public getCompanyName(): string {
    return this._companyName;
  }

  /**
   * insert a new user to the table.
   * 
   * @param userInput request data from the client
   */
  public async insert(userInput: UserInfo): Promise<void> {

    const uid = userInput.uid;
    const email = userInput.email;
    const pic = userInput.pic;
    const companyName = userInput.companyName;
    const companyHp = userInput.companyHp;
    const message = userInput.message;
    const githubApiUrl = `https://api.github.com/user/${userInput.githubId}`;

    await this._firestore.collection('user').doc(uid).set({
      isAuthorized: false,
      isDenied: false,
      isReserved: false,
      mailAddress: email,
      personInCharge: pic,
      companyName: companyName,
      companyHp: companyHp,
      message: message,
      githubApiUrl: githubApiUrl
    })
  }
}

/**
 * an interface which defines required members for the user table
 */
export interface UserInfo {
  uid: string;
  githubId: string;
  email: string;
  pic: string;
  companyName: string;
  companyHp: string;
  message: string;
}
