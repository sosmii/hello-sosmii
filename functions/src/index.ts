import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import User from './User';

admin.initializeApp();
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

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
