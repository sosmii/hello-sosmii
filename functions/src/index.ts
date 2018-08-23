import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import * as os from 'os';
import User from './User';
import * as nodemailer from 'nodemailer';
import Appointment from './Appointment';

admin.initializeApp();
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });
const storage = admin.storage();
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// cache the result
let jsons;
exports.fetchCardsData = functions.https.onCall(async (data, context) => {
  const uid: string = (context.auth) ? context.auth.uid : null;
  const user = await User.create(firestore, uid);

  if (!user.getIsUserAuthorized()) {
    throw new functions.https.HttpsError('failed-precondition');
  }

  try {
    if (!jsons) {
      jsons = await Promise.all([
        downloadJson('personal-private.json'),
        downloadJson('quitting-private.json'),
        downloadJson('desire-private.json')
      ]);
    }

    return {
      personal: jsons[0],
      quitting: jsons[1],
      desire: jsons[2]
    };
  } catch (err) {
    console.error(`error@fetchCardsData: uid = ${context.auth.uid}, error: ${err}`);

    throw err;
  }
});

/**
 * download a json file from cloud storage, then return the content of it.
 * a downloaded file will be automatically removed by cloud function.
 * 
 * @param target name of the file u wanna download from the default bucket
 * @return an Array, or an Object parsed from the json file
 */
async function downloadJson(target): Promise<any> {
  const randomFileName = crypto.randomBytes(20).toString('hex') + path.extname(target);
  const tempFilePath = path.join(os.tmpdir(), randomFileName);

  await storage.bucket().file(target).download({
    destination: tempFilePath
  });

  const fileContent = fs.readFileSync(tempFilePath, { encoding: 'utf-8' });
  const obj = JSON.parse(fileContent);

  return obj;
}

exports.getUserState = functions.https.onCall(async (data, context) => {
  try {
    const uid: string = (context.auth) ? context.auth.uid : null;
    const user = await User.create(firestore, uid);

    if (!user.getIsUserAlreadySignedUp()) {
      return {
        isRegistered: false,
        isAuthorized: false,
        hasReserved: false
      };
    }

    return {
      isRegistered: true,
      isAuthorized: user.getIsUserAuthorized(),
      hasReserved: user.getHasUserAlreadyMadeAppointment()
    };
  } catch (err) {
    console.error(`error@getUserState: uid = ${context.auth.uid}, error: ${err}`);

    throw err;
  }
});

exports.register = functions.https.onCall(async (data, context) => {
  if (!data) {
    throw new functions.https.HttpsError('invalid-argument');
  }

  const requestParam = {
    uid: context.auth.uid,
    email: context.auth.token.email,
    pic: data.pic,
    companyName: data.companyName,
    companyHp: data.companyHp,
    message: data.message,
    githubId: data.githubId
  }

  for (const elem in requestParam) {
    if (elem === null || elem === undefined) {
      throw new functions.https.HttpsError('invalid-argument');
    }
  }

  try {
    const user = await User.create(firestore, requestParam.uid);
    if (user.getIsUserAlreadySignedUp()) {
      throw new functions.https.HttpsError('failed-precondition');
    }

    await user.insert(requestParam);

  } catch (err) {
    console.error(`error@register: uid = ${context.auth.uid}, error: ${err}`);

    throw err;
  }
});

exports.sendRegisterConfirmation = functions.firestore
  .document('user/{newUserUid}')
  .onCreate((snapshot, context) => {
    const data = snapshot.data()
    const targetEmailAddress = data.mailAddress;
    const companyName = data.companyName;
    const pic = data.personInCharge;

    const mailOptions = {
      to: targetEmailAddress,
      from: '"sosmii@自動送信" <sosmii.seekajob+reply.to.autosend@gmail.com>',
      subject: 'hello-sosmii お問い合わせありがとうございました',
      text:
        `
          ${companyName}　${pic}　様

          https://hello-sosmii.firebaseapp.com/ にて、お問い合わせを頂きありがとうございました！
          このメールは登録されたメールアドレスが有効であるかどうかを確認するためのものです。

          頂いたリクエストには全てsosmii本人が目を通し、ぜひお会いしたい企業様に下記の権限を付与しております。
          ・全ての個人情報へのアクセス
          ・おおっぴらには言いにくい本音へのアクセス
          ・面談予約

          付与された際には、こちらのアドレスにその旨を記載したメールを送信致します。
          お会いできる日を楽しみにしております。


          sosmii
        `
    };

    return mailTransport.sendMail(mailOptions);
  });

exports.sendPrivilegeNotification = functions.firestore
  .document('user/{newUserUid}')
  .onUpdate((change, context) => {
    const perviousAuthState = change.before.data().isAuthorized;
    const afterAuthState = change.after.data().isAuthorized;

    if (!(perviousAuthState === false && afterAuthState === true)) {
      return false;
    }

    const data = change.after.data();
    const targetEmailAddress = data.mailAddress;
    const companyName = data.companyName;
    const pic = data.personInCharge;

    const mailOptions = {
      to: targetEmailAddress,
      from: '"sosmii@自動送信" <sosmii.seekajob+reply.to.autosend@gmail.com>',
      subject: 'hello-sosmii リクエストが承認されました',
      text:
        `
          ${companyName}　${pic}　様

          https://hello-sosmii.firebaseapp.com/ にて、頂いていたリクエストが承認されました！

          ご登録頂いていたアカウントで、下記のアクションが可能になりました。
          ・全ての個人情報へのアクセス
          ・おおっぴらには言いにくい本音へのアクセス
          ・面談予約

          本プロジェクトでは、面談予約の機能を備えてはおりますが、
          使いにくい・他の方法が良い場合は、遠慮なくこちらのアドレスにご返信下さい。


          sosmii
        `
    };

    return mailTransport.sendMail(mailOptions);
  });

exports.getReservedDates = functions.https.onCall(async (data, context) => {
  try {
    const apo = await Appointment.create(firestore);

    return {
      reservedDatesForMeeting: apo.getReservedDaysForMeeting(),
      reservedDatesForSkype: apo.getReservedDaysForSkype()
    }

  } catch (err) {
    console.error(`error@getReservedDates: uid = ${context.auth.uid}, error: ${err}`);

    throw err;
  }
});

exports.makeAppointment = functions.https.onCall(async (data, context) => {
  const uid: string = (context.auth) ? context.auth.uid : null;
  const user = await User.create(firestore, uid);

  if (!user.getIsUserAuthorized() || user.getHasUserAlreadyMadeAppointment()) {
    throw new functions.https.HttpsError('failed-precondition');
  }

  try {
    const arg = {
      appointmentType: data.type,
      selectedDate: data.date,
      place: data.place,
      uid: uid,
      companyName: user.getCompanyName()
    }

    const apo = await Appointment.create(firestore);
    await apo.makeAppointment(arg);

  } catch (err) {
    console.error(`error@makeAppointment: uid = ${context.auth.uid}, error: ${err}`);

    throw err;
  }
});
