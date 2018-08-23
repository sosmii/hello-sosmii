import * as moment from 'moment-timezone';

/**
 * a class which handles appointment days.
 */
export default class Appointment {

  private _firestore: any;
  /** format: yyyy/MM/dd */
  private _reservedDaysForMeeting: string[] = [];
  /** format: yyyy/MM/dd */
  private _reservedDaysForSkype: string[] = [];

  private constructor(firestore: any) {
    this._firestore = firestore;
  }

  /**
   * factory method.
   * 
   * @param firestore an "authorized" instance of Firestore
   * @return an instance of the class Appointment
   */
  public static async create(firestore: any): Promise<Appointment> {
    const instance = new Appointment(firestore);

    const result = await instance.getActualAppointmentDatesFromDb();

    instance._reservedDaysForMeeting = instance.calculateReservedDaysForMeeting(result.actualMeetingDays, result.actualSkypeDays);
    instance._reservedDaysForSkype = instance.calculateReservedDaysForSkype(result.actualMeetingDays, result.actualSkypeDays);

    return instance;
  }

  public getReservedDaysForMeeting(): string[] {
    return this._reservedDaysForMeeting;
  }

  public getReservedDaysForSkype(): string[] {
    return this._reservedDaysForSkype;
  }

  public async makeAppointment(arg: makeAppointmentArg) {
    if (arg.appointmentType === 'skype') {
      if (-1 < this._reservedDaysForSkype.indexOf(arg.selectedDate)) {
        throw new Error('failed-precondition');
      }
    }

    if (arg.appointmentType === 'meeting' || arg.appointmentType === 'lunch') {
      if (-1 < this._reservedDaysForMeeting.indexOf(arg.selectedDate)) {
        throw new Error('failed-precondition');
      }
    }

    const selectedDate = moment(arg.selectedDate, 'YYYY/MM/DD').startOf('day');
    const threeDaysLater = moment().tz('Asia/Tokyo').startOf('day').add(3, 'days');
    const twoWeeksLater = moment().tz('Asia/Tokyo').startOf('day').add(14, 'days');

    if (selectedDate.isBefore(threeDaysLater) || selectedDate.isAfter(twoWeeksLater)) {
      throw new Error('failed-precondition');
    }

    const batch = this._firestore.batch();

    batch.set(
      this._firestore.collection('appointment').doc(),
      {
        type: arg.appointmentType,
        date: arg.selectedDate,
        place: arg.place,
        uid: arg.uid,
        companyName: arg.companyName,
        createdAt: Date.now(),
        isChecked: false
      }
    );

    batch.update(
      this._firestore.collection('user').doc(arg.uid),
      { isReserved: true }
    );

    await batch.commit();
  }

  private async getActualAppointmentDatesFromDb() {
    const querySnapshot = await this._firestore.collection('appointment').get();
    const records = querySnapshot.docs.map(elem => {
      return {
        type: elem.data().type,
        date: elem.data().date
      }
    });

    const actualMeetingDays: string[] =
      records
        .filter(e => e.type === 'office' || e.type === 'lunch')
        .map(e => e.date);
    const actualSkypeDays: string[] =
      records
        .filter(e => e.type === 'skype')
        .map(e => e.date);

    return {
      actualMeetingDays: actualMeetingDays,
      actualSkypeDays: actualSkypeDays
    }
  }

  /**
   * as its name suggests.
   * "reserved days for meeting" are composed of:
   * - actual meeting days (which means, 1 meeting per day).
   * - actual skype days (which means, i wont get out my sweet home if i met someone w/ skype).
   * - the day next to actual meeting days (which means, if i gonna have a meeting on wednesday, then tuesday and thursday are for skype).
   * 
   * @param actualMeetingDays 
   * @param actualSkypeDays 
   * @return reservedDaysForMeeting
   */
  private calculateReservedDaysForMeeting(actualMeetingDays: string[], actualSkypeDays: string[]): string[] {
    let reservedDaysForMeeting: string[] = [];
    reservedDaysForMeeting = reservedDaysForMeeting.concat(actualMeetingDays, actualSkypeDays);

    for (const elem of actualMeetingDays) {
      const dayBeforeTheMeeting = moment(elem, 'YYYY/MM/DD').startOf('day').subtract(1, 'days').format('YYYY/MM/DD');
      const dayAfterTheMeeting = moment(elem, 'YYYY/MM/DD').startOf('day').add(1, 'days').format('YYYY/MM/DD');

      reservedDaysForMeeting = reservedDaysForMeeting.concat(dayBeforeTheMeeting, dayAfterTheMeeting);
    }

    // remove duplicates
    return reservedDaysForMeeting.filter((x, i, self) => self.indexOf(x) === i);
  }


  /**
   * as its name suggests.
   * "reserved days for skype" are composed of:
   * - actual meeting days (which means, i wont meet someone w/ skype if i got out my sweet home and already got hurt :'( ).
   * - actual skype days with 2 appointments (which means, 2 skype / day is maximum).
   * 
   * @param actualMeetingDays 
   * @param actualSkypeDays 
   * @return reservedDaysForSkype
   */
  private calculateReservedDaysForSkype(actualMeetingDays: string[], actualSkypeDays: string[]): string[] {
    let reservedDaysForSkype: string[] = [];
    reservedDaysForSkype = reservedDaysForSkype.concat(actualMeetingDays)

    const skypeMap = new Map();
    for (const day of actualSkypeDays) {
      if (!skypeMap.has(day)) {
        skypeMap.set(day, 1);

      } else {
        const reservedCount = skypeMap.get(day);
        skypeMap.set(day, reservedCount + 1)
      }
    }

    for (const elem of skypeMap) {
      const day = elem[0];
      const reservedCount = elem[1];

      if (1 < reservedCount) {
        reservedDaysForSkype.push(day);
      }
    }

    // remove duplicates
    return reservedDaysForSkype.filter((x, i, self) => self.indexOf(x) === i);
  }
}

interface makeAppointmentArg {
  appointmentType: string,
  selectedDate: string,
  place: string,
  uid: string,
  companyName: string
}